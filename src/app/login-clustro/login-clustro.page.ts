import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  goBack() {
    this.navCtrl.back();
  }

  async onLogin() {
    const { nik, password } = this.credentials;

    // Validasi input sederhana
    if (nik.length !== 16 || password.length < 6) {
      this.showToast('NIK harus 16 digit dan password minimal 6 karakter.', 'danger');
      return;
    }

    this.isLoading = true;

    try {
      // Kirim data login ke API
      const response: any = await this.http
        .post('http://localhost:8000/api/login', this.credentials)
        .toPromise();

      console.log('Response dari API:', response);

      if (!response || !response.user) {
        this.showToast('Login gagal. Data pengguna tidak ditemukan.', 'danger');
        return;
      }

      // Cek status akses
      if (response.akses !== 'on') {
        this.showToast('Mohon tunggu admin aktivasi akun Anda.', 'warning');
        return;
      }

      // Simpan role ke storage
      await this.storage.set('role', response.role);

      // Simpan ID khusus role yang sesuai (ambil dari response.warga_id atau response.satpam_id)
      if (response.role === 'warga') {
        if (!response.warga_id) {
          this.showToast('ID warga tidak ditemukan di response.', 'danger');
          return;
        }
        await this.storage.set('warga_id', response.warga_id);
        localStorage.setItem('warga_id', response.warga_id.toString());
        this.navCtrl.navigateRoot('/dashboard-warga');
      } else if (response.role === 'satpam') {
        if (!response.satpam_id) {
          this.showToast('ID satpam tidak ditemukan di response.', 'danger');
          return;
        }
        await this.storage.set('satpam_id', response.satpam_id);
        localStorage.setItem('satpam_id', response.satpam_id.toString());
        this.navCtrl.navigateRoot('/dashboard-satpam');
      } else {
        this.showToast('Role pengguna tidak dikenali.', 'danger');
        return;
      }

      this.showToast('Login berhasil!', 'success');

    } catch (error: any) {
      console.error('Login error:', error);
      this.showToast('Login gagal. Cek NIK dan password Anda.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
    });
    await toast.present();
  }
}
