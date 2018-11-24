import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { BowlersPage } from "../bowlers/bowlers";

@Component({
  selector: "page-games-scores",
  templateUrl: "games-scores.html"
})
export class GamesScoresPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  Teams: any;
  public winningTeam = 0;
  public winningMembers = ["", "", ""];
  public tieTeams = ["", ""];
  ShowWinner = false;
  tie = false;

  ionViewDidLoad(){
    this.Teams = this.navParams.get("Teams");
    this.calculateWinner();
  }

  ionViewWillEnter(){

  }

  startGame() {
    this.navCtrl.push(BowlersPage);
  }

  calculateWinner(){
    console.log("Calculating Winners");
    console.log(this.Teams);
    var maxScore = -1, score=0;
    for(var i=0; i<this.Teams.length; i+=3){
      score = parseInt(this.Teams[i].score) + parseInt(this.Teams[i+1].score) + parseInt(this.Teams[i+2].score);
      console.log("Score: "+score+" for Team "+this.Teams[i].team_id);
      if(score == maxScore){
         this.tie = true;
         this.tieTeams[1] = this.Teams[i].team_id;
      }
      if(score > maxScore){
        maxScore = score;
        this.tie = false;
        this.winningTeam = this.Teams[i].team_id;
        this.winningMembers[0] = this.Teams[i].bowler_name;
        this.winningMembers[1] = this.Teams[i+1].bowler_name;
        this.winningMembers[2] = this.Teams[i+2].bowler_name;
        this.tieTeams[0] = this.Teams[i].team_id; 
      }
    }
    console.log("Winning Team is Team "+this.winningTeam+": "+this.winningMembers[0]+" "+this.winningMembers[1]+" "+this.winningMembers[2]);
    if(!this.tie){
      this.ShowWinner = true;
    }
  }
}
