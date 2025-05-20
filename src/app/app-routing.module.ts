import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  { path: 'splash', 
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule) 
  },  
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login-clustro',
    loadChildren: () => import('./login-clustro/login-clustro.module').then( m => m.LoginClustroPageModule)
  },
  {
    path: 'registrasi',
    loadChildren: () => import('./registrasi/registrasi.module').then( m => m.RegistrasiPageModule)
  },
  {
    path: 'dashboard-warga',
    loadChildren: () => import('./dashboard-warga/dashboard-warga.module').then( m => m.DashboardWargaPageModule)
  },
  {
    path: 'lihat-profile',
    loadChildren: () => import('./lihat-profile/lihat-profile.module').then( m => m.LihatProfilePageModule)
  },
  {
    path: 'dashboard-satpam',
    loadChildren: () => import('./dashboard-satpam/dashboard-satpam.module').then( m => m.DashboardSatpamPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'pengaduan-list',
    loadChildren: () => import('./pengaduan-list/pengaduan-list.module').then( m => m.PengaduanListPageModule)
  },
  {
    path: 'pengaduan-detail',
    loadChildren: () => import('./pengaduan-detail/pengaduan-detail.module').then( m => m.PengaduanDetailPageModule)
  },
  {
    path: 'pengaduan-input',
    loadChildren: () => import('./pengaduan-input/pengaduan-input.module').then( m => m.PengaduanInputPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
