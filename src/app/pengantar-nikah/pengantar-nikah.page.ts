import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pengantar-nikah',
  templateUrl: './pengantar-nikah.page.html',
  styleUrls: ['./pengantar-nikah.page.scss'],
  standalone: false
})
export class PengantarNikahPage {
  formData = {
    status_hubungan: '',
    nama_lengkap_pemohon: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat_ktp: '',
    nik: '',
    agama: '',
    status_pernikahan: '',
    pekerjaan: '',
    nama_ayah: '',
    nama_ibu: '',
    fotokopi_ktp: null as File | null,
    fotokopi_kk: null as File | null,
  };

  uploadedFiles: {
    fotokopi_ktp?: File | null;
    fotokopi_kk?: File | null;
  } = {};

  fotoKtpPreview: string | null = null;
  fotoKkPreview: string | null = null;

  fileTypeInvalid = false;

  constructor() {}

  onFileChange(event: any, type: 'ktp' | 'kk') {
    const file: File = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      this.fileTypeInvalid = true;
      return;
    }
    this.fileTypeInvalid = false;

    if (type === 'ktp') {
      this.uploadedFiles.fotokopi_ktp = file;
      this.formData.fotokopi_ktp = file;
    } else if (type === 'kk') {
      this.uploadedFiles.fotokopi_kk = file;
      this.formData.fotokopi_kk = file;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (type === 'ktp') {
        this.fotoKtpPreview = e.target.result;
      } else if (type === 'kk') {
        this.fotoKkPreview = e.target.result;
      }
    };
    reader.readAsDataURL(file);

    event.target.value = '';
  }

  hapusFoto(type: 'ktp' | 'kk') {
    if (type === 'ktp') {
      this.fotoKtpPreview = null;
      this.uploadedFiles.fotokopi_ktp = null;
      this.formData.fotokopi_ktp = null;
    } else if (type === 'kk') {
      this.fotoKkPreview = null;
      this.uploadedFiles.fotokopi_kk = null;
      this.formData.fotokopi_kk = null;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Data form:', this.formData);
      console.log('File KTP:', this.uploadedFiles.fotokopi_ktp);
      console.log('File KK:', this.uploadedFiles.fotokopi_kk);

      const payload = new FormData();
      for (const key in this.formData) {
        if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
          const val = (this.formData as any)[key];
          if (val !== null && val !== undefined) {
            if (val instanceof File) {
              payload.append(key, val);
            } else {
              payload.append(key, val);
            }
          }
        }
      }

      // TODO: Kirim payload ke backend menggunakan HttpClient

      alert('Pengajuan surat pengantar nikah berhasil dikirim!');
      form.resetForm();
      this.uploadedFiles = {};
      this.fotoKtpPreview = null;
      this.fotoKkPreview = null;
    } else {
      alert('Mohon lengkapi semua data yang wajib diisi.');
    }
  }
}
