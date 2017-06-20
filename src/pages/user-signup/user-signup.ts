import { ValidateService } from './../../providers/validate.service';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';

@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignup {
  firstName: String;
  lastName: String;
  email: String;
  username: String;
  password: String;
  passwordConfirm: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private toast: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
  }

  showToast(message) {
    let toastOptions: ToastOptions = {
      message: message,
      showCloseButton: true,
      position: 'top',
      // dismissOnPageChange: true
    }
    this.toast.create(toastOptions).present();
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password
    }

    console.log(user);

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      // this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      this.showToast('Please fill in all fields');
      return false;
    }

    if (user.password != this.passwordConfirm) {
      // this.flashMessage.show('Entered Passwords Don\'t Match', { cssClass: 'alert-danger', timeout: 3000 });
      this.showToast('Entered Passwords Don\'t Match');
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      // this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      this.showToast('Please use a valid email');
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        // this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
      this.showToast('Registration Success!');
      this.navCtrl.push(Dashboard);
        // this.router.navigate(['/login']);
      } else {
      this.showToast('Something went wrong');
        // this.router.navigate(['/register']);
      }
    });

  }

  dashboardPage() { this.navCtrl.push(Dashboard); }
  loginPage() { this.navCtrl.push(UserLogin); }
  forgotPasswordPage() { this.navCtrl.push(UserForgotpassword); }


}
