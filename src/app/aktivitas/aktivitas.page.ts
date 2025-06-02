import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aktivitas',
  templateUrl: './aktivitas.page.html',
  styleUrls: ['./aktivitas.page.scss'],
  standalone: false
})
export class AktivitasPage implements OnInit {
  kategori: string = '';
  semuaAktivitas: any[] = [];

  ngOnInit(): void {
    // Dummy data awal
    this.semuaAktivitas = [
      {
        judul: 'Pemasangan CCTV',
        deskripsi: 'Permintaan pemasangan CCTV di pintu gerbang.',
        kategori: 'Keluhan',
        tanggal_pengaduan: '25 Mei 2025',
        status: 'Diajukan',
        seen: false
      },
      {
        judul: 'Lampu Jalan Mati',
        deskripsi: 'Laporan tentang lampu jalan yang tidak menyala.',
        kategori: 'Laporan Gangguan',
        tanggal_pengaduan: '24 Mei 2025',
        status: 'Dalam Proses',
        seen: false
      },
      {
        judul: 'Taman Bermain Anak',
        deskripsi: 'Usulan penambahan permainan di taman anak.',
        kategori: 'Aspirasi',
        tanggal_pengaduan: '23 Mei 2025',
        status: 'Selesai',
        seen: false
      },
      {
        judul: 'Kebocoran Pipa',
        deskripsi: 'Laporan adanya kebocoran pipa di Blok C.',
        kategori: 'Laporan Gangguan',
        tanggal_pengaduan: '22 Mei 2025',
        status: 'Tertunda',
        seen: false
      }
    ];

    localStorage.setItem('laporan_pengaduan', JSON.stringify(this.semuaAktivitas));
  }

  pilihKategori(kategori: string) {
    this.kategori = this.kategori === kategori ? '' : kategori;
  }

  bukaLaporan(item: any) {
    if (!item.seen) {
      item.seen = true;
      localStorage.setItem('laporan_pengaduan', JSON.stringify(this.semuaAktivitas));
    }
  }

  get filteredAktivitasDalamProses() {
    return this.semuaAktivitas.filter(item =>
      item.status === 'Diajukan' || item.status === 'Dalam Proses'
    );
  }

  get filteredStatusAktivitas() {
    return this.semuaAktivitas.filter(item =>
      item.status === 'Selesai' || item.status === 'Tertunda'
    );
  }

  get jumlahNotifikasiDalamProses(): number {
    return this.filteredAktivitasDalamProses.filter(item => item.seen === false).length;
  }

  get jumlahNotifikasiStatusBaru(): number {
    return this.filteredStatusAktivitas.filter(item => item.seen === false).length;
  }
}
