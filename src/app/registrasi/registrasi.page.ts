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
    no_rumah: '',
    password: '',
    password_confirmation: '',
    foto: '',
    role: 'warga'
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
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      const ext = file.name.split('.').pop();
      this.imageFilename = `user_${Date.now()}.${ext}`;
      this.user.foto = this.imageFilename;
    } else {
      this.showToast('Hanya file JPG atau PNG yang diperbolehkan.', 'danger');
    }
  }

  async submitForm() {
    if (this.user.nik.length !== 16) {
      this.showToast('NIK harus 16 digit.', 'danger');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.showToast('Format email tidak valid.', 'danger');
      return;
    }

    if (this.user.no_whatsapp.length < 10) {
      this.showToast('Nomor WhatsApp tidak valid.', 'danger');
      return;
    }

    if (this.user.password.length < 6) {
      this.showToast('Kata sandi minimal 6 karakter.', 'danger');
      return;
    }

    if (this.user.password !== this.user.password_confirmation) {
      this.showToast('Konfirmasi kata sandi tidak cocok.', 'danger');
      return;
    }

    const formData = new FormData();
    for (const key in this.user) {
      formData.append(key, (this.user as any)[key]);
    }

    if (this.selectedImageFile) {
      formData.append('foto_file', this.selectedImageFile, this.imageFilename);
    }

    console.log('Mengirim data registrasi:', this.user);

    try {
      const response: any = await this.http
        .post('http://localhost:8000/api/register', formData)
        .toPromise();

      console.log('Respon dari API:', response);
      this.showToast('Registrasi berhasil! Silakan login.', 'success');

      setTimeout(() => {
        this.navCtrl.navigateRoot('/login-clustro');
      }, 1500);

    } catch (error: any) {
      const errors = error?.error?.errors;
      if (errors) {
        if (errors.nik) this.showToast(errors.nik[0], 'danger');
        if (errors.email) this.showToast(errors.email[0], 'danger');
        if (errors.no_whatsapp) this.showToast(errors.no_whatsapp[0], 'danger');
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
