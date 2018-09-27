import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EditProfilePage } from "../edit-profile/edit-profile";
// import { BowlerProfilePage } from "../bowler-profile/bowler-profile";

@Component({
  selector: "page-bowler-profile",
  templateUrl: "bowler-profile.html"
})
export class BowlerProfilePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {}
  goToEditProfile(params) {
    if (!params) params = {};
    this.navCtrl.push(EditProfilePage);
  }
  // goToBowlerProfile(params) {
  //   if (!params) params = {};
  //   this.navCtrl.push(BowlerProfilePage);
  // }
}
