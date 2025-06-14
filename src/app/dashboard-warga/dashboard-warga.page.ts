import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-warga',
  templateUrl: './dashboard-warga.page.html',
  styleUrls: ['./dashboard-warga.page.scss'],
  standalone: false
})
export class DashboardWargaPage implements OnInit, AfterViewInit {
  isProfileIncomplete = false;
  showProfileMenu = false;
  showNotificationPanel = false;
  jumlahNotifikasiBaru: number = 0;

  userPhotoUrl = 'assets/img/default-profile.png';
  wargaId: string | null = null;

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private alertController: AlertController,
    public menuCtrl: MenuController,
    private storage: Storage,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.checkLogin();
    this.wargaId = await this.storage.get('warga_id');
    this.loadUserProfile();
    this.hitungNotifikasiBaru();
  }

  ionViewWillEnter() {
    this.loadUserProfile();
  }

  ngAfterViewInit(): void {
    const bannerContainer = document.getElementById('bannerContainer');
    let bannerScroll = 0;
    const bannerWidth = 336;

    setInterval(() => {
      if (!bannerContainer) return;

      bannerScroll += bannerWidth;
      if (bannerScroll >= bannerContainer.scrollWidth - bannerContainer.clientWidth) {
        bannerScroll = 0;
      }

      bannerContainer.scrollTo({
        left: bannerScroll,
        behavior: 'smooth'
      });
    }, 4000);
  }

  loadUserProfile() {
  if (!this.wargaId) {
    console.warn('Warga ID belum tersedia.');
    return;
  }

  this.http.get<any>(`http://clustro.web.id/api/profil/${this.wargaId}`).subscribe({
    next: (res) => {
      if (res && res.user && res.warga) {
        const user = res.user;
        const warga = res.warga;

        console.log('User:', user);
        console.log('Warga:', warga);

        const isEmpty = (val: any) => val === null || val === undefined || val === '';

        const fotoDiri = (user.foto_diri || '').trim();

        // Ganti dengan base URL backend Anda jika foto_diri tidak full URL
        const baseUrl = 'http://clustro.web.id/uploads/';
        const isFullUrl = /^https?:\/\//.test(fotoDiri);
        const finalFotoUrl = isFullUrl ? fotoDiri : baseUrl + fotoDiri;

        const isFotoDiriValid = !isEmpty(fotoDiri) && !/default-profile/.test(fotoDiri);

        this.userPhotoUrl = isFotoDiriValid
          ? finalFotoUrl + '?t=' + new Date().getTime()
          : 'assets/img/default-profile.png';

        this.isProfileIncomplete = (
          isEmpty(user.nama) ||
          isEmpty(user.nik) ||
          isEmpty(user.email) ||
          isEmpty(user.no_telepon) ||
          isEmpty(user.no_whatsapp) ||
          isEmpty(user.alamat) ||
          isEmpty(warga.no_rumah) ||
          /default-ktp/.test(warga.foto_ktp || '')
        );

        console.log('userPhotoUrl:', this.userPhotoUrl);
        console.log('isProfileIncomplete:', this.isProfileIncomplete);
      } else {
        this.isProfileIncomplete = true;
        this.userPhotoUrl = 'assets/img/default-profile.png';
      }
    },
    error: (err) => {
      console.error('Error load profile', err);
      this.isProfileIncomplete = true;
      this.userPhotoUrl = 'assets/img/default-profile.png';
    },
  });
}

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotificationPanel = false;
  }

  toggleNotificationPanel(): void {
    this.showNotificationPanel = !this.showNotificationPanel;
    this.showProfileMenu = false;
  }

  viewProfile(): void {
    console.log('Lihat Profil');
    this.navCtrl.navigateForward('/lihat-profile');
  }

  async logout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin logout?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => console.log('Logout dibatalkan')
        },
        {
          text: 'Logout',
          handler: async () => {
            await this.storage.clear();
            sessionStorage.clear();
            localStorage.clear();
            console.log('Logout berhasil');
            this.navCtrl.navigateRoot('/login-clustro');
          }
        }
      ]
    });

    await alert.present();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideNotif = target.closest('.notification-panel');
    const clickedNotifIcon = target.closest('.notifikasi');
    const clickedInsideProfile = target.closest('.profile-dropdown');
    const clickedProfileIcon = target.closest('.profile-avatar');

    if (!clickedInsideNotif && !clickedNotifIcon) this.showNotificationPanel = false;
    if (!clickedInsideProfile && !clickedProfileIcon) this.showProfileMenu = false;
  }

  hitungNotifikasiBaru(): void {
    const dataStr = localStorage.getItem('laporan_pengaduan');
    const aktivitas = dataStr ? JSON.parse(dataStr) : [];

    this.jumlahNotifikasiBaru = aktivitas.filter((item: any) =>
      (item.status === 'Selesai' || item.status === 'Tertunda') && item.seen === false
    ).length;
  }

  async checkLogin(): Promise<void> {
    await this.storage.create();
    const wargaId = await this.storage.get('warga_id');
    if (!wargaId) {
      console.warn('Tidak ada warga_id, mengarahkan ke login...');
      this.navCtrl.navigateRoot('/login-clustro');
    }
  }
}
