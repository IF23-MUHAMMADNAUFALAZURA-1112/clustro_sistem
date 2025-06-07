import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.page.html',
  styleUrls: ['./notifikasi.page.scss'],
  standalone: false,
})
export class NotifikasiPage implements OnInit {
 notifications = [
    {
      title: 'Pembayaran Berhasil',
      message: 'Terima kasih, pembayaran kamu telah dikonfirmasi.',
      icon: 'checkmark-circle-outline',
      date: new Date(),
      read: false
    },
    {
      title: 'Jadwal Baru',
      message: 'Jadwal meeting kamu telah diperbarui.',
      icon: 'calendar-outline',
      date: new Date(Date.now() - 3600 * 1000 * 5),
      read: true
    },
    {
      title: 'Pengumuman',
      message: 'Maintenance server akan dilakukan malam ini pukul 23.00 WIB.',
      icon: 'megaphone-outline',
      date: new Date(Date.now() - 3600 * 1000 * 24),
      read: false
    }
  ];
  refreshNotifications(event: any) {
    setTimeout(() => {
      // Di sini bisa fetch notifikasi terbaru dari API
      event.target.complete();
    }, 1000);
  }
  
    goBack() {
      this.navCtrl.back();
    }
  


  constructor(
        private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

}
