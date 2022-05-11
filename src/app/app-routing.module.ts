import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedAuthguardService } from './services/logged-authguard.service';

const routes: Routes = [
  {
    path: "", 
    component: HomeLayoutComponent, 
    canActivate: [LoggedAuthguardService],
    children: [
      {
        path: "registration", 
        component: RegistrationComponent
      },
      {
        path: "login", 
        component: LoginComponent
      },
      {
        path: "home", 
        component: HomeComponent, 
      }
    ]
  },
  {
    path: "",
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "profile", 
        component: ProfileComponent
      },
      {
        path: "wallet/expenses", 
        component: WalletComponent
      },
      {
        path: "wallet/incomes", 
        component: WalletComponent
      },
      {
        path: "dashboard", 
        component: DashboardComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
