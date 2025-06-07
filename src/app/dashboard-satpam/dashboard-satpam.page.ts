import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
// ✅ Tambahan untuk akses Storage
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-dashboard-satpam',
  templateUrl: './dashboard-satpam.page.html',
  styleUrls: ['./dashboard-satpam.page.scss'],
  standalone: false,
})
export class DashboardSatpamPage implements OnInit {
  activeTab: string = 'dashboard'; // default tampilan awal
  dropdownVisible = false;
  notificationCount = 3;

  constructor(
    private location: Location,
    private alertCtrl: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage // ✅ Tambahan
  ) {}

  async ngOnInit(): Promise<void> {
    await this.checkLogin(); // ✅ Cek login saat inisialisasi
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // Fungsi lama untuk tombol di dashboard
  goToBukuTamu() {
    this.setTab('bukutamu');
  }

  goToDataWarga() {
    // Anda bisa buat tab baru, atau arahkan ke halaman jika tetap ingin navigasi
    this.navCtrl.navigateForward('/data-warga');
  }

  goToHistoryTamu() {
    this.navCtrl.navigateForward('/history-tamu');
  }

  public async confirmLogout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin keluar?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Ya', handler: () => this.doLogout() },
      ],
    });
    await alert.present();
  }

  public async doLogout(): Promise<void> {
    // ✅ Hapus semua data storage
    await this.storage.clear();
    // ✅ Hapus semua data localStorage (opsional)
    localStorage.clear();
    // ✅ Arahkan ke halaman login
    this.router.navigateByUrl('/login-clustro', { replaceUrl: true });
  }

  public logout() {
    this.confirmLogout();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  viewProfile() {
    // Arahkan ke halaman profil
    console.log('Lihat profil diklik');
    this.dropdownVisible = false;
    this.router.navigate(['/profile-satpam']);
  }
  goToNotifications(event?: Event) {
    if (event) event.stopPropagation();
    this.router.navigate(['/notifikasi']);
  }
  // ✅ Fungsi pengecekan login (tambahan)
  async checkLogin(): Promise<void> {
    await this.storage.create(); // Inisialisasi Storage jika belum
    const wargaId = await this.storage.get('satpam_id');
    if (!wargaId) {
      console.warn('Tidak ada satpam_id, mengarahkan ke login...');
      this.navCtrl.navigateRoot('/login-clustro');
    }
  }
}
