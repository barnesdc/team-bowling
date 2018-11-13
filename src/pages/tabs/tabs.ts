import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { GamesScoresPage } from "../games-scores/games-scores";
import { TeamsPage } from "../teams/teams";
import { InformationPage } from "../information/information";
import { BowlersPage } from "../bowlers/bowlers";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = GamesScoresPage;
  tab2Root: any = BowlersPage;
  tab3Root: any = TeamsPage;
  tab4Root: any = InformationPage;
  constructor(public navCtrl: NavController) {}
}
