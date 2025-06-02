import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-dokumen',
  templateUrl: './dashboard-dokumen.page.html',
  styleUrls: ['./dashboard-dokumen.page.scss'],
  standalone:false
})
export class DashboardDokumenPage implements OnInit {
  
dokumenMenu = [
  { icon: 'document-text-outline', label: 'Pengantar KTP', badge: '', link: '/pengajuan-dokumen' },
  { icon: 'home-outline', label: 'Domisili', badge: '', link: '/pengajuan-domisili' },
  { icon: 'heart-dislike-outline', label: 'Kematian', badge: 'Baru', link: '/surat-pengantar-kematian' },
  { icon: 'people-circle-outline', label: 'Pengantar Nikah', badge: 'Baru', link: '/pengantar-nikah' }
];



  constructor() {}

  ngOnInit() {}
}
