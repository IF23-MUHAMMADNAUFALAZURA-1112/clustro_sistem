import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buku-tamu',
  templateUrl: './buku-tamu.component.html',
  styleUrls: ['./buku-tamu.component.scss'],
  standalone: false,
})
export class BukuTamuComponent implements OnInit {

  bukuTamuForm!: FormGroup;
  tamuList: any[] = [];
  wargaList: any[] = [];
  isModalOpen = false; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location,
  ) { }
goBack() {
  this.location.back();
}
  ngOnInit() {
    this.bukuTamuForm = this.fb.group({
      nama: [''],
      nik_tamu: [''],
      alamat: [''],
      warga_id: [''],
      alasan_kunjungan: [''],
      estimasi_waktu_keluar: [''],
      nama_warga_tujuan: [''],
      alamat_warga_tujuan: [''],
      no_rumah_tujuan: [''],
      foto_ktp_tamu: [null]
    });

    this.loadWarga();
      this.loadTamuList();
  }
loadTamuList() {
  this.http.get('https://your-api-url.com/api/tamus').subscribe((data: any) => {
    this.tamuList = data;
  }, error => {
    console.error('Gagal memuat data tamu', error);
  });
}

  loadWarga() {
    this.http.get('https://your-api-url.com/api/wargas').subscribe((data: any) => {
      this.wargaList = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.bukuTamuForm.patchValue({ foto_ktp_tamu: file });
  }

  submitForm() {
  const formData = new FormData();
  Object.keys(this.bukuTamuForm.value).forEach(key => {
    formData.append(key, this.bukuTamuForm.value[key]);
  });

  formData.append('waktu_masuk', new Date().toISOString());
  formData.append('status_kunjungan', 'Masuk');

  
  this.http.post('https://your-api-url.com/api/tamus', formData).subscribe(response => {
    console.log('Tamu berhasil disimpan', response);
    alert('Data tamu berhasil dikirim!');
    this.bukuTamuForm.reset();
    this.closeModal();

    this.loadTamuList(); // ✅ Refresh list setelah submit
  }, error => {
    console.error('Gagal simpan tamu', error);
    alert('Gagal mengirim data tamu.');
  });
}

  // ✅ Modal control
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
