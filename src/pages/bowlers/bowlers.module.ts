import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BowlersPage } from './bowlers';

@NgModule({
  declarations: [
    BowlersPage,
  ],
  imports: [
    IonicPageModule.forChild(BowlersPage),
  ],
})
export class BowlersPageModule {}
