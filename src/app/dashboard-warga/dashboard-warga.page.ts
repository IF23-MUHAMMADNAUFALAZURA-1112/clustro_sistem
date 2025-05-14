import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-warga',
  templateUrl: './dashboard-warga.page.html',
  standalone: false,
  styleUrls: ['./dashboard-warga.page.scss']
})
export class DashboardWargaPage implements OnInit, AfterViewInit {

  showProfileMenu = false;
  showNotificationPanel = false;

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private alertController: AlertController,
    public menuCtrl: MenuController
  ) {}

  ngOnInit(): void {}

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

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotificationPanel = false;
  }

  toggleNotificationPanel(): void {
    this.showNotificationPanel = !this.showNotificationPanel;
    this.showProfileMenu = false;
  }

  toggleSidebar(): void {
    this.menuCtrl.toggle();
  }

  viewProfile(): void {
    console.log('Lihat Profil');
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
          handler: () => {
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
}
