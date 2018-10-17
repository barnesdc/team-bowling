import { Component, Input } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";
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
  splash = true;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private database: DatabaseProvider
  ) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 3000);
  }

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
