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
    // tunggu 4 detik, lalu navigasi ke /home
    setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 4000);
  }

}
