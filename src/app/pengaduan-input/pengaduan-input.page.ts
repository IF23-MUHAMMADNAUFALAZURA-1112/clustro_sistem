import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaduan-input',
  templateUrl: './pengaduan-input.page.html',
  styleUrls: ['./pengaduan-input.page.scss'],
  standalone: false,
})
export class PengaduanInputPage implements OnInit {
  form = {
    judul: '',
    deskripsi: '',
    kategori: '',
    tanggal_pengaduan: '', // format: DD/MM/YYYY
    foto_pengaduan_1: null as string | null,
    foto_pengaduan_2: null as string | null,
    foto_pengaduan_3: null as string | null,
  };

  fotoFiles: File[] = [];
  fotoPreview: string[] = [];
  fileTypeInvalid = false;

  maxTanggal: string = '';
  minTanggal: string = '';

  showCalendar: boolean = true;
  submitting: boolean = false;

  ngOnInit() {
    this.setTanggalBatas();
  }

  setTanggalBatas() {
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    this.maxTanggal = today.toISOString().substring(0, 10);
    this.minTanggal = lastYear.toISOString().substring(0, 10);

    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    this.form.tanggal_pengaduan = `${day}/${month}/${year}`;
  }

  onTanggalChange(event: any) {
    const rawDate = new Date(event.detail.value);
    const day = ('0' + rawDate.getDate()).slice(-2);
    const month = ('0' + (rawDate.getMonth() + 1)).slice(-2);
    const year = rawDate.getFullYear();
    this.form.tanggal_pengaduan = `${day}/${month}/${year}`;
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  onKategoriCancel() {
    this.form.kategori = '';
  }

  judulInvalid() {
    return this.form.judul.length > 0 && (this.form.judul.length < 5 || this.form.judul.length > 100);
  }

  deskripsiInvalid() {
    return this.form.deskripsi.length > 0 && (this.form.deskripsi.length < 10 || this.form.deskripsi.length > 500);
  }

  kategoriInvalid() {
    return this.form.kategori === '';
  }

  tanggalPengaduanInvalid() {
    return !this.form.tanggal_pengaduan;
  }

  formIsValid() {
    return (
      this.form.judul.length >= 5 &&
      this.form.judul.length <= 100 &&
      this.form.deskripsi.length >= 10 &&
      this.form.deskripsi.length <= 500 &&
      this.form.kategori !== '' &&
      !!this.form.tanggal_pengaduan
    );
  }

  onFileChange(event: any) {
    this.fileTypeInvalid = false;
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length && this.fotoFiles.length < 3; i++) {
      const file = files.item(i);
      if (file) {
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
          this.fileTypeInvalid = true;
          continue;
        }
        this.fotoFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fotoPreview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    event.target.value = '';
  }

  hapusFoto(index: number) {
    this.fotoFiles.splice(index, 1);
    this.fotoPreview.splice(index, 1);
  }

  async submitForm() {
    if (!this.formIsValid() || this.fileTypeInvalid) {
      window.alert('Mohon lengkapi data dan pastikan file foto valid!');
      return;
    }

    this.submitting = true;

    try {
      // Simulasi delay 1.5 detik, misal panggil API di sini
      await new Promise(resolve => setTimeout(resolve, 1500));

      const dataKirim = {
        judul: this.form.judul,
        deskripsi: this.form.deskripsi,
        kategori: this.form.kategori,
        tanggal_pengaduan: this.form.tanggal_pengaduan,
        status: 'Diajukan',
        foto_pengaduan_1: this.fotoPreview[0] || null,
        foto_pengaduan_2: this.fotoPreview[1] || null,
        foto_pengaduan_3: this.fotoPreview[2] || null,
      };

      console.log('Data Laporan Dikirim:', dataKirim);

      window.alert('Laporan berhasil dikirim!');

      // Reset form dan tampilkan kalender lagi
      const today = new Date();
      const day = ('0' + today.getDate()).slice(-2);
      const month = ('0' + (today.getMonth() + 1)).slice(-2);
      const year = today.getFullYear();
      const tanggalFormatted = `${day}/${month}/${year}`;

      this.form = {
        judul: '',
        deskripsi: '',
        kategori: '',
        tanggal_pengaduan: tanggalFormatted,
        foto_pengaduan_1: null,
        foto_pengaduan_2: null,
        foto_pengaduan_3: null,
      };
      this.fotoFiles = [];
      this.fotoPreview = [];
      this.fileTypeInvalid = false;
      this.showCalendar = true;

    } catch (error) {
      window.alert('Terjadi kesalahan saat mengirim laporan.');
    } finally {
      this.submitting = false;
    }
  }
}
