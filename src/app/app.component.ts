import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
// import { NavController } from
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;
  splash = true;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 3000);
  }
}
