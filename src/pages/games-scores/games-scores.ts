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
  public secondTeam = 0;
  public secondMembers = ["", "", ""];
  public thirdTeam = 0;
  public thirdMembers = ["", "", ""];
  public tieTeams = ["", ""];
  public winningScore = 0;
  public secondScore = 0;
  public thirdScore = 0;
  ShowWinner = false;
  ShowSecond = false;
  ShowThird = false;
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
    var maxScore = -1, score=0, secondScore=0, thirdScore=0;
    for(var i=0; i<this.Teams.length; i+=3){
      score = parseInt(this.Teams[i].score) + parseInt(this.Teams[i+1].score) + parseInt(this.Teams[i+2].score);
      console.log("Score: "+score+" for Team "+this.Teams[i].team_id);
      if(score == maxScore){
         this.tie = true;
         this.tieTeams[1] = this.Teams[i].team_id;
      }
      else if(score > maxScore){
        maxScore = score;
        this.winningScore = score;
        this.tie = false;
        this.thirdTeam = this.secondTeam;
        this.secondTeam = this.winningTeam;
        this.winningTeam = this.Teams[i].team_id;
        
        this.thirdMembers[0] = this.secondMembers[0];
        this.thirdMembers[1] = this.secondMembers[1];
        this.thirdMembers[2] = this.secondMembers[2];

        this.secondMembers[0] = this.winningMembers[0];
        this.secondMembers[1] = this.winningMembers[1];
        this.secondMembers[2] = this.winningMembers[2];

        this.winningMembers[0] = this.Teams[i].bowler_name;
        this.winningMembers[1] = this.Teams[i+1].bowler_name;
        this.winningMembers[2] = this.Teams[i+2].bowler_name;
        this.tieTeams[0] = this.Teams[i].team_id; 
      }
      else if(score > secondScore){
        console.log("Second Team");
        thirdScore = secondScore;
        secondScore = score;
        this.thirdScore = this.secondScore;
        this.secondScore = score;
        this.thirdTeam = this.secondTeam;
        this.secondTeam = this.Teams[i].team_id;

        this.thirdMembers[0] = this.secondMembers[0];
        this.thirdMembers[1] = this.secondMembers[1];
        this.thirdMembers[2] = this.secondMembers[2];

        this.secondMembers[0] = this.Teams[i].bowler_name;
        this.secondMembers[1] = this.Teams[i+1].bowler_name;
        this.secondMembers[2] = this.Teams[i+2].bowler_name;

        this.ShowSecond = true;
        console.log(this.secondTeam);
      }
      else if(score > thirdScore){
        console.log("Third Team");
        thirdScore = score;
        this.thirdScore = score;

        this.thirdTeam = this.Teams[i].team_id;

        this.thirdMembers[0] = this.Teams[i].bowler_name;
        this.thirdMembers[1] = this.Teams[i+1].bowler_name;
        this.thirdMembers[2] =
        this.Teams[i+2].bowler_name;
        this.ShowThird = true;
        console.log(this.thirdTeam);
      }
    }
    console.log("Winning Team is Team "+this.winningTeam+": "+this.winningMembers[0]+" "+this.winningMembers[1]+" "+this.winningMembers[2]);
    console.log("Second Place is Team"+this.secondTeam+": "+this.secondMembers[0]+" "+this.secondMembers[1]+" "+this.secondMembers[2]);
    if(!this.tie){
      this.ShowWinner = true;
    }
  }
}
