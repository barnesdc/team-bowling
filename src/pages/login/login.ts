import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BowlersPage } from "../bowlers/bowlers";
import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  splash = true;

  constructor(
    public navCtrl: NavController,
    // private alertCtrl: AlertController,
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
    // this.database
    //   .CreateBowler("John", "Male", 300, "A", 0)
    //   .then((data: any) => {
    //     console.log("something happened");
    //   });
    this.navCtrl.push(TabsPage);
  }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
}
