import { SettingsPage } from './../pages/settings/settings';
import { ChartsPage } from './../pages/charts/charts';
import { MapPage } from './../pages/map/map';
import { AuthService } from './../providers/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { UserLogin } from '../pages/user-login/user-login';
import { Dashboard } from '../pages/dashboard/dashboard';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user: Object = {
    firstName: 'Guest',
    lastName: 'User'
  };

  initial: String = 'G';

  // make HelloIonicPage the root (or first) page
  rootPage = UserLogin;
  pages: Array<{title: string,icon:string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Dashbaord',icon:'home', component: Dashboard },
      { title: 'Map', icon: 'pin', component: MapPage },
      { title: 'Charts', icon:'stats', component: ChartsPage},
      { title: 'Logout',icon:'log-out', component: UserLogin }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    if (page.title === 'Logout') {
      this.authService.logout();
      console.log("logged out");
    }
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  openSettings() {
    this.menu.close();
    this.nav.setRoot(SettingsPage);
  }
}
