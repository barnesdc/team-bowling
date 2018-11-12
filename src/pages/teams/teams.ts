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

  DeleteUser(bowler_id) {
    console.log(bowler_id);
  }
  addGame() {
    this.database.CreateGames(2, 200);
  }

  getGames() {
    this.database.getGames().then(
      (data: any) => {
        console.log(data + "I AM WORKING for Games");
        this.ListGame = data;
      },
      error => {
        console.log(error + "getGames() error");
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
          name: "Average",
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
              data.Gender,
              data.Handicap,
              data.Average,
              data.Score
            );
          }
        }
      ]
    });
    prompt.present();
  }

  deleteGame(item) {
    console.log(item.game_id);
    window.alert("Attempting to delete " + item.game_id);
  }

  deleteBowler(item) {
    console.log("first print " + item);
    window.alert("Attempting to delete " + item + " " + item.bowler_id);
    // this.database.DeleteBowler;
  }
}
