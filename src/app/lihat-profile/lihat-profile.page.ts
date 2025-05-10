import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';

interface Profile {
  name: string;
  photoUrl: string;
}

interface Biodata {
  name: string;
  nik: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  houseNo: string;
}

@Component({
  selector: 'app-lihat-profile',
  templateUrl: './lihat-profile.page.html',
  styleUrls: ['./lihat-profile.page.scss'],
  standalone: false
})
export class LihatProfilePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  // Segment control state
  segment: 'profilDiri' | 'akun' | 'biodata' | 'foto' = 'profilDiri';

  // Profile data
  profile: Profile = {
    name: 'Muhammad Naufal Azura',
    photoUrl: 'assets/img/profile-photo.jpg'
  };

  // Biodata data
  biodata: Biodata = {
    name: 'Muhammad Naufal Azura',
    nik: '1234567890123456',
    email: 'user@example.com',
    phone: '081234567890',
    whatsapp: '083804283745',
    address: 'Jalan Raya Karawang No. 10',
    houseNo: '123A'
  };

  // Reactive forms and flags
  accountForm: FormGroup;
  biodataForm: FormGroup;
  editingBiodata = false;

  // Photo change preview & confirm modal
  photoPreview: string | ArrayBuffer | null = null;
  private pickedFile: File | null = null;
  showConfirmModal = false;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private location: Location
  ) {
    // Initialize account form
    this.accountForm = this.fb.group({
      nik: [{ value: this.biodata.nik, disabled: true }],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    // Initialize biodata form
    this.biodataForm = this.fb.group({
      name: [this.biodata.name, [Validators.required]],
      nik: [this.biodata.nik, [Validators.required, Validators.minLength(16)]],
      email: [this.biodata.email, [Validators.required, Validators.email]],
      whatsapp: [this.biodata.whatsapp, [Validators.required]],
      phone: [this.biodata.phone, [Validators.required]],
      address: [this.biodata.address, [Validators.required]],
      houseNo: [this.biodata.houseNo, [Validators.required]]
    });
  }

  ngOnInit() {}

  /** Ensure new password matches confirmation */
  private passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  /** Segment changed handler */
  segmentChanged(event: CustomEvent) {
    this.segment = event.detail.value;
  }

  /** Go back navigation */
  goBack() {
    this.location.back();
  }

  /** Toggle edit mode for biodata */
  toggleEditBiodata() {
    this.editingBiodata = !this.editingBiodata;
    if (!this.editingBiodata) {
      this.biodataForm.reset(this.biodata);
    }
  }

  /** Save updated biodata */
  async saveBiodata() {
    if (this.biodataForm.invalid) {
      const toast = await this.toastCtrl.create({ message: 'Mohon lengkapi data biodata.', duration: 2000, color: 'danger' });
      await toast.present();
      return;
    }
    this.biodata = { ...this.biodataForm.value };
    this.editingBiodata = false;
    const toast = await this.toastCtrl.create({ message: 'Biodata berhasil diperbarui.', duration: 2000, color: 'success' });
    await toast.present();
  }

  /** Save account changes */
  async saveAccount() {
    if (this.accountForm.invalid) {
      const toast = await this.toastCtrl.create({ message: 'Mohon periksa kembali data akun.', duration: 2000, color: 'danger' });
      await toast.present();
      return;
    }
    const loading = await this.loadingCtrl.create({ message: 'Menyimpan...' });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({ message: 'Akun berhasil diperbarui.', duration: 2000, color: 'success' });
      await toast.present();
      this.accountForm.patchValue({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }, 1500);
  }

  /** Handle file input change, prepare preview & open confirmation modal */
  onPhotoPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.pickedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result;
      this.showConfirmModal = true;
    };
    reader.readAsDataURL(file);
  }

  /** Cancel photo change, reset preview */
  cancelChange() {
    this.showConfirmModal = false;
    this.pickedFile = null;
    this.photoPreview = null;
  }

  /** Confirm and apply photo change */
  confirmChange() {
    if (this.pickedFile && this.photoPreview) {
      this.profile.photoUrl = this.photoPreview as string;
      // TODO: upload this.pickedFile to server
    }
    this.showConfirmModal = false;
  }
}
