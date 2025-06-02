import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: false,
})
export class SplashPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url;

    // Hanya redirect ke /home jika user sedang di / atau /splash
    if (currentUrl === '/' || currentUrl === '/splash') {
      setTimeout(() => {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }, 4000); // 4 detik
    }
  }
}
