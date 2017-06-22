import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {

  username: String;
  password: String;

  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService,
    private toast: ToastController,
    private googlePlus: GooglePlus,
    private fb: Facebook) {
  }

  loginWithGoogle() {

    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  loginWithFacebook() {

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
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
