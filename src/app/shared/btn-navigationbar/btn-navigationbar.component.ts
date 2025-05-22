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
  selectedSegment = 'dashboard';

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

    if (url === '/dashboard-warga' || url.startsWith('/dashboard-warga/')) {
      this.selectedSegment = 'dashboard';
    } else if (url === '/pengaduan-clustro' || url.startsWith('/pengaduan-clustro/')) {
      this.selectedSegment = 'aktifitas-warga';
    } else if (url === '/warga-interaksi' || url.startsWith('/warga-interaksi/')) {
      this.selectedSegment = 'warga-interaksi';
    } else if (url === '/warga-dokumen' || url.startsWith('/warga-dokumen/')) {
      this.selectedSegment = 'warga-dokumen';
    } else if (url === '/aktifitas-warga' || url.startsWith('/aktifitas-warga/')) {
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

      case 'warga-interaksi':
        this.router.navigate(['/warga-interaksi']);
        break;

      case 'warga-dokumen':
        this.router.navigate(['/warga-dokumen']);
        break;

      case 'aktifitas-warga':
        this.router.navigate(['/pengaduan-clustro']);
        break;

      default:
        this.router.navigate(['/dashboard-warga']);
        break;
    }
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
