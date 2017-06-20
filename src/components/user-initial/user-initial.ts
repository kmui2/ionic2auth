import { AuthService } from './../../providers/auth.service';
import { Component, OnDestroy } from '@angular/core';

/**
 * Generated class for the UserInitialComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-user-initial',
  templateUrl: 'user-initial.html'
})
export class UserInitialComponent implements OnDestroy {
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
      this.initial = this.getInitial(user);
      //missing first and last name
      console.log(user);
    });
  }

  getInitial(user) {
    return user.firstName.slice(0,1).toUpperCase();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
