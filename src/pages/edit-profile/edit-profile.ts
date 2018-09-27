import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BowlerProfilePage } from "../bowler-profile/bowler-profile";
// import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: "page-edit-profile",
  templateUrl: "edit-profile.html"
})
export class EditProfilePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {}
  goToBowlerProfile(params) {
    if (!params) params = {};
    this.navCtrl.push(BowlerProfilePage);
  }
  // goToEditProfile(params) {
  //   if (!params) params = {};
  //   this.navCtrl.push(EditProfilePage);
  // }
}
