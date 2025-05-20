import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PengaduanAspirasi {
  id: number;
  warga_id: number;
  judul: string;
  deskripsi: string;
  kategori: 'Keluhan' | 'Laporan Gangguan' | 'Aspirasi';
  status: 'Diajukan' | 'Diproses' | 'Selesai';
  tanggal_pengaduan: string;
  tanggal_selesai?: string | null;
  foto_pengaduan_1?: string | null;
  foto_pengaduan_2?: string | null;
  foto_pengaduan_3?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PengaduanService {
  private dataPengaduan: PengaduanAspirasi[] = [
    {
      id: 1,
      warga_id: 101,
      judul: 'Lampu Jalan Mati di RT 05',
      deskripsi: 'Lampu jalan mati sudah 2 minggu, membahayakan warga saat malam.',
      kategori: 'Keluhan',
      status: 'Diproses',
      tanggal_pengaduan: '2025-05-01T08:00:00Z',
      tanggal_selesai: null,  // Sekarang sudah valid
      foto_pengaduan_1: 'https://example.com/foto1.jpg',
      foto_pengaduan_2: 'https://example.com/foto2.jpg',
      foto_pengaduan_3: null,
    },
    // Data dummy lain bisa ditambah di sini
  ];

  getPengaduanAspirasi(): Observable<PengaduanAspirasi[]> {
    return of(this.dataPengaduan);
  }

  getPengaduanById(id: number): Observable<PengaduanAspirasi | undefined> {
    const found = this.dataPengaduan.find((item) => item.id === id);
    return of(found);
  }
}
