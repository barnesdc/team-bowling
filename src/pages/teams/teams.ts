import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Checkbox } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { FormsModule } from "@angular/forms";

import "rxjs/add/operator/map";
import { DatabaseProvider } from "../../providers/database/database";
import { LoginPage } from "../login/login";
import { GamesScoresPage } from "../games-scores/games-scores";

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
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider
  ) {}

  private ListBowler: any;
  private ListTeam: any;
  checked = [];
  winner: any;

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
    // compares teams to checked (pplaying bowlers)
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
            showTeams[count]["score"] = 0;
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

        for (var i = 0; i < showTeams.length; i++) {
          if (showTeams[i]["bowler_handicapPins"] >= 30) {
            handicapCount++;
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
      },
      error => {
        console.log("Error randomizing teams");
        console.log(error);
      }
    );
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle: "Invalid score input!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  displayWinner() {
    console.log("Display Winner");
    console.log(this.ListTeam);
    var show = true;
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
    if (show) {
      this.navCtrl.setRoot(GamesScoresPage, {
        Teams: this.ListTeam
      });
    }
    show = true;
  }
  // this.database.CreateTeams(teams).then(
  //   (data: any) => {
  //     console.log("\nGenerating teams");
  //     console.log(data);
  //     this.ListTeam = data;
  //     showTeams = data;
  //     console.log("Teams List\n" + showTeams.length);
  //   },
  //   error => {
  //     console.log("Error generating teams");
  //     console.log(error);
  //   }
  // );
  addGame() {
    this.database.CreateGames(2, 200);
  }

  // getGames() {
  //   this.database.getGames().then(
  //     (data: any) => {
  //       console.log(data + "I AM WORKING for Games");
  //       this.ListGame = data;
  //     },
  //     error => {
  //       console.log(error + "getGames() error");
  //     }
  //   );
  // }
  // AddBowlerPrompt() {
  //   const prompt = this.alertCtrl.create({
  //     title: "Add Bowler",
  //     message: "Fill out the following boxes to enter your bowler",
  //     inputs: [
  //       {
  //         name: "Name",
  //         placeholder: "Bowler name"
  //       },
  //       {
  //         name: "Gender",
  //         placeholder: "Gender (Ex. Male/Female)"
  //       },
  //       {
  //         name: "Handicap",
  //         placeholder: "Handicap (Ex. A, B or C)"
  //       },
  //       {
  //         name: "Average",
  //         placeholder: "Average Score (Ex. 200)"
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         handler: data => {
  //           console.log("Cancel clicked");
  //         }
  //       },
  //       {
  //         text: "Save",
  //         handler: data => {
  //           console.log(JSON.striny(data));
  //           this.database.CreateBowler(
  //             data.Name,
  //             data.Gender,
  //             data.Handicap,
  //             data.Average,
  //             data.Score
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  deleteGame(item) {
    console.log(item.game_id);
    window.alert("Attempting to delete " + item.game_id);
  }

  // deleteBowler(item) {
  //   console.log("first print " + item) + "\n";
  //   console.log(
  //     "Attempting to delete " + JSON.stringify(item) + " " + item.bowler_id
  //   );
  //   this.database.DeleteBowler(item);
  // }
  showTeams() {
    window.alert("Working on queries at the moment");
  }
}
