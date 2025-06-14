import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-btn-navigationbar',
  templateUrl: './btn-navigationbar.component.html',
  styleUrls: ['./btn-navigationbar.component.scss'],
  standalone: false
})
export class BtnNavigationbarComponent implements OnInit, OnDestroy {
  // Inisialisasi segment yang aktif, default 'dashboard'
  selectedSegment = 'dashboard-waarga';

  // Subscription untuk memonitor perubahan route
  routerSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    // Set segment aktif awal berdasar URL
    setTimeout(() => {
      this.updateSelectedSegment(this.router.url);
    }, 50);

    // Subscribe event route untuk update segment saat navigasi
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedSegment(event.urlAfterRedirects);
      }
    });
  }

  /**
   * Update segment aktif berdasar URL saat ini
   */
  updateSelectedSegment(url: string) {
    console.log('Navigated to:', url);

    // Menentukan segmen berdasarkan URL saat ini
    if (url === '/dashboard-warga' || url.startsWith('/dashboard-warga/')) {
      this.selectedSegment = 'dashboard';
    } else if (url === '/halaman-pengaduan' || url.startsWith('/halaman-pengaduan/')) {
      this.selectedSegment = 'pengaduan';  // Ganti ini supaya sesuai value segment-button 'pengaduan'
    } else if (url === '/daftar-tamu' || url.startsWith('/daftar-tamu/')) {
      this.selectedSegment = 'daftar-tamu';
    } else if (url === '/dashboard-dokumen' || url.startsWith('/dashboard-dokumen/')) {
      this.selectedSegment = 'dashboard-dokumen';
    } else if (url === '/aktivitas' || url.startsWith('/aktivitas/')) {
      this.selectedSegment = 'aktifitas-warga';
    } else {
      this.selectedSegment = 'dashboard'; // fallback
    }
  }

  /**
   * Handler klik segment, navigasi ke route sesuai
   */
  onSegmentChanged(event: any) {
    const selectedValue: string = event.detail.value;
    console.log('Segment clicked:', selectedValue);

    this.selectedSegment = selectedValue;

    switch (selectedValue) {
      case 'dashboard':
        this.router.navigate(['/dashboard-warga']);
        break;

      case 'daftar-tamu':
        this.router.navigate(['/daftar-tamu']);
        break;

      case 'warga-dokumen':
        this.router.navigate(['/dashboard-dokumen']);
        break;

      case 'aktifitas-warga':
        this.router.navigate(['/aktivitas']);
        break;

      case 'pengaduan':
        this.router.navigate(['/halaman-pengaduan']); // Navigasi ke halaman pengaduan-clustro
        break;

      default:
        this.router.navigate(['/dashboard-warga']);
        break;
    }
  }

  ngOnDestroy() {
    // Unsubscribe dari routerSub saat komponen dihancurkan
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
