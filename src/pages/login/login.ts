import { Component, Input } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController,
  Loading
} from "ionic-angular";
import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";
import { Bowler } from "../../models/bowler";
import { DatabaseProvider } from "../../providers/database/database";

// interface user {
//   email: string;
//   password: string;
// }

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  loading: Loading;
  // registerCredentials = { email: "", password: "" };
  @Input()
  bowler: Bowler;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private database: DatabaseProvider
  ) {}

  createUser() {}

  goToTabs(params) {
    if (!params) params = {};
    // this.database.CreateBowler("John", "Male", 300, "A", null, 1);
    this.navCtrl.push(TabsPage);
  }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  signOut() {}
}
