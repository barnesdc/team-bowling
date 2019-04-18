import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BowlersPage } from "../bowlers/bowlers";
import { GroupmeProvider } from "../../providers/groupme/groupme";

@Component({
  selector: "page-games-scores",
  templateUrl: "games-scores.html"
})
export class GamesScoresPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams, private chat: GroupmeProvider) {}

  Teams: any;
  public rank = [];
  public totalScores = [];
  ShowWinner = false;
  public count: any;

  //retrieve data sent from teams page
  ionViewDidLoad() {
    this.Teams = this.navParams.get("Teams");
    this.calculateWinner();
    }

  ionViewWillEnter() {}

  //if start game button is pressed, sends the user to the bowlers page to select present bowlers
  startGame() {
    this.navCtrl.setRoot(BowlersPage);
  }

  //function gathers individual scores and determines first, second and third placed teams
  calculateWinner() {
    console.log("Calculating Winners " + this.Teams.length);
    this.ShowWinner = true;
    var score = 0;

    for (var i = 0; i < this.Teams.length; i += 3) {
      console.log("Pass score");
      score =
        parseInt(this.Teams[i].score) +
        parseInt(this.Teams[i + 1].score) +
        parseInt(this.Teams[i + 2].score);
      if (this.rank.length == 0) {
        this.rank.push(i);
        this.totalScores.push(score);
      } else {
        for (var j = 0; j < this.rank.length; j++) {
          console.log("loop");
          if (score > this.totalScores[j]) {
            console.log("2");
            this.rank.splice(j, 0, i);
            this.totalScores.splice(j, 0, score);
            break;
          }
          if (j == this.rank.length - 1) {
            console.log("3");
            this.rank.splice(this.rank.length, 0, i);
            this.totalScores.splice(this.totalScores.length, 0, score);
            break;
          }
        }
      }
    }
    console.log("ranks " + this.rank);
    console.log("scores " + this.totalScores);
    this.chat.postResultData(this.Teams, this.rank, this.totalScores);
  }
}
