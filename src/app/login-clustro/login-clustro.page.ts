import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login-clustro.page.html',
  styleUrls: ['./login-clustro.page.scss'],
})
export class LoginClustroPage {
  credentials = {
    nik: '',
    password: ''
  };

  isLoading = false;

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}
  goBack() {
    this.navCtrl.back();
  }
  async onLogin() {
    if (this.credentials.nik.length !== 16 || this.credentials.password.length < 6) {
      this.showToast('NIK atau password tidak valid', 'danger');
      return;
    }

    this.isLoading = true;

    try {
      const response: any = await this.http
        .post('http://localhost:8000/api/login', this.credentials)
        .toPromise();

      if (response.akses !== 'on') {
        this.showToast('Mohon tunggu admin aktivasi akun Anda.', 'warning');
        this.isLoading = false;
        return;
      }

      this.showToast('Login berhasil!', 'success');

      setTimeout(() => {
        if (response.role === 'warga') {
          this.navCtrl.navigateRoot('/dashboard-warga');
        } else if (response.role === 'satpam') {
          this.navCtrl.navigateRoot('/dashboard-satpam');
        }
        this.isLoading = false;
      }, 1500);

    } catch (error: any) {
      this.showToast('Login gagal. Cek NIK dan password Anda.', 'danger');
      console.error('Login error:', error);
      this.isLoading = false;
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
    });
    toast.present();
  }
}
