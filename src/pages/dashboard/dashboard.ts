
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  showSearchbar: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  toggleSearchbar() {
    this.showSearchbar = !this.showSearchbar;
    console.log('showSearchbar = ' + this.showSearchbar);
  }

}
