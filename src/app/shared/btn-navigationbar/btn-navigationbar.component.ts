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
  selectedSegment = 'dashboard';
  routerSub!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    // Inisialisasi selectedSegment berdasarkan URL saat ini
    setTimeout(() => {
      this.updateSelectedSegment(this.router.url);
    }, 50);

    // Subscribe event route untuk update selectedSegment saat navigasi
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedSegment(event.urlAfterRedirects);
      }
    });
  }

  updateSelectedSegment(url: string) {
    console.log('Navigated to:', url);

    if (url === '/dashboard-warga' || url.startsWith('/dashboard-warga/')) {
      this.selectedSegment = 'dashboard';
    } else if (url === '/pengaduan-clustro' || url.startsWith('/pengaduan-clustro/')) {
      this.selectedSegment = 'service';
    } else if (url === '/warga-connect' || url.startsWith('/warga-connect/')) {
      this.selectedSegment = 'warga-connect';
    } else if (url === '/warga-docs' || url.startsWith('/warga-docs/')) {
      this.selectedSegment = 'warga-docs';
    } else if (url === '/warga-logs' || url.startsWith('/warga-logs/')) {
      this.selectedSegment = 'warga-logs';
    } else {
      this.selectedSegment = 'dashboard'; // default fallback
    }
  }

  onSegmentChanged(event: any) {
    const selectedValue: string = event.detail.value;
    console.log('Segment clicked:', selectedValue);

    this.selectedSegment = selectedValue;

    switch (selectedValue) {
      case 'dashboard':
        this.router.navigate(['/dashboard-warga']);
        break;
      case 'warga-connect':
        this.router.navigate(['/warga-connect']);
        break;
      case 'warga-docs':
        this.router.navigate(['/warga-docs']);
        break;
      case 'warga-logs':
        this.router.navigate(['/warga-logs']);
        break;
      case 'service':
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
