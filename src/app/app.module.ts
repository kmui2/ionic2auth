import { SplashPage } from './../pages/splash/splash';
import { SettingsPage } from './../pages/settings/settings';
import { ChartsPage } from './../pages/charts/charts';
import { MapPage } from './../pages/map/map';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { ValidateService } from './../providers/validate.service';
import { AuthService } from './../providers/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { UserLogin } from '../pages/user-login/user-login';
import { UserSignup } from '../pages/user-signup/user-signup';
import { UserForgotpassword } from '../pages/user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../pages/dashboard/dashboard';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserMenuComponent } from '../components/user-menu/user-menu';
import { UserInitialComponent } from '../components/user-initial/user-initial';

@NgModule({
  declarations: [
    MyApp,

    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
    UserMenuComponent,
    UserInitialComponent,
    MapPage,
    ChartsPage,
    SettingsPage,
    SplashPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    FlashMessagesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
    MapPage,
    ChartsPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ValidateService,
    AuthService,
    // AuthGuard,
    GooglePlus,
    Facebook,
    GoogleMaps
  ]
})
export class AppModule {}
