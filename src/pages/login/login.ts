import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BowlersPage } from "../bowlers/bowlers";
import { SignupPage } from "../signup/signup";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {}
  goToBowlers(params) {
    if (!params) params = {};
    this.navCtrl.push(BowlersPage);
  }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
}
