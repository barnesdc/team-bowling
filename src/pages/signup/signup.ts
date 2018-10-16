import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import firebase from "firebase/app";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  name: string;
  email: string;
  password: string;
  constructor(public navCtrl: NavController) { }

  // createUserWithEmail() {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(this.email, this.password)
  //     .catch(function(error) {
  //       //handle error here
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       if (errorCode == "auth/email-already-in-use") {
  //         alert("This email is already in use.");
  //       } else {
  //         alert(errorMessage);
  //       }
  //       console.log(error);
  //     });
  // }
  test() {
    window.alert("Working on this feature");
    this.navCtrl.push(TabsPage);
  }
}
