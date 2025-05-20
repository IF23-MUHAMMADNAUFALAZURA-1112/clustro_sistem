import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PengaduanService, PengaduanAspirasi } from '../service/pengaduan.service';

@Component({
  selector: 'app-pengaduan-detail',
  templateUrl: './pengaduan-detail.page.html',
  styleUrls: ['./pengaduan-detail.page.scss'],
  standalone:false
})
export class PengaduanDetailPage implements OnInit {
  pengaduan?: PengaduanAspirasi;

  constructor(
    private route: ActivatedRoute,
    private pengaduanService: PengaduanService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.pengaduanService.getPengaduanById(id).subscribe((data) => {
      this.pengaduan = data;
    });
  }
}
