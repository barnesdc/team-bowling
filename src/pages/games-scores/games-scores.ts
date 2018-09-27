import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-games-scores",
  templateUrl: "games-scores.html"
})
export class GamesScoresPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {}
  startGame() {
    window.alert("This feature is coming soon");
  }
}
