import { MyApp } from './../../app/app.component';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {

  username: String;
  password: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private authService: AuthService,
  private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
  }

  showToast(message) {
    let toastOptions: ToastOptions = {
      message: message,
      showCloseButton: true,
      position: 'top',
      duration: 3000,
      // dismissOnPageChange: true
    }
    this.toast.create(toastOptions).present();
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        // this.flashMessage.show('You are now logged in', {
        //   cssClass: 'alert-success',
        //   timeout: 5000
        // });
        this.showToast('You are now logged in')
        // this.router.navigate(['dashboard']);
        this.authService.getProfile().subscribe(profile => {
          this.authService.changeUser(profile.user);
        },
        err => {
          console.log(err);
          return false;
        });

        this.navCtrl.push(Dashboard);
      } else {
        // this.flashMessage.show(data.msg, {
        //   cssClass: 'alert-danger',
        //   timeout: 5000
        // });
        this.showToast(data.msg);
        // this.router.navigate(['login']);
      }
    });
  }

  dashboardPage() { this.navCtrl.push(Dashboard); }
  signupPage() { this.navCtrl.push(UserSignup); }
  forgotPasswordPage() { this.navCtrl.push(UserForgotpassword); }

}
