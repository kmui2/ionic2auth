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

    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ValidateService,
    AuthService,
    // AuthGuard,
    GooglePlus,
    Facebook
  ]
})
export class AppModule {}
