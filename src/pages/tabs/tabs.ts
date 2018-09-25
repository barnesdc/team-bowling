import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { GamesScoresPage } from "../games-scores/games-scores";
import { BowlersPage } from "../bowlers/bowlers";
import { BowlerProfilePage } from "../bowler-profile/bowler-profile";
import { InformationPage } from "../information/information";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = GamesScoresPage;
  tab2Root: any = BowlersPage;
  tab3Root: any = BowlerProfilePage;
  tab4Root: any = InformationPage;
  constructor(public navCtrl: NavController) {}
}
