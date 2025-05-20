import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-navigationbar',
  templateUrl: './btn-navigationbar.component.html',
  styleUrls: ['./btn-navigationbar.component.scss'],
  standalone:false
})
export class BtnNavigationbarComponent {

  constructor(private router: Router) {}

  onSegmentChanged(event: any) {
    const value = event.detail.value;
    this.router.navigate([`/${value}`]); // Navigasi sesuai tab yang dipilih
  }
}
