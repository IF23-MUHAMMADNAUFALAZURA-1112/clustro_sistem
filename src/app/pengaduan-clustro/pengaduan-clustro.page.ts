import { Component } from '@angular/core';

interface ProgressItem {
  judul: string;
  deskripsi: string;
  kategori: 'keluhan' | 'laporan' | 'aspirasi' | 'ajukan'; // tambah 'ajukan'
  kategoriMasalah?: string; // opsional
  status: string;
  progress: number; // 0-100
}

@Component({
  selector: 'app-pengaduan-clustro',
  templateUrl: './pengaduan-clustro.page.html',
  styleUrls: ['./pengaduan-clustro.page.scss'],
  standalone: false
})
export class PengaduanClustroPage {
  kategori: 'keluhan' | 'laporan' | 'aspirasi' | 'ajukan' | null = null; // tambah 'ajukan'

  // Data dummy laporan
  progressList: ProgressItem[] = [
    {
      judul: 'Lampu jalan mati di RT 05',
      deskripsi: 'Lampu jalan di depan rumah saya sudah mati 3 hari.',
      kategori: 'keluhan',
      kategoriMasalah: 'listrik',
      status: 'Sedang diproses',
      progress: 50
    },
    {
      judul: 'Gangguan air bersih di lingkungan',
      deskripsi: 'Air PDAM tidak keluar sejak kemarin malam.',
      kategori: 'laporan',
      status: 'Selesai',
      progress: 100
    },
    {
      judul: 'Usulan penambahan fasilitas taman',
      deskripsi: 'Mohon ditambahkan taman bermain di RW 03.',
      kategori: 'aspirasi',
      status: 'Dalam pertimbangan',
      progress: 30
    }
  ];

  filteredProgress: ProgressItem[] = [];

  // Properti form untuk input pengaduan baru
  form = {
    judul: '',
    deskripsi: '',
    kategoriMasalah: ''
  };

  pilihKategori(kat: 'keluhan' | 'laporan' | 'aspirasi' | 'ajukan') {
    this.kategori = kat;
    if (kat === 'ajukan') {
      // reset form jika kategori ajukan
      this.resetForm();
      this.filteredProgress = [];
    } else {
      this.filterProgress();
    }
  }

  resetForm() {
    this.form = {
      judul: '',
      deskripsi: '',
      kategoriMasalah: ''
    };
  }

  kirimPengaduan() {
    if (!this.form.judul || !this.form.deskripsi) {
      alert('Judul dan deskripsi harus diisi!');
      return;
    }
    // Proses pengiriman data di sini (API call atau lainnya)
    console.log('Kirim pengaduan:', this.kategori, this.form);
    alert(`Pengaduan berhasil dikirim!`);

    this.resetForm();
    this.kategori = null; // kembali ke tampilan awal
  }

  filterProgress() {
    if (!this.kategori) {
      this.filteredProgress = [];
      return;
    }
    this.filteredProgress = this.progressList.filter(item => item.kategori === this.kategori);
  }
}
