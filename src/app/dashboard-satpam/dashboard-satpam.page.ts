import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-satpam',
  templateUrl: './dashboard-satpam.page.html',
  styleUrls: ['./dashboard-satpam.page.scss'],
  standalone: false,
})
export class DashboardSatpamPage implements OnInit {
  showProfileMenu = false;

  // Typewriter setup
  texts = ['Welcome!', 'Clustro', 'Your Home', 'Your Comfort', 'Your App'];
  displayText = '';
  private txtIndex = 0;
  private charIndex = 0;
  private typingSpeed = 150;
  private pauseBetween = 2000;

  constructor(
    private location: Location,
    private alertCtrl: AlertController,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.startTypewriter();
  }

  goBack(): void {
    this.location.back();
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  viewProfile() {
    console.log('Lihat Profil');
  }
  // pastikan ini public
  public async confirmLogout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin keluar?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Ya', handler: () => this.doLogout() }
      ]
    });
    await alert.present();
  }

  // sudah public
  public logout() {
    this.confirmLogout();
  }

  public doLogout() {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('/login-clustro', { replaceUrl: true });
  }
  // Typewriter methods
  private startTypewriter() {
    const current = this.texts[this.txtIndex];
    if (this.charIndex < current.length) {
      this.displayText += current.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.startTypewriter(), this.typingSpeed);
    } else {
      setTimeout(() => this.eraseText(), this.pauseBetween);
    }
  }

  private eraseText() {
    if (this.charIndex > 0) {
      this.displayText = this.displayText.slice(0, -1);
      this.charIndex--;
      setTimeout(() => this.eraseText(), this.typingSpeed / 2);
    } else {
      this.txtIndex = (this.txtIndex + 1) % this.texts.length;
      setTimeout(() => this.startTypewriter(), this.typingSpeed);
    }
  }
}
