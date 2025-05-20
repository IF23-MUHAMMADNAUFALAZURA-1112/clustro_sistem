import { Component, OnInit } from '@angular/core';
import { PengaduanService, PengaduanAspirasi } from '../service/pengaduan.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pengaduan-list',
  templateUrl: './pengaduan-list.page.html',
  styleUrls: ['./pengaduan-list.page.scss'],
  standalone:false
})
export class PengaduanListPage implements OnInit {
  pengaduanList: PengaduanAspirasi[] = [];

  constructor(
    private pengaduanService: PengaduanService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadPengaduan();
  }

  loadPengaduan() {
    this.pengaduanService.getPengaduanAspirasi().subscribe((data) => {
      this.pengaduanList = data;
    });
  }

  openDetail(id: number) {
    this.navCtrl.navigateForward(`/pengaduan-detail/${id}`);
  }
}
