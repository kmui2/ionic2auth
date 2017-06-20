import { AuthService } from './../../providers/auth.service';
import { Component, OnDestroy } from '@angular/core';

/**
 * Generated class for the UserMenuComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent implements OnDestroy {

  text: string;
  user: Object = {
    firstName: 'Guest',
    lastName: 'User'
  };

  initial: String = 'G';
  _subscription: any;

  constructor(
    private authService: AuthService
  ) {
    console.log('Hello UserMenuComponent Component');
    this.text = 'Hello World';
    this._subscription = this.authService.userChange.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getUser() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.initial = profile.user.firstName.slice(0,1)
    },
    err => {
      console.log(err);
      return false;
    });
  }
}
