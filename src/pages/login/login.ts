import { Component, Input } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { SignupPage } from "../signup/signup";
import { TabsPage } from "../tabs/tabs";
import { DatabaseProvider } from "../../providers/database/database";
<<<<<<< HEAD

// interface user {
//   email: string;
//   password: string;
// }
=======
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  splash = true;

  constructor(
    public navCtrl: NavController,
<<<<<<< HEAD
<<<<<<< HEAD
    private alertCtrl: AlertController,
=======
    // private alertCtrl: AlertController,
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
=======
    // private alertCtrl: AlertController,
>>>>>>> 237052c7b27570405932c856f553ac0a8e436d89
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
<<<<<<< HEAD
<<<<<<< HEAD
    // this.database.CreateBowler("John", "Male", 300, "A", null, 1);
=======
=======
>>>>>>> 237052c7b27570405932c856f553ac0a8e436d89
    // this.database
    //   .CreateBowler("John", "Male", 300, "A", 0)
    //   .then((data: any) => {
    //     console.log("something happened");
    //   });
<<<<<<< HEAD
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
=======
>>>>>>> 237052c7b27570405932c856f553ac0a8e436d89
    this.navCtrl.push(TabsPage);
  }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  signOut() {}
}
