import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, NavController } from '@ionic/angular'; // Pastikan NavController diimport

@Component({
  standalone: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController // Tambahkan NavController di constructor
  ) {}

  async submitForgotPassword() {
    if (!this.email || !this.email.includes('@')) {
      this.showAlert('Masukkan email yang valid', 'danger');
      return;
    }

    this.isLoading = true;

    try {
      const response = await this.http
        .post('http://clustro.web.id/api/forgot-password', {
          email: this.email,
        })
        .toPromise();

      this.isLoading = false;
      this.showAlert('Link reset telah dikirim ke email Anda. Silakan periksa kotak masuk atau folder spam', 'success');
    } catch (error) {
      this.isLoading = false;
      this.showAlert('Email tidak ditemukan atau gagal mengirim.', 'danger');
    }
  }

  // Fungsi untuk menampilkan alert dengan tombol X
  async showAlert(message: string, color: string) {
    const alert = await this.alertCtrl.create({
      header: 'Pemberitahuan',
      message: message,
      buttons: [
        {
          text: 'Tutup',
          role: 'cancel',
          handler: () => {
            console.log('Alert ditutup');
          },
        },
      ],
      cssClass: 'custom-alert', // Menambahkan kelas custom untuk styling
    });

    await alert.present();
  }

  // Fungsi untuk kembali ke halaman sebelumnya
  goBack() {
    this.navCtrl.back(); // Fungsi ini akan mengarahkan pengguna kembali ke halaman sebelumnya
  }
}
