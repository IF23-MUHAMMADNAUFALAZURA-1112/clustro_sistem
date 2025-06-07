import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BukuTamuComponent } from './pages/buku-tamu/buku-tamu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule),
    data: { showNavbar: false }  // Navbar disembunyikan di halaman splash
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    data: { showNavbar: false }  // Navbar disembunyikan di halaman home
  },
  {
    path: 'login-clustro',
    loadChildren: () => import('./login-clustro/login-clustro.module').then(m => m.LoginClustroPageModule),
    data: { showNavbar: false }  // Navbar disembunyikan di halaman login
  },
  {
    path: 'registrasi',
    loadChildren: () => import('./registrasi/registrasi.module').then(m => m.RegistrasiPageModule),
    data: { showNavbar: false }  // Navbar disembunyikan di halaman registrasi
  },
  {
    path: 'dashboard-warga',
    loadChildren: () => import('./dashboard-warga/dashboard-warga.module').then(m => m.DashboardWargaPageModule),
    data: { showNavbar: true }   // Navbar muncul di halaman dashboard
  },
  {
    path: 'lihat-profile',
    loadChildren: () => import('./lihat-profile/lihat-profile.module').then(m => m.LihatProfilePageModule),
    data: { showNavbar: false }   // Navbar muncul di halaman profil
  },
  {
    path: 'dashboard-satpam',
    loadChildren: () => import('./dashboard-satpam/dashboard-satpam.module').then(m => m.DashboardSatpamPageModule),
    data: { showNavbar: false }   // Navbar muncul di halaman satpam
  },
  {
    path: 'pengajuan-dokumen',
    loadChildren: () =>
      import('./pengajuan-dokumen/pengajuan-dokumen.module').then(
        (m) => m.PengajuanDokumenPageModule
      ),
       data: { showNavbar: false }, // Navbar muncul di halaman pengaduan
  },
  {
    path: 'pengajuan-domisili',
    loadChildren: () =>
      import('./pengajuan-domisili/pengajuan-domisili.module').then(
        (m) => m.PengajuanDomisiliPageModule
      ),
       data: { showNavbar: false }, // Navbar muncul di halaman pengaduan
  },
  {
    path: 'pengantar-nikah',
    loadChildren: () =>
      import('./pengantar-nikah/pengantar-nikah.module').then(
        (m) => m.PengantarNikahPageModule
      ),
       data: { showNavbar: false }, // Navbar muncul di halaman pengaduan
  },
  {
    path: 'surat-pengantar-kematian',
    loadChildren: () =>
      import('./surat-pengantar-kematian/surat-pengantar-kematian.module').then(
        (m) => m.SuratPengantarKematianPageModule
      ),
       data: { showNavbar: false }, // Navbar muncul di halaman pengaduan
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule),
    data: { showNavbar: false }  // Navbar disembunyikan di halaman reset password
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
    data: { showNavbar: false }  // Navbar disembunyikan di halaman forgot password
  },
  {
    path: 'pengaduan-input',
    loadChildren: () => import('./pengaduan-input/pengaduan-input.module').then(m => m.PengaduanInputPageModule),
    data: { showNavbar: true }   // Navbar muncul di halaman pengaduan
  },
  {
    path: 'pengaduan-clustro',
    loadChildren: () => import('./pengaduan-clustro/pengaduan-clustro.module').then(m => m.PengaduanClustroPageModule),
    data: { showNavbar: true }   // Navbar muncul di halaman pengaduan clustro
  },
  {
    path: 'aktivitas',
    loadChildren: () =>
      import('./aktivitas/aktivitas.module').then((m) => m.AktivitasPageModule),
  },
  {
    path: 'dashboard-dokumen',
    loadChildren: () => import('./dashboard-dokumen/dashboard-dokumen.module').then( m => m.DashboardDokumenPageModule)
  },
  {
    path: 'halaman-pengaduan',
    loadChildren: () =>
      import('./halaman-pengaduan/halaman-pengaduan.module').then(
        (m) => m.HalamanPengaduanPageModule
      ),
  },


  { path: 'buku-tamu', component: BukuTamuComponent },

  {
    
    path: 'data-warga',
    loadChildren: () => import('./pages/data-warga/data-warga.module').then( m => m.DataWargaPageModule)
  },
  {
    path: 'history-tamu',
    loadChildren: () => import('./pages/history-tamu/history-tamu.module').then( m => m.HistoryTamuPageModule)
  },
  {
    path: 'notifikasi',
    loadChildren: () => import('./notifikasi/notifikasi.module').then( m => m.NotifikasiPageModule)
  },
  {
    path: 'aktivitas',
    loadChildren: () => import('./aktivitas/aktivitas.module').then( m => m.AktivitasPageModule)
  },
  {
  path: 'profile-satpam',
  loadChildren: () => import('./profile-satpam/profile-satpam.module').then( m => m.ProfileSatpamPageModule)
},

  {
    path: '**',
    redirectTo: 'splash'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
