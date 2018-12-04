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

  //retrieve data sent from teams page
  ionViewDidLoad(){
    this.Teams = this.navParams.get("Teams");
    this.calculateWinner();
  }

  ionViewWillEnter(){

  }

  //if start game button is pressed, sends the user to the bowlers page to select present bowlers
  startGame() {
    this.navCtrl.push(BowlersPage);
  }

  //function gathers individual scores and determines first, second and third placed teams
  calculateWinner(){
    console.log("Calculating Winners");
    console.log(this.Teams);
    var maxScore = -1, score=0, secondScore=0, thirdScore=0;

    //adds individual scores for each team and calculates total scores
    for(var i=0; i<this.Teams.length; i+=3){
      score = parseInt(this.Teams[i].score) + parseInt(this.Teams[i+1].score) + parseInt(this.Teams[i+2].score);
      console.log("Score: "+score+" for Team "+this.Teams[i].team_id);

      //function to determine if a tie between first and second has occurred
      if(score == maxScore){
         this.tie = true;
         this.tieTeams[1] = this.Teams[i].team_id;
      }

      //function if a new first place team is found. Moves second place team to third and first place team to second and pushes new team score and members into first.
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

      //function if a new second place team is found
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

      //function if a new third place team is found
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

      //ShowWinner prevents html being shown unless calculateWinners function is called
      this.ShowWinner = true;
    }
  }
}
