import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  password = '';
  confirmPassword = '';
  token = '';
  isLoading = false; // Menambahkan properti isLoading

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Mendapatkan token dari URL
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  // Fungsi untuk reset password
  async resetPassword() {
    if (this.password.length < 6) {
      this.showToast('Password harus lebih dari 6 karakter.', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Konfirmasi password tidak cocok.', 'danger');
      return;
    }

    this.isLoading = true; // Mengaktifkan loading spinner

    try {
      const response = await this.http.post('http://localhost:8000/api/reset-password', {
        token: this.token,
        password: this.password,
        password_confirmation: this.confirmPassword
      }).toPromise();

      this.isLoading = false; // Menonaktifkan loading spinner
      this.showToast('Password berhasil diubah!', 'success');
      this.navCtrl.navigateRoot('/login-clustro'); // Arahkan ke halaman login setelah berhasil reset
    } catch (error) {
      this.isLoading = false; // Menonaktifkan loading spinner
      this.showToast('Gagal reset password. Token mungkin tidak valid.', 'danger');
    }
  }

  // Fungsi untuk menampilkan toast
  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2500, color });
    toast.present();
  }

  // Fungsi untuk kembali ke halaman sebelumnya
  goBack() {
    this.navCtrl.back(); // Kembali ke halaman sebelumnya
  }
}
