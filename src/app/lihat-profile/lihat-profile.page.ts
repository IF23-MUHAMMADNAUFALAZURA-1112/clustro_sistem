import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Share } from '@capacitor/share';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Location } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './lihat-profile.page.html',
  styleUrls: ['./lihat-profile.page.scss'],
})
export class LihatProfilePage implements OnInit {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

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

  isProfileLoaded: boolean = false;

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
      houseNo: [''],
    });

    this.accountForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    const warga_id = localStorage.getItem('warga_id');
    if (!warga_id) return;

    const loading = await this.loadingCtrl.create({
      message: 'Memuat profil...',
    });
    await loading.present();

    this.http.get(`http://clustro.web.id/api/profil/${warga_id}`).subscribe({
      next: (res: any) => {
        this.biodata = {
          name: res.user.nama,
          nik: res.user.nik,
          email: res.user.email,
          whatsapp: res.user.no_whatsapp,
          phone: res.user.no_telepon,
          address: res.user.alamat,
          houseNo: res.warga.no_rumah,
        };

        const rawFoto = res.user.foto_profile || res.user.foto_diri || '';
        const fotoUrl = this.generateFreshPhotoUrl(rawFoto);

        this.profile = {
          photoUrl: fotoUrl,
          ktpUrl: res.warga.foto_ktp,
          userId: res.user.id,
          wargaId: res.warga.id,
        };

        this.biodataForm.patchValue(this.biodata);
        this.ktpPreview =
          res.warga.foto_ktp && !res.warga.foto_ktp.includes('default-ktp.png')
            ? res.warga.foto_ktp
            : '';

        this.fullProfilePhoto = this.getProfilePhotoUrl();

        console.log('Foto Final:', this.fullProfilePhoto);

        this.isProfileLoaded = true;
        loading.dismiss();
        this.evaluateProfileCompleteness();
      },
      error: () => {
        this.isProfileLoaded = true;
        loading.dismiss();
        this.showToast('Gagal memuat data profil.', 'danger');
      },
    });
  }
async shareProfilePhoto() {
  const url = this.getProfilePhotoUrl();

  if (!url || url.includes('default-profile.png')) {
    this.showToast('Tidak ada foto profil untuk dibagikan.', 'warning');
    return;
  }

  try {
    await Share.share({
      title: 'Foto Profil',
      text: 'Bagikan foto profil saya.',
      url: url,
      dialogTitle: 'Bagikan menggunakan'
    });
  } catch (error) {
    this.showToast('Gagal membuka menu bagikan.', 'danger');
  }
}

  generateFreshPhotoUrl(foto: string | null | undefined): string {
    if (!foto || foto.includes('default-profile') || foto.trim() === '') {
      return 'assets/img/default-profile.png';
    }
    return `${foto}?t=${new Date().getTime()}`;
  }

  getProfilePhotoUrl(): string {
    const url = this.profile?.photoUrl;
    if (!url || url === 'null' || url.trim() === '') {
      return 'assets/img/default-profile.png';
    }
    return url;
  }

  isDefaultPhoto(): boolean {
    const url = this.getProfilePhotoUrl();
    return (
      url.includes('default-profile.png') ||
      url === '' ||
      url === null
    );
  }

  evaluateProfileCompleteness() {
    const isEmpty = (val: any) =>
      val === null || val === undefined || val === '';
    const isDefaultPhoto = this.isDefaultPhoto();
    const isDefaultKtp = !this.ktpPreview;

    const isIncomplete =
      isEmpty(this.biodata.name) ||
      isEmpty(this.biodata.nik) ||
      isEmpty(this.biodata.email) ||
      isEmpty(this.biodata.phone) ||
      isEmpty(this.biodata.whatsapp) ||
      isEmpty(this.biodata.address) ||
      isEmpty(this.biodata.houseNo) ||
      isDefaultKtp;

    localStorage.setItem('profil_diperbarui', (!isIncomplete).toString());
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
        this.showToast(
          'Format gambar tidak didukung. Gunakan JPG, PNG, atau WEBP.',
          'danger'
        );
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

        this.http
          .post('http://clustro.web.id/api/profil/update-photo', formData)
          .subscribe({
            next: () => {
              this.showToast('Foto profil berhasil diubah.', 'success');
              localStorage.setItem('profil_diperbarui', 'true');
              this.evaluateProfileCompleteness();
            },
            error: () => {
              this.showToast('Gagal mengganti foto profil.', 'danger');
            },
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

        const blob = await fetch(image.dataUrl).then((res) => res.blob());
        const formData = new FormData();
        formData.append('user_id', this.profile.userId);
        formData.append('foto_profile', blob, `profile-${Date.now()}.jpeg`);

        this.http
          .post('http://clustro.web.id/api/profil/update-photo', formData)
          .subscribe({
            next: () => {
              this.showToast('Foto profil berhasil diambil dari kamera.', 'success');
              localStorage.setItem('profil_diperbarui', 'true');
              this.evaluateProfileCompleteness();
            },
            error: () => {
              this.showToast('Gagal mengunggah foto dari kamera.', 'danger');
            },
          });
      }
    } catch (error) {
      this.showToast('Kamera dibatalkan atau gagal dibuka.', 'medium');
    } finally {
      this.showPhotoOptions = false;
      this.showPhotoModal = false;
    }
  }

  deleteProfilePhoto() {
    if (this.isDefaultPhoto()) {
      this.showToast('Foto profil default tidak dapat dihapus.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', this.profile.userId);

    this.http
      .post('http://clustro.web.id/api/profil/delete-photo', formData)
      .subscribe({
        next: () => {
          this.profile.photoUrl = 'assets/img/default-profile.png';
          this.fullProfilePhoto = this.profile.photoUrl;
          this.showToast('Foto profil berhasil dihapus.', 'success');
          localStorage.setItem('profil_diperbarui', 'true');
          this.evaluateProfileCompleteness();
        },
        error: () => {
          this.showToast('Gagal menghapus foto profil.', 'danger');
        },
      });

    this.showPhotoModal = false;
    this.showPhotoOptions = false;
  }

  onKtpPicked(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ktpFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.ktpPreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removeKtp() {
    this.ktpPreview = '';
    this.ktpFile = null;
  }

  async saveBiodata() {
    if (this.biodataForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Menyimpan perubahan...',
    });
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

    this.http
      .post('http://clustro.web.id/api/profil/updateFullProfile', formData)
      .subscribe({
        next: async () => {
          await loading.dismiss();
          this.showToast('Profil berhasil diperbarui.', 'success');
          localStorage.setItem('profil_diperbarui', 'true');
          this.evaluateProfileCompleteness();
          this.loadProfile();
        },
        error: async () => {
          await loading.dismiss();
          this.showToast('Gagal menyimpan profil.', 'danger');
        },
      });
  }

  async saveAccount() {
    if (this.accountForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Mengganti password...',
    });
    await loading.present();

    const data = {
      warga_id: this.profile.wargaId,
      current_password: this.accountForm.value.oldPassword,
      new_password: this.accountForm.value.newPassword,
      new_password_confirmation: this.accountForm.value.confirmPassword,
    };

    this.http
      .post('http://clustro.web.id/api/profil/change-password', data)
      .subscribe({
        next: async () => {
          await loading.dismiss();
          this.showToast('Password berhasil diubah.', 'success');
          this.accountForm.reset();
        },
        error: async (err) => {
          await loading.dismiss();
          const msg = err?.error?.message || 'Gagal mengubah password.';
          this.showToast(msg, 'danger');
        },
      });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  presentPhotoOptions() {
    this.showPhotoOptions = true;
  }

  goBack(): void {
    this.location.back();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }
}
