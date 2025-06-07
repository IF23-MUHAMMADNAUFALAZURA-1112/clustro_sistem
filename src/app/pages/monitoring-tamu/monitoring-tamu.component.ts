import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring-tamu',
  templateUrl: './monitoring-tamu.component.html',
  styleUrls: ['./monitoring-tamu.component.scss'],
  standalone: false
})
export class MonitoringTamuComponent implements OnInit {

  tamuList: any[] = [];
  filteredTamuList: any[] = [];

  searchNama: string = '';
  filterStatus: string = '';

  constructor() { }

  ngOnInit() {
    // Contoh data dummy, ganti ini dengan data dari API atau database kamu
    this.tamuList = [
      {
        nama: 'Budi Santoso',
        status_kunjungan: 'Masuk',
        waktu_masuk: '2025-05-23T08:00:00',
        waktu_keluar: '2025-05-23T10:15:00',
        nama_warga_tujuan: 'Pak Joko'
      },
      {
        nama: 'Siti Aminah',
        status_kunjungan: 'Keluar',
  waktu_masuk: '2025-05-23T08:00:00',
  waktu_keluar: '2025-05-23T10:15:00',
        nama_warga_tujuan: 'Bu Ani'
      },
      {
        nama: 'Agus Firmansyah',
        status_kunjungan: 'Masuk',
        waktu_masuk: new Date(),
  waktu_keluar: '2025-05-26T10:15:00',
        nama_warga_tujuan: 'Pak Bambang'
      }
    ];

    // Awalnya tampilkan semua data
    this.filteredTamuList = this.tamuList;
  }

  filterTamu() {
    this.filteredTamuList = this.tamuList.filter(tamu => {
      const cocokNama = this.searchNama
        ? tamu.nama.toLowerCase().includes(this.searchNama.toLowerCase())
        : true;

      const cocokStatus = this.filterStatus
        ? tamu.status_kunjungan === this.filterStatus
        : true;

      return cocokNama && cocokStatus;
    });
  }
  isLewatBatasWaktu(tamu: any): boolean {
  const waktuMasuk = new Date(tamu.waktu_masuk).getTime();
  const sekarang = new Date().getTime();
  const batasWaktuMs = 2 * 60 * 60 * 1000; // 2 jam

  return tamu.status_kunjungan === 'Masuk' && (sekarang - waktuMasuk) > batasWaktuMs;
}

konfirmasiKeluar(tamu: any) {
  // Tampilkan konfirmasi sederhana
  const konfirmasi = confirm(`Apakah Anda yakin tamu "${tamu.nama}" sudah keluar?`);
  if (konfirmasi) {
    tamu.status_kunjungan = 'Keluar';
    tamu.waktu_keluar = new Date(); // opsional jika kamu simpan waktu keluar
    this.filterTamu();

    // TODO: Jika pakai backend, panggil API update status di sini
  }
}

}
