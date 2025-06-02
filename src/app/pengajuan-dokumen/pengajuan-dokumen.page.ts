import { Component } from '@angular/core';

@Component({
  selector: 'app-pengajuan-dokumen',
  templateUrl: './pengajuan-dokumen.page.html',
  styleUrls: ['./pengajuan-dokumen.page.scss'],
  standalone: false,
})
export class PengajuanDokumenPage {
  // Nilai tetap untuk jenis dokumen karena input readonly
  selectedDokumen = 'Surat pengantar KTP';

  statusPerkawinanOptions = [
    'Belum menikah',
    'Menikah',
    'Cerai hidup',
    'Cerai mati',
  ];

  jenisKelaminOptions = ['Laki-laki', 'Perempuan'];

  formData = {
    namaLengkap: '',
    alamat: '',
    tempatLahir: '',
    tanggalLahir: '',
    kewarganegaraan: '',
    statusPerkawinan: this.statusPerkawinanOptions[0],
    jenisKelamin: this.jenisKelaminOptions[0],
  };

  constructor() {}

  onSubmit() {
    console.log('Form data submitted:', {
      jenisDokumen: this.selectedDokumen,
      ...this.formData,
    });
    
    // Tambahkan aksi lain jika perlu, misal kirim ke backend
  }
  
}
