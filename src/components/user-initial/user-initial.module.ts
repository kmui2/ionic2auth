import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInitialComponent } from './user-initial';

@NgModule({
  declarations: [
    UserInitialComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserInitialComponent),
  ],
  exports: [
    UserInitialComponent
  ]
})
export class UserInitialComponentModule {}
