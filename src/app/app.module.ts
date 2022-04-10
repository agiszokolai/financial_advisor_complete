import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './reusables/sidebar/sidebar.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { CardPasswordComponent } from './pages/profile/card-password/card-password.component';
import { CardProfileDataComponent } from './pages/profile/card-profile-data/card-profile-data.component';
import { AlertComponent } from './reusables/alert/alert.component';
import { AlertModule } from 'ngx-alerts';
import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import { MyInterceptor } from './interceptor/MyInterceptor';
import { WalletCardComponent } from './pages/wallet/wallet-card/wallet-card.component';
import { WalletModalComponent } from './pages/wallet/wallet-card/wallet-modal/wallet-modal.component';
import { WalletComponent } from './pages/wallet/wallet.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IncomesComponent,
    ProfileComponent,
    DashboardComponent,
    RegistrationComponent,
    LoginComponent,
    SidebarComponent,
    AppLayoutComponent,
    HomeLayoutComponent,
    CardPasswordComponent,
    CardProfileDataComponent,
    AlertComponent,
    WalletCardComponent,
    WalletModalComponent,
    WalletComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot({timeout: 5000}),
    TranslateModule.forRoot({
      defaultLanguage: 'hu',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
