import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { BowlersPage } from "../bowlers/bowlers";
import { GroupmeProvider } from "../../providers/groupme/groupme";
import { calcPossibleSecurityContexts } from "@angular/compiler/src/template_parser/binding_parser";

@Component({
  selector: "page-games-scores",
  templateUrl: "games-scores.html"
})
export class GamesScoresPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams, private chat: GroupmeProvider, public alertCtrl: AlertController) {}

  Teams: any;
  public rank = [];
  public totalScores = [];
  ShowWinner = false;
  ShowWinner2 = false;
  Results = false;
  public count: any;
  public useHDC = false;
  private botID: any;

  //retrieve data sent from teams page
  ionViewDidLoad() {
    this.Teams = this.navParams.get("Teams");
    this.Results = this.navParams.get("Results");
    }

  ionViewWillEnter() {}

  //if start game button is pressed, sends the user to the bowlers page to select present bowlers
  startGame() {
    this.navCtrl.setRoot(BowlersPage, { bot: this.botID });
  }

  generateBot(){
    const prompt = this.alertCtrl.create({
      title: "Creating a Groupme chatbot",
      message: '<div>' + 
      '<p>' + "Before you can start the setup, please visit this page and login using your Groupme username and password:" + '<\p>' +
      '<p>' + '<a target="_blank" href="https://dev.groupme.com/session/new">' + "GroupMe Developers" + '<\a>' + '<\p>' +
      '<p>' + "Click on the black drop down in top right corner, select Bots and then Create Bot, from there follow the propmt to create the chat bot. On completion you will be given a bot ID, please copy and past that ID in the field below to begin recieving messages in the bowling chat" + '<\p>',
      inputs:[
        {
          name: "botID",
          placeholder: "Bot ID"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Bot creation cancelled")
          }
        },
        {
          text: "OK",
          handler: data => {
            if (data.botID != "") {
              this.botID = data.botID;
              this.chat.createBot(this.botID);
            }else {
              prompt.setMessage("Error: try again");
              return false;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  handicapScores(){
    const confirm = this.alertCtrl.create({
      title: "Handicap Pins",
      message:
        "Do you want to add the handicap pins to the scores?",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Calculate socres without handicap");
            this.useHDC = false;
            this.calculateWinner();
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Calculate scores with handicap");
            this.useHDC = true;
            this.calculateWinner();
          }
        }
      ]
    });
    confirm.present();
    this.rank = [];
    this.totalScores = [];
  }

  //function gathers individual scores and determines first, second and third placed teams
  calculateWinner() {
    if(this.Teams.length % 2 >= 0.9 && this.Teams.length % 2 <= 1.1){
    console.log("Calculating Winners " + this.Teams.length);
    this.ShowWinner = true;
    this.ShowWinner2 = false;
    var score = 0;

      for (var i = 0; i < this.Teams.length; i += 3) {
        console.log("Pass score");
          if(this.useHDC == true){
            score =
              parseInt(this.Teams[i].score) +
              parseInt(this.Teams[i].bowler_handicapPins) +
              parseInt(this.Teams[i + 1].score) +
              parseInt(this.Teams[i + 1].bowler_handicapPins) +
              parseInt(this.Teams[i + 2].score) +
              parseInt(this.Teams[i + 2].bowler_handicapPins);
          } else if (this.useHDC == false){
            score =
              parseInt(this.Teams[i].score) +
              parseInt(this.Teams[i + 1].score) +
              parseInt(this.Teams[i + 2].score);
          }
          
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
      this.chat.postResultData3(this.Teams, this.rank, this.totalScores);
    } else if ((this.Teams.length % 3 >= 0.9 && this.Teams.length % 3 <= 1.1) || (this.Teams.length % 3 <= 2.1 && this.Teams.length % 3 >= 1.9)) {
          console.log("Calculating Winners " + this.Teams.length);
          this.ShowWinner2 = true;
          this.ShowWinner = false;
          var score = 0;
        for (var i = 0; i < this.Teams.length; i += 2) {
          console.log("Pass score");
          if(this.useHDC == true){
            score =
              parseInt(this.Teams[i].score) +
              parseInt(this.Teams[i].bowler_handicapPins) +
              parseInt(this.Teams[i + 1].score) +
              parseInt(this.Teams[i + 1].bowler_handicapPins);
          } else if (this.useHDC == false){
            score =
              parseInt(this.Teams[i].score) +
              parseInt(this.Teams[i + 1].score);
          }
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
        this.chat.postResultData2(this.Teams, this.rank, this.totalScores);
      }
  }
}
