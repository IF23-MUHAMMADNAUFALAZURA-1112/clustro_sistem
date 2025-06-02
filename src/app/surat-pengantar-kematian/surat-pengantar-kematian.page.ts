import { Component } from '@angular/core';

@Component({
  selector: 'app-surat-pengantar-kematian',
  templateUrl: './surat-pengantar-kematian.page.html',
  styleUrls: ['./surat-pengantar-kematian.page.scss'],
  standalone:false
})
export class SuratPengantarKematianPage {
  // Definisikan formData sesuai field di form HTML
  formData = {
    nama_meninggal: '',
    nik_meninggal: '',
    jenis_kelamin_meninggal: '',
    tempat_lahir_meninggal: '',
    tanggal_lahir_meninggal: '',
    agama_meninggal: '',
    hari_meninggal: '',
    tanggal_meninggal: '',
    tempat_meninggal: '',
    penyebab_kematian: '',

    nama_pelapor: '',
    nik_pelapor: '',
    tempat_lahir_pelapor: '',
    tanggal_lahir_pelapor: '',
    pekerjaan_pelapor: '',
    hubungan_pelapor: '',
  };

  constructor() {}

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Data pengajuan:', this.formData);
      alert('Pengajuan Surat Pengantar Kematian berhasil dikirim.');
      form.resetForm();
      // Reset formData jika perlu
      this.formData = {
        nama_meninggal: '',
        nik_meninggal: '',
        jenis_kelamin_meninggal: '',
        tempat_lahir_meninggal: '',
        tanggal_lahir_meninggal: '',
        agama_meninggal: '',
        hari_meninggal: '',
        tanggal_meninggal: '',
        tempat_meninggal: '',
        penyebab_kematian: '',

        nama_pelapor: '',
        nik_pelapor: '',
        tempat_lahir_pelapor: '',
        tanggal_lahir_pelapor: '',
        pekerjaan_pelapor: '',
        hubungan_pelapor: '',
      };
    } else {
      alert('Form belum lengkap, harap cek kembali isian Anda.');
    }
  }
}
