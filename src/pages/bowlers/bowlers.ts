import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AlertController } from "ionic-angular";

import "rxjs/add/operator/map";
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: "page-bowlers",
  templateUrl: "bowlers.html"
})
export class BowlersPage {
  bowlers: any[];
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private database: DatabaseProvider
  ) {
    this.bowlers = [
      { label: "A", name: "A", gender: "male", average: 257 },
      { label: "B", name: "B", gender: "male", average: 100 },
      { label: "C", name: "C", gender: "male", average: 175 },
      { label: "D", name: "D", gender: "female", average: 200 }
    ];
  }
  doRefresh(refresher) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
      this.GetAllBowlers();
    }, 2000);
  }

  private ListBowler: any;

  ionViewDidLoad() {
    this.GetAllBowlers();
  }
  ionViewWillEnter() {
    this.GetAllBowlers();
  }

  GetAllBowlers() {
    this.database.GetAllBowlers().then(
      (data: any) => {
        console.log(data + "\nI AM WORKING for Bowlers");
        this.ListBowler = data;
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
        // {
        //   name: 'Handicap',
        //   placeholder: 'Handicap (Ex. A, B or C)'
        // },
        {
          name: "Gender",
          placeholder: "Gender (Ex. Male/Female)"
        }
        // {
        //   name: 'AverageScore',
        //   placeholder: 'Average Score (Ex. 200)'
        // },
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
              null,
              null,
              null
            );
          }
        }
      ]
    });
    prompt.present();
    prompt.onDidDismiss(() => {
      this.GetAllBowlers();
    })
  }
}
