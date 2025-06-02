import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengajuan-domisili',
  templateUrl: './pengajuan-domisili.page.html',
  styleUrls: ['./pengajuan-domisili.page.scss'],
  standalone: false
})
export class PengajuanDomisiliPage implements OnInit {
  // Opsi untuk select dropdown Status Perkawinan
  statusPerkawinanOptions = [
    'Belum menikah',
    'Menikah',
    'Cerai hidup',
    'Cerai mati',
  ];

  // Opsi untuk select dropdown Jenis Kelamin
  jenisKelaminOptions = ['Laki-laki', 'Perempuan'];

  // Data form untuk binding ngModel, inisialisasi tanpa akses opsi dulu
formData = {
  statusHubungan: '',     
  namaLengkap: '',
  nomorKTP: '',
  alamat: '',
  lamaTinggal: null,
  tempatLahir: '',
  tanggalLahir: '',
  kewarganegaraan: '',
  keperluan: '',
  noTelepon: '',
  statusPerkawinan: '', 
  jenisKelamin: '',     
};


  constructor() {}

  ngOnInit() {
    // Set default pilihan agar select tidak kosong
    this.formData.statusPerkawinan = this.statusPerkawinanOptions[0];
    this.formData.jenisKelamin = this.jenisKelaminOptions[0];
  }

  // Fungsi submit form
  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Tambahkan aksi lain jika diperlukan, misal kirim data ke backend
  }
}
