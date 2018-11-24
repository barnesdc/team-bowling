import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NavParams } from "ionic-angular";
import { AlertController } from "ionic-angular";

import "rxjs/add/operator/map";
import { DatabaseProvider } from "../../providers/database/database";
import { TeamsPage } from "../teams/teams";

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
  checked = [];

  ionViewDidLoad() {
    this.GetAllBowlers();
  }
  ionViewWillEnter() {
    this.GetAllBowlers();
  }

  //adds checked names to checked[] array and checks if unchecked, removing it from checked[] array
  addCheckbox(event, checkbox: String) {
    if (event.checked) {
      console.log(checkbox + " checked");
      this.checked.push(checkbox);
    } else {
      console.log(checkbox + " unchecked");
      let index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index, 1);
    }
  }

  //removes checked element from checked[] array
  removeCheckedFromArray(checkbox: String) {
    return this.checked.findIndex(category => {
      return category === checkbox;
    });
  }

  //Empties checked[] array
  emptyCheckedArray() {
    this.checked = [];
  }

  //Log elements of checked[] array
  getCheckedBoxes() {
    console.log(this.checked);
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
        {
          name: "Average",
          placeholder: "Average (Enter 0 if none)"
        },
        {
          name: "Handicap",
          placeholder: "Handicap amount"
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
          text: "Male",
          handler: data => {
            console.log(JSON.stringify(data));
            if(data.Average >= 0 && data.Average <= 300 && data.Handicap >= 0 && data.Handicap <= 30 && data.Average != "" && data.Handicap != "" && data.Name != ""){
            this.database.CreateBowler(
              data.Name,
              "Male",
              data.Average,
              data.Handicap,
              null
            );
          }
          else
          {
            prompt.setMessage("Invalid Entry");
            return false;
          }
        }
        },
        {
          text: "Female",
          handler: data => {
            console.log(JSON.stringify(data));
            if(data.Average >= 0 && data.Average <= 300 && data.Handicap >= 0 && data.Handicap <= 30 && data.Average != "" && data.Handicap != "" && data.Name != ""){
            this.database.CreateBowler(
              data.Name,
              "Female",
              data.Average,
              data.Handicap,
              null
            );
            }
            else{
              prompt.setMessage("Invalid Entry");
              return false;
            }
          }
        }
      ]
    });
    prompt.present(),
      prompt.onDidDismiss(() => {
        this.GetAllBowlers();
      });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Cannot make teams of three from selected bowlers!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  //console logs values in checked[] array, goes to teams page and shares checked[] array to teams page
  showNextPage() {
    this.getCheckedBoxes();
    if(this.checked.length%3 == 0 || this.checked.length < 3 || this.checked.length == null){
      this.navCtrl.push(TeamsPage, {
        checked: this.checked
      });
    }else{
      this.presentAlert();
    }
  }
}