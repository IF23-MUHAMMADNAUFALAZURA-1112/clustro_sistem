import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-profile-satpam',
  templateUrl: './profile-satpam.page.html',
  styleUrls: ['./profile-satpam.page.scss'],
  standalone: false
})
export class ProfileSatpamPage implements OnInit {

  segmentValue = 'biodata';
 isModalOpen = false;
isTaskModalOpen = false;
  biodata = {
    nama: 'Budi Santoso',
    foto: 'assets/img/profile.png',
    alamat: 'Jl. Merdeka No.123, Jakarta',
    no_hp: '08123456789',
    no_whatsapp: '08123456789',
    email: 'budi@example.com',
    ttl: 'Jakarta, 1 Jan 1990',
    nik: '1234567890123456'
  };
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  user = {
    nama: '',
    nik: '',
    email: '',
    no_whatsapp: '',
    no_telepon: '',
    alamat: '',
    foto:''
  };

  satpam = {
    pos_jaga: 'Pos Utama Selatan',
    jadwal_jaga: 'Senin - Jumat, 08:00 - 16:00',
    shift: 'Pagi',
    area_patrol: 'Gedung A dan B',
    status_tugas: 'Bertugas'
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // Awal: copy biodata ke user saat komponen dimuat
    this.user = {
      nama: this.biodata.nama,
      nik: this.biodata.nik,
      email: this.biodata.email,
      no_whatsapp: this.biodata.no_whatsapp,
      no_telepon: this.biodata.no_hp,
      alamat: this.biodata.alamat,
      foto: this.biodata.foto
    };
    
  }
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.user.foto = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
  goBack() {
    this.navCtrl.back();
  }

  simpanBiodata() {
    this.closeModal();
    console.log('Biodata tersimpan:', this.user);
  }


openTaskModal() {
  this.isTaskModalOpen = true;
}

closeTaskModal() {
  this.isTaskModalOpen = false;
}

simpanTugas() {
  this.closeTaskModal();
  console.log('Tugas tersimpan:', this.satpam);
}
  }
