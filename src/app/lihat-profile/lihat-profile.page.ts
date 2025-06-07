import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './lihat-profile.page.html',
  styleUrls: ['./lihat-profile.page.scss'],
})
export class LihatProfilePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  segment = 'profilDiri';
  biodataForm: FormGroup;
  accountForm: FormGroup;

  biodata: any = {};
  profile: any = {};
  ktpPreview: any = '';
  ktpFile: any = null;
  fullProfilePhoto: any = '';
  showPhotoModal = false;
  showPhotoOptions = false;

  isProfileLoaded: boolean = false; // ✅ DITAMBAHKAN
  goBack(): void {
    this.location.back();
  }
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.biodataForm = this.fb.group({
      name: ['', Validators.required],
      nik: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: [''],
      phone: [''],
      address: [''],
      houseNo: ['']
    });

    this.accountForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    const warga_id = localStorage.getItem('warga_id');
    if (!warga_id) return;

    const loading = await this.loadingCtrl.create({ message: 'Memuat profil...' });
    await loading.present();

    this.http.get(`http://localhost:8000/api/profil/${warga_id}`).subscribe({
      next: (res: any) => {
        this.biodata = {
          name: res.user.nama,
          nik: res.user.nik,
          email: res.user.email,
          whatsapp: res.user.no_whatsapp,
          phone: res.user.no_telepon,
          address: res.user.alamat,
          houseNo: res.warga.no_rumah
        };

        const rawFoto = res.user.foto_profile || res.user.foto_diri || '';
        const fotoUrl = this.generateFreshPhotoUrl(rawFoto);

        this.profile = {
          photoUrl: fotoUrl,
          ktpUrl: res.warga.foto_ktp,
          userId: res.user.id,
          wargaId: res.warga.id
        };

        this.biodataForm.patchValue(this.biodata);
        this.ktpPreview = res.warga.foto_ktp;
        this.fullProfilePhoto = fotoUrl;

        console.log('Foto Final:', this.fullProfilePhoto);

        this.isProfileLoaded = true; // ✅ ditambahkan di akhir success
        loading.dismiss();
        this.evaluateProfileCompleteness();
      },
      error: () => {
        this.isProfileLoaded = true; // ✅ tetap ditambahkan saat gagal
        loading.dismiss();
        this.showToast('Gagal memuat data profil.', 'danger');
      }
    });
  }


  generateFreshPhotoUrl(foto: string | null | undefined): string {
    if (!foto || foto.includes('default-profile') || foto.trim() === '') {
      return 'assets/img/profile-default.png';
    }
    return `${foto}?t=${new Date().getTime()}`;
  }

  evaluateProfileCompleteness() {
    const isEmpty = (val: any) => val === null || val === undefined || val === '';
    const isDefaultPhoto = this.getProfilePhotoUrl().includes('default-profile.png');
    const isDefaultKtp = this.ktpPreview.includes('default-ktp.png');

    const isIncomplete = (
      isEmpty(this.biodata.name) ||
      isEmpty(this.biodata.nik) ||
      isEmpty(this.biodata.email) ||
      isEmpty(this.biodata.phone) ||
      isEmpty(this.biodata.whatsapp) ||
      isEmpty(this.biodata.address) ||
      isEmpty(this.biodata.houseNo) ||
      // isDefaultPhoto ||
      isDefaultKtp
    );

    localStorage.setItem('profil_diperbarui', (!isIncomplete).toString());
  }

  getProfilePhotoUrl(): string {
    const url = this.profile?.photoUrl;
    if (!url || url === 'null' || url.trim() === '') {
      return 'assets/img/profile-default.png';
    }
    return url;
  }

  showPhotoPreview() {
    this.showPhotoModal = true;
  }

  triggerFileUpload() {
    this.fileInput.nativeElement.click();
    this.showPhotoOptions = false;
  }

  onProfilePhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        this.showToast('Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.', 'danger');
        return;
      }

      const maxSizeMB = 2;
      if (file.size > maxSizeMB * 1024 * 1024) {
        this.showToast('Ukuran gambar maksimal 2MB.', 'danger');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.fullProfilePhoto = reader.result as string;
        this.profile.photoUrl = this.fullProfilePhoto;

        const formData = new FormData();
        formData.append('user_id', this.profile.userId);
        formData.append('foto_profile', file);

        this.http.post('http://localhost:8000/api/profil/update-photo', formData).subscribe({
          next: (res: any) => {
            console.log('Res Update Photo:', res);
            this.showToast('Foto profil berhasil diubah.', 'success');
            localStorage.setItem('profil_diperbarui', 'true');
            this.evaluateProfileCompleteness();
          },
          error: (err) => {
            console.log('Err Update Photo:', err);
            this.showToast('Gagal mengganti foto profil.', 'danger');
          }
        });
      };
      reader.readAsDataURL(file);
    }
    this.showPhotoModal = false;
  }

  async pickFromCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image && image.dataUrl) {
        this.fullProfilePhoto = image.dataUrl;
        this.profile.photoUrl = image.dataUrl;

        const blob = await fetch(image.dataUrl).then(res => res.blob());
        const formData = new FormData();
        formData.append('user_id', this.profile.userId);
        formData.append('foto_profile', blob, `profile-${Date.now()}.jpeg`);

        this.http.post('http://localhost:8000/api/profil/update-photo', formData).subscribe({
          next: (res: any) => {
            console.log('Res Camera Upload:', res);
            this.showToast('Foto profil berhasil diambil dari kamera.', 'success');
            localStorage.setItem('profil_diperbarui', 'true');
            this.evaluateProfileCompleteness();
          },
          error: (err) => {
            console.log('Err Camera Upload:', err);
            this.showToast('Gagal mengunggah foto dari kamera.', 'danger');
          }
        });
      }
    } catch (error) {
      this.showToast('Kamera dibatalkan atau gagal dibuka.', 'medium');
    } finally {
      this.showPhotoOptions = false;
      this.showPhotoModal = false;
    }
  }

  removeKtp() {
    this.ktpPreview = '';
    this.ktpFile = null;
  }

  onKtpPicked(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ktpFile = file;
      const reader = new FileReader();
      reader.onload = () => this.ktpPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  presentPhotoOptions() {
    this.showPhotoOptions = true;
  }

  async saveBiodata() {
    if (this.biodataForm.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Menyimpan perubahan...' });
    await loading.present();

    const formData = new FormData();
    formData.append('user_id', this.profile.userId);
    formData.append('warga_id', this.profile.wargaId);
    formData.append('nama', this.biodataForm.value.name);
    formData.append('nik', this.biodataForm.value.nik);
    formData.append('email', this.biodataForm.value.email);
    formData.append('no_whatsapp', this.biodataForm.value.whatsapp);
    formData.append('no_telepon', this.biodataForm.value.phone);
    formData.append('alamat', this.biodataForm.value.address);
    formData.append('no_rumah', this.biodataForm.value.houseNo);

    if (this.ktpFile) formData.append('foto_ktp', this.ktpFile);

    this.http.post('http://localhost:8000/api/profil/updateFullProfile', formData).subscribe({
      next: async (res: any) => {
        console.log('Res Update Profile:', res);
        await loading.dismiss();
        this.showToast('Profil berhasil diperbarui.', 'success');
        localStorage.setItem('profil_diperbarui', 'true');
        this.evaluateProfileCompleteness();
        this.loadProfile();
      },
      error: async (err) => {
        console.log('Err Update Profile:', err);
        await loading.dismiss();
        this.showToast('Gagal menyimpan profil.', 'danger');
      }
    });
  }

  isDefaultPhoto(): boolean {
    const url = this.getProfilePhotoUrl();
    return url.includes('profile-default.png') || url === '' || url === null;
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  async saveAccount() {
    if (this.accountForm.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Mengganti password...' });
    await loading.present();

    const data = {
      warga_id: this.profile.wargaId,
      current_password: this.accountForm.value.oldPassword,
      new_password: this.accountForm.value.newPassword,
      new_password_confirmation: this.accountForm.value.confirmPassword,
    };

    this.http.post('http://localhost:8000/api/profil/change-password', data).subscribe({
      next: async () => {
        await loading.dismiss();
        this.showToast('Password berhasil diubah.', 'success');
        this.accountForm.reset();
      },
      error: async (err) => {
        await loading.dismiss();
        const msg = err?.error?.message || 'Gagal mengubah password.';
        this.showToast(msg, 'danger');
      }
    });
  }

  deleteProfilePhoto() {
    const formData = new FormData();
    formData.append('user_id', this.profile.userId);

    this.http.post('http://localhost:8000/api/profil/delete-photo', formData).subscribe({
      next: (res: any) => {
        console.log('Res Delete Photo:', res);
        this.profile.photoUrl = 'assets/img/profile-default.png';
        this.showToast('Foto profil berhasil dihapus.', 'success');
        localStorage.setItem('profil_diperbarui', 'true');
        this.evaluateProfileCompleteness();
      },
      error: (err) => {
        console.log('Err Delete Photo:', err);
        this.showToast('Gagal menghapus foto profil.', 'danger');
      }
    });

    this.showPhotoModal = false;
    this.showPhotoOptions = false;
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }
}
