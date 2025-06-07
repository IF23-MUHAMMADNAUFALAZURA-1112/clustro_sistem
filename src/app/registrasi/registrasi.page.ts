import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-registrasi',
  templateUrl: './registrasi.page.html',
  styleUrls: ['./registrasi.page.scss'],
})
export class RegistrasiPage {
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedImageFile: File | null = null;
  selectedImageUrl: string | null = null;
  imageFilename: string = '';

  user = {
    nama: '',
    nik: '',
    email: '',
    no_whatsapp: '',
    no_telepon: '',
    alamat: '',
    password: '',
    password_confirmation: '',
    foto: ''
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  triggerUpload() {
    this.fileInput.nativeElement.click();
  }

  handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      this.showToast('Hanya file JPG atau PNG yang diperbolehkan.', 'danger');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.showToast('Ukuran foto tidak boleh lebih dari 5MB.', 'danger');
      return;
    }

    this.selectedImageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    const ext = file.name.split('.').pop();
    this.imageFilename = `user_${Date.now()}.${ext}`;
    this.user.foto = this.imageFilename;
  }

  async submitForm() {
    const noSymbolRegex = /^[a-zA-Z0-9\s.,]+$/;
    const numberOnlyRegex = /^[0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 🔍 **Validasi Form**
    if (!this.user.nama.trim()) return this.showToast('Nama tidak boleh kosong.', 'danger');
    if (!noSymbolRegex.test(this.user.nama)) return this.showToast('Nama tidak valid.', 'danger');

    if (!this.user.alamat.trim()) return this.showToast('Alamat tidak boleh kosong.', 'danger');
    // if (!noSymbolRegex.test(this.user.alamat)) return this.showToast('Alamat tidak valid.', 'danger');

    if (!this.user.no_telepon.trim()) return this.showToast('No. Telepon tidak boleh kosong.', 'danger');
    if (!numberOnlyRegex.test(this.user.no_telepon)) return this.showToast('No. Telepon tidak valid.', 'danger');

    if (!this.user.no_whatsapp.trim()) return this.showToast('No. WhatsApp tidak boleh kosong.', 'danger');
    if (!numberOnlyRegex.test(this.user.no_whatsapp)) return this.showToast('No. WhatsApp tidak valid.', 'danger');

    if (!this.user.email.trim()) return this.showToast('Email tidak boleh kosong.', 'danger');
    if (!emailRegex.test(this.user.email)) return this.showToast('Format email tidak valid.', 'danger');

    if (!this.user.password.trim()) return this.showToast('Password tidak boleh kosong.', 'danger');
    if (!this.user.password_confirmation.trim()) return this.showToast('Konfirmasi password tidak boleh kosong.', 'danger');
    if (this.user.password !== this.user.password_confirmation) return this.showToast('Konfirmasi kata sandi tidak cocok.', 'danger');

    if (!this.user.nik.trim()) return this.showToast('NIK tidak boleh kosong.', 'danger');
    if (this.user.nik.length !== 16) return this.showToast('NIK harus 16 digit.', 'danger');

    if (!this.selectedImageFile) return this.showToast('Foto belum diunggah. Silakan upload foto.', 'danger');

    // 🔍 **Kirim data ke server**
    const formData = new FormData();
    for (const key in this.user) {
      formData.append(key, (this.user as any)[key]);
    }
    formData.append('foto_file', this.selectedImageFile, this.imageFilename);

    console.log('Mengirim data registrasi:', this.user);

    try {
      const response: any = await this.http.post('http://localhost:8000/api/register', formData).toPromise();
      console.log('Respon dari API:', response);

      // Jika berhasil, navigasi ke halaman login
      this.showToast('Registrasi berhasil! Silakan login.', 'success');
      setTimeout(() => this.navCtrl.navigateRoot('/login-clustro'), 1500);

    } catch (error: any) {
      const errors = error?.error?.errors;

      if (errors) {
        if (errors.nik) this.showToast('NIK sudah digunakan.', 'danger');
        if (errors.email) this.showToast('Email sudah digunakan.', 'danger');
        if (errors.no_whatsapp) this.showToast('No. WhatsApp sudah digunakan.', 'danger');
      } else {
        this.showToast('Terjadi kesalahan saat mendaftar.', 'danger');
      }
      console.error('ERROR API:', error);
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
