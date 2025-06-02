import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  submitting: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.setTanggalHariIni();
  }

  setTanggalHariIni() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    this.form.tanggal_pengaduan = `${day}/${month}/${year}`;
  }

  hapusKategori() {
    this.form.kategori = '';
  }

  isNotEmpty(str?: string): boolean {
    return !!str && str.length > 0;
  }

  onFileChange(event: any) {
    this.fileTypeInvalid = false;
    const file: File = event.target.files[0];

    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        this.fileTypeInvalid = true;
        event.target.value = '';
        return;
      }

      if (this.fotoFiles.length >= 3) {
        event.target.value = '';
        this.showAlert('Peringatan', 'Maksimal 3 foto yang dapat diunggah.');
        return;
      }

      this.fotoFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPreview.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    event.target.value = '';
  }

  hapusFoto(index: number) {
    this.fotoFiles.splice(index, 1);
    this.fotoPreview.splice(index, 1);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      cssClass: 'my-custom-alert',
      buttons: ['OK'],
      backdropDismiss: false,
    });
    await alert.present();
  }

  formIsValid(): boolean {
    return (
      this.form.judul.length >= 5 &&
      this.form.judul.length <= 100 &&
      this.form.deskripsi.length >= 10 &&
      this.form.deskripsi.length <= 500 &&
      this.form.kategori !== '' &&
      !!this.form.tanggal_pengaduan
    );
  }

  async submitForm() {
    if (!this.formIsValid() || this.fileTypeInvalid) {
      await this.showAlert('Peringatan', 'Mohon lengkapi data dan pastikan file foto valid!');
      return;
    }

    this.submitting = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500)); // simulasi loading

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

      await this.showAlert('Berhasil', 'Laporan berhasil dikirim!');

      // Navigasi halus setelah alert ditutup
      this.router.navigate(['/halaman-pengaduan'], { replaceUrl: true });

      // Reset form (opsional jika ingin form dikosongkan saat kembali)
      this.form.judul = '';
      this.form.deskripsi = '';
      this.form.kategori = '';
      this.setTanggalHariIni();
      this.form.foto_pengaduan_1 = null;
      this.form.foto_pengaduan_2 = null;
      this.form.foto_pengaduan_3 = null;
      this.fotoFiles = [];
      this.fotoPreview = [];
      this.fileTypeInvalid = false;

    } catch (error) {
      await this.showAlert('Error', 'Terjadi kesalahan saat mengirim laporan.');
    } finally {
      this.submitting = false;
    }
  }
}
