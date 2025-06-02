import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
    data: { showNavbar: false }, // Navbar disembunyikan di halaman splash
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    data: { showNavbar: false }, // Navbar disembunyikan di halaman home
  },
  {
    path: 'login-clustro',
    loadChildren: () =>
      import('./login-clustro/login-clustro.module').then(
        (m) => m.LoginClustroPageModule
      ),
    data: { showNavbar: false }, // Navbar disembunyikan di halaman login
  },
  {
    path: 'registrasi',
    loadChildren: () =>
      import('./registrasi/registrasi.module').then(
        (m) => m.RegistrasiPageModule
      ),
    data: { showNavbar: false }, // Navbar disembunyikan di halaman registrasi
  },
  {
    path: 'dashboard-warga',
    loadChildren: () =>
      import('./dashboard-warga/dashboard-warga.module').then(
        (m) => m.DashboardWargaPageModule
      ),
    data: { showNavbar: true }, // Navbar muncul di halaman dashboard
  },
  {
    path: 'lihat-profile',
    loadChildren: () =>
      import('./lihat-profile/lihat-profile.module').then(
        (m) => m.LihatProfilePageModule
      ),
    data: { showNavbar: false }, // Navbar muncul di halaman profil
  },
  {
    path: 'dashboard-satpam',
    loadChildren: () =>
      import('./dashboard-satpam/dashboard-satpam.module').then(
        (m) => m.DashboardSatpamPageModule
      ),
    data: { showNavbar: false }, // Navbar muncul di halaman satpam
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
    data: { showNavbar: false }, // Navbar disembunyikan di halaman reset password
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
    data: { showNavbar: false }, // Navbar disembunyikan di halaman forgot password
  },
  {
    path: 'pengaduan-input',
    loadChildren: () =>
      import('./pengaduan-input/pengaduan-input.module').then(
        (m) => m.PengaduanInputPageModule
      ),
    data: { showNavbar: false }, // Navbar muncul di halaman pengaduan
  },
  {
    path: 'aktivitas',
    loadChildren: () =>
      import('./aktivitas/aktivitas.module').then((m) => m.AktivitasPageModule),
  },

  {
    path: 'halaman-pengaduan',
    loadChildren: () =>
      import('./halaman-pengaduan/halaman-pengaduan.module').then(
        (m) => m.HalamanPengaduanPageModule
      ),
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
    path: 'dashboard-dokumen',
    loadChildren: () => import('./dashboard-dokumen/dashboard-dokumen.module').then( m => m.DashboardDokumenPageModule)
  },
  {
    path: '**',
    redirectTo: 'splash',
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
