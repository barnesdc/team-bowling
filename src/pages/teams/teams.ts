import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Checkbox } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { FormsModule } from "@angular/forms";

import "rxjs/add/operator/map";
import { DatabaseProvider } from "../../providers/database/database";
import { GamesScoresPage } from "../games-scores/games-scores";
import { BowlersPage } from "../bowlers/bowlers";
import { PICKER_OPT_SELECTED } from "ionic-angular/umd/components/picker/picker-options";
import { GroupmeProvider } from "../../providers/groupme/groupme";

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-teams",
  templateUrl: "teams.html"
})
export class TeamsPage {
  teams: any[];

  // prettier-ignore
  // rows = [
  //   {
  //     "Team": "1",
  //     "Handicap": 10,
  //     "Name": "John",
  //     "Score": 300
  //   }
  // ];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    private chat: GroupmeProvider
  ) {}

  private ListBowler: any;
  private ListTeam: any;
  checked = [];
  winner: any;
  bowlerScore: number;

  //Will save checked bowlers into checked[] array
  ionViewDidLoad() {
    this.checked = this.navParams.get("checked");
    console.log(this.checked);
  }

  ionViewWillEnter() {}

  generateTeams() {
    // grabs all bowlers
    let teams = [];
    // same as checked array, includes names and ids
    // compares teams to checked (playing bowlers)
    let showTeams = [];
    // counting of bowlers,
    let count = 0,
      teamNum = 1;

    //let handicapIndex = 0;
    let handicapCount = 0;

    //clear teams table
    this.database.ClearTeams();

    //returns array with indexes "bowler_name" and "bowler_id"
    this.database.randomizeBowlers(this.checked).then(
      (data: any) => {
        console.log("\nRandomizing bowlers");
        console.log(data);
        teams = data;

        //loops through checked[] array and matches it with bowlers returned from randomizeBowlers()
        for (var i = 0; i < teams.length; i++) {
          if (this.checked.indexOf(teams[i]["bowler_id"]) > -1) {
            showTeams[count] = teams[i];
            showTeams[count]["team_id"] = null;
            showTeams[count]["score"] = this.bowlerScore;
            count++;
            console.log(showTeams[count - 1]["bowler_name"]);
            /*if (count % 3 == 0) {
              console.log("Creating Team " + teamNum);
              this.database.CreateTeams(teamNum, showTeams[count-3], showTeams[count-2], showTeams[count-1]);
              teamNum++;
            }*/
          }
        }
        //check if bowlers can be fit into teams of three
        if (showTeams.length % 3 > -0.1 && showTeams.length % 3 < 0.1) {
          //alert and break
        }

        //checks for high handicap bowlers and replaces or removes them as necessary
        for (var i = 0; i < showTeams.length; i++) {
          if (showTeams[i]["bowler_handicapPins"] >= 30) {
            handicapCount++;

            //if 2 high handicap bowlers are on the same team, replace one with non-high handicap bowler, if available.
            if (handicapCount == 2) {
              console.log("Balancing Teams");
              for (var j = i + 2; j < showTeams.length; j++) {
                if (showTeams[j]["bowler_handicapPins"] < 30) {
                  var temp: any;
                  temp = showTeams[i];
                  showTeams[i] = showTeams[j];
                  showTeams[j] = temp;
                  handicapCount--;
                  console.log("Teams balanced");
                  break;
                }
              }
              console.log("For loop Broken");
            }
          }
          if ((i + 1) % 3 == 0) {
            //Pulls high handicap bowler into team if none are on the team
            if (handicapCount == 0) {
              for (var j = i + 1; j < showTeams.length; j++) {
                if (showTeams[j]["bowler_handicapPins"] >= 30) {
                  var temp: any;
                  temp = showTeams[i];
                  showTeams[i] = showTeams[j];
                  showTeams[j] = temp;
                  console.log("Added Handicap Bowler");
                  break;
                }
              }
              console.log("For loop broken");
            }

            //pushes generated teams into the database and tracks team number with teamNum
            console.log("Creating Team " + teamNum);
            console.log("Team Members " + showTeams[i - 2][""]);
            this.database.CreateTeams(
              teamNum,
              showTeams[i - 2],
              showTeams[i - 1],
              showTeams[i]
            );
            showTeams[i - 2]["team_id"] = showTeams[i - 1][
              "team_id"
            ] = showTeams[i]["team_id"] = teamNum;
            teamNum++;
            handicapCount = 0;
          }
        }

        //call function here passing showteams[] array to put bowlers into teams table, which should include handicap checking
        /*this.database.GetAllBowlers().then((data: any) => {
          console.log(data + "\nI AM WORKING for Teams");
          this.ListTeam = data;
        });*/
        this.ListTeam = showTeams;
        console.log("the number of bowlers are: " + showTeams.length);

        this.chat.postTeamData(this.ListTeam);
      },
      error => {
        console.log("Error randomizing teams");
        console.log(error);
      }
    );
  }

  //alerts user when an invalid number has been entered as a score
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle: "Invalid score input!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  //calculates and checks valid scores for the teams and changes page to the scores/start game page
  displayWinner() {
    console.log("Display Winner");
    console.log(this.ListTeam);
    var show = true;

    //loop through all teams and gather total scores
    for (var i = 0; i < this.ListTeam.length; i++) {
      console.log("it " + i + " " + this.ListTeam[i]["score"]);
      if (
        this.ListTeam[i]["score"] < 0 ||
        this.ListTeam[i]["score"] > 300 ||
        (this.ListTeam[i]["score"] == "" && this.ListTeam[i]["score"] != "0") ||
        this.ListTeam[i]["score"] % 1 != 0
      ) {
        this.presentAlert();
        show = false;
        break;
      }
    }

    //if no errors have occured when calculating scores, the teams and scores will be pushed to the scores page and presented to the user
    if (show) {
      for (var i = 0; i < this.ListTeam.length; i++) {
        console.log(
          "Inserting score: " +
            this.ListTeam[i]["score"] +
            " for bowler_id: " +
            this.ListTeam[i]["bowler_id"]
        );
        this.database.insertScore(
          this.ListTeam[i]["score"],
          this.ListTeam[i]["bowler_id"]
        );
        console.log(
          "Updating average: " +
            "for bowler_id: " +
            this.ListTeam[i]["bowler_id"]
        );
        this.database.updateAverage(this.ListTeam[i]["bowler_id"]);
      }
      this.navCtrl.push(GamesScoresPage, {
        Teams: this.ListTeam
      });
    }
    show = true;
  }

  // submit scores confirmation
  showGoBackConfirm() {
    const confirm = this.alertCtrl.create({
      title: "GoBack",
      message:
        "Are you sure you want to go back, your teams selected bowlers will be reset?",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Return to teams pages");
          }
        },
        {
          text: "Go Back",
          handler: () => {
            console.log("Go Back to bowlers page");
            this.goBack();
          }
        }
      ]
    });
    confirm.present();
  }

  // submit scores confirmation
  showRandomizeConfirm() {
    const confirm = this.alertCtrl.create({
      title: "Randomize teams",
      message: "Are you sure you want to randomize Teams?",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Return to teams pages");
          }
        },
        {
          text: "Randomize Teams",
          handler: () => {
            console.log("Generate teams");
            this.generateTeams();
          }
        }
      ]
    });
    confirm.present();
  }

  // submit scores confirmation
  showSubmitConfirm() {
    const confirm = this.alertCtrl.create({
      title: "Submit Scores",
      message: "Are you sure you want to submit scores?",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Return to teams pages");
          }
        },
        {
          text: "Submit",
          handler: () => {
            console.log("Submit scores");
            this.displayWinner();
          }
        }
      ]
    });
    confirm.present();
  }

  //function to add game to games table
  addGame() {
    this.database.CreateGames(2, 200);
  }

  //function to remove game from games table
  deleteGame(item) {
    console.log(item.game_id);
    window.alert("Attempting to delete " + item.game_id);
  }

  //status alert to show user while teams are being generated
  showTeams() {
    window.alert("Working on queries at the moment");
  }
  goBack() {
    this.navCtrl.setRoot(BowlersPage, { checked: this.checked });
  }
}
