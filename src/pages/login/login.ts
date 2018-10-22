import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { BowlersPage } from "../bowlers/bowlers";
import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
<<<<<<< HEAD
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {}
  // goToBowlers(params) {
  //   if (!params) params = {};
  //   this.navCtrl.push(BowlersPage);
  // }
  goToTabs(params) {
    if (!params) params = {};
=======
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
>>>>>>> Updated Teams Page and database provider:
    this.navCtrl.push(TabsPage);
  }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
}
