import { UserInitialComponent } from './../components/user-initial/user-initial';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = true; // Change to false before deployment
  }



  // name: any = "sucker";
  // EventEmitter should not be used this way - only for `@Output()`s
  //nameChange: EventEmitter<string> = new EventEmitter<string>();
  userChange: Subject<Object> = new Subject<Object>();
  changeUser(user) {
    // this.name = 'Jane';
    this.userChange.next(user);
  }


  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/authenticate');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/profile');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  login() {
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    console.log('Token: ' + token);
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.changeUser({firstName:"Guest", lastName:"User"});
  }

  prepEndpoint(ep) {
    if (this.isDev) {
      return ep;
    } else {
      return 'http://localhost:8080/' + ep;
    }
  }
}
