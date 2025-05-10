import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common'; // Untuk navigasi kembali
import { NavController, AlertController } from '@ionic/angular'; // Import NavController dan AlertController

@Component({
  selector: 'app-dashboard-warga',
  templateUrl: './dashboard-warga.page.html',
  styleUrls: ['./dashboard-warga.page.scss'],
  standalone:false
})
export class DashboardWargaPage implements OnInit, AfterViewInit {

  showProfileMenu = false;  // Kontrol dropdown menu

  constructor(
    private location: Location, 
    private navCtrl: NavController,
    private alertController: AlertController  // Menambahkan AlertController
  ) {}

  ngOnInit(): void {
    // Inisialisasi lainnya jika diperlukan
  }

  ngAfterViewInit(): void {
    const container = document.getElementById('bannerContainer');
    let currentScroll = 0;
    const bannerWidth = 336; // 320px + 16px margin

    setInterval(() => {
      if (!container) return;
      currentScroll += bannerWidth;

      if (currentScroll >= container.scrollWidth - container.clientWidth) {
        currentScroll = 0;
      }

      container.scrollTo({
        left: currentScroll,
        behavior: 'smooth'
      });
    }, 4000); // Slide otomatis setiap 4 detik
  }

  // Fungsi untuk membuka dan menutup menu profil
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  // Fungsi untuk menampilkan profil
  viewProfile() {
    console.log('Lihat Profil');
    // Tambahkan logika untuk navigasi ke halaman profil jika diperlukan
  }

  // Fungsi untuk logout dan mengakhiri sesi dengan konfirmasi
  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin logout?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Logout dibatalkan');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            // Menghapus session atau token yang disimpan
            sessionStorage.clear(); // Jika menggunakan sessionStorage
            localStorage.clear(); // Jika menggunakan localStorage

            console.log('Logout berhasil');
            // Redirect ke halaman login
            this.navCtrl.navigateRoot('/login-clustro'); // Ubah '/login-clustro' dengan URL halaman login Anda
          }
        }
      ]
    });

    await alert.present();
  }
}
