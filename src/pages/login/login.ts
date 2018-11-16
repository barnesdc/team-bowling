import { Component, Input } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
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
    this.navCtrl.push(TabsPage);
  }
  signOut() {}
}
