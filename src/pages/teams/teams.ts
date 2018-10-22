import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { AlertController } from "ionic-angular";

import "rxjs/add/operator/map";
import { DatabaseProvider } from "../../providers/database/database";
import { Title } from "@angular/platform-browser";

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-teams",
  templateUrl: "teams.html"
})
export class TeamsPage {
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider
  ) {}

  private ListBowler: any;
  private ListGame: any;

  ionViewDidLoad() {
    // this.GetAllBowlers();
  }

  ionViewWillEnter() {
    // this.GetAllBowlers();
  }

  GetAllBowlers() {
    this.database.GetAllBowlers().then(
      (data: any) => {
        console.log(data + "I AM WORKING for Bowlers");
        this.ListBowler = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  addGame() {
    this.database.CreateGames(2, 200);
    this.getGames();
  }

  getGames() {
    this.database.getGames().then(
      (data: any) => {
        console.log(JSON.stringify(data) + "I AM WORKING for Games");
        this.ListGame = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  AddBowlerPrompt() {
    const prompt = this.alertCtrl.create({
      title: "Add Bowler",
      message: "Fill out the following boxes to enter your bowler",
      inputs: [
        {
          name: "Name",
          placeholder: "Bowler name"
        },
        {
          name: "Handicap",
          placeholder: "Handicap (Ex. A, B or C)"
        },
        {
          name: "Gender",
          placeholder: "Gender (Ex. Male/Female)"
        },
        {
          name: "AverageScore",
          placeholder: "Average Score (Ex. 200)"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            console.log(JSON.stringify(data));
            this.database.CreateBowler(
              data.Name,
              data.Handicap,
              data.gender,
              data.AverageScore,
              data.Score
            );
          }
        }
      ]
    });
    prompt.present();
    this.GetAllBowlers();
  }

  deleteGame(game_id) {
    console.log(game_id);
  }

  deleteBowler(bowler_id) {
    console.log(bowler_id);
  }
}
