import { Component } from "@angular/core";
import { NavController, Refresher, Platform } from "ionic-angular";
import { NavParams } from "ionic-angular";
import { AlertController } from "ionic-angular";

import "rxjs/add/operator/map";
import { DatabaseProvider } from "../../providers/database/database";
import { TeamsPage } from "../teams/teams";
import { GamesScoresPage } from "../games-scores/games-scores";
import { GroupmeProvider } from "../../providers/groupme/groupme";
import { checkAndUpdateDirectiveDynamic } from "@angular/core/src/view/provider";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
import { element } from "@angular/core/src/render3/instructions";
import { isAbsolute } from "path";
import { writeFile } from "fs";


@Component({
  selector: "page-bowlers",
  templateUrl: "bowlers.html"
})
export class BowlersPage {
  bowlers: any[];
  descending: boolean = false;
  order: number;
  column: string = "bowler_name";
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private database: DatabaseProvider,
    private chat: GroupmeProvider,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform,
    private document: DocumentViewer,
    public navParams: NavParams
  ) {
    // test bowler object
    // this.bowlers = [
    //   { label: "A", name: "A", gender: "male", average: 257 },
    //   { label: "B", name: "B", gender: "male", average: 100 },
    //   { label: "C", name: "C", gender: "male", average: 175 },
    //   { label: "D", name: "D", gender: "female", average: 200 }
    // ];
  }

  //refreshes page
  doRefresh(refresher) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
      this.GetAllBowlers();
    }, 2000);
  }

  private ListBowler: any;
  private botID: any;

  //stores array of all bowler id's that are checked in the list
  checked = [];

  counter = 0;

  ionViewDidLoad() {
    this.GetAllBowlers();
    this.botID = this.navParams.get("bot")
  }
  ionViewWillEnter() {}

  //adds checked names to checked[] array and if unchecked, removes it from checked[] array
  addCheckbox(event, checkbox: String) {
    if (event.checked) {
      console.log(checkbox + " checked");
      this.checked.push(checkbox);

      //change date value in bowler table for checked bowler
      this.database.PresentBowler(checkbox);
      this.counter = this.counter + 1;
    } else {
      console.log(checkbox + " unchecked");
      let index = this.removeCheckedFromArray(checkbox);

      //change date value in bowler table for unchecked bowler
      this.database.AbsentBowler(checkbox);
      this.checked.splice(index, 1);
      this.counter = this.counter - 1;
    }
  }

  private isAll: boolean = false;
  
  selectAllHelper(event){
    let checkboxes: any;
    checkboxes = document.getElementsByName("presentBowlers");
    if (event.checked){
      console.log("checking all");
      for (let i = 0; i < this.ListBowler.length; i++){
        if (checkboxes[i].checked != event.checked){
          checkboxes[i].checked = event.checked;
          this.checked.push(this.ListBowler[i].bowler_id);
          this.database.PresentBowler(this.ListBowler[i].bowler_id);
          this.counter = this.counter + 1;
        }
      }
      this.isAll = true;
    } else {
      console.log("unchecking all");
      for (let i = 0; i < this.ListBowler.length; i++){
        if (checkboxes[i].checked != event.checked){
          checkboxes[i].checked = event.checked;
          let index = this.removeCheckedFromArray(this.ListBowler[i].bowler_id);
          this.database.AbsentBowler(this.ListBowler[i].bowler_id);
          this.checked.splice(index, 1);
          this.counter = this.counter - 1;
        }
      }
      this.isAll = false;
    }
    this.GetAllBowlers();
  }

  addAllCheckboxes(event){
        const confirm = this.alertCtrl.create({
        title: "SelectAll?",
        message : "Are you sure you want to select/unselect all bowlers?",
        buttons: [
        {
        text: "No",
        handler: () => {
          console.log("Select all cancelled.");
        }
      },
      {
        text: "Yes",
        handler:() =>{
          console.log("Select all valid.");
          this.selectAllHelper(event);
        }
      }
      ]
      });
      confirm.present();
   }

  verifyAll(){
    return this.isAll;
  }

  verifyList(date: any) {
    console.log("date: " + date);
    if (date == 1) {
      return true;
    } else {
      return false;
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
    this.counter = 0;
  }

  //Log elements of checked[] array
  getCheckedBoxes() {
    for (var i = 0; i < this.ListBowler.length; i++) {
      if (
        this.ListBowler[i]["bowler_date"] == 1 &&
        this.checked.length != this.ListBowler.length
      ) {
        this.checked.push(this.ListBowler[i]["bowler_id"]);
      }
    }
    console.log(this.checked);
    this.counter = this.checked.length;
  }

  //stores all bowlers in the database in the ListBowler array
  GetAllBowlers() {
    this.checked = [];
    this.database.GetAllBowlers().then(
      (data: any) => {
        console.log(data + "\nI AM WORKING for Bowlers");
        this.ListBowler = data.sort(function(a, b) {
          var textA = a.bowler_name.toUpperCase();
          var textB = b.bowler_name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
        this.getCheckedBoxes();
       // this.counter = this.checked.length
      },
      error => {
        console.log(error);
      }
    );
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  //Generates an alert prompt to create a new bowler. User enters bowler information and then this information is stored in the bowler table.
  AddBowlerPrompt() {
    const prompt = this.alertCtrl.create({
      title: "Add Bowler",
      message:
        "Fill out the following boxes to add your bowler. Average and Handicap default to 0",
      inputs: [
        {
          name: "Name",
          placeholder: "Bowler name"
        },
        {
          name: "Average",
          placeholder: "Average (Enter 0-300)"
        },
        {
          name: "Handicap",
          placeholder: "Handicap (Enter 0-30)"
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
          text: "Male",
          handler: data => {
            console.log(JSON.stringify(data));
            console.log((data.Average % 1) + " modded");
            // empty name error
            if (data.Name == "") {
              prompt.setMessage("Invalid Entry. Enter in a name.");
              return false;
            }
            // average & handicap out of range
            else if (
              (data.Average < 0 || data.Average > 300) &&
              (data.Handicap < 0 || data.Handicap > 30)
            ) {
              prompt.setMessage(
                "Invalid Entry. Verify numbers within valid range \nAverage: 0-300 & \nHandicap: 0-30."
              );
              return false;
            }
            // average out of range
            else if (data.Average < 0 || data.Average > 300) {
              prompt.setMessage("Invalid Entry. Out of range\nAverage: 0-300.");
              return false;
            }
            // handicap out of range
            else if (data.Handicap < 0 || data.Handicap > 30) {
              prompt.setMessage(
                "Invalid Entry. Out of range\nHandicap: 0-300."
              );
              return false;
            }
            // average and handicap null
            else if (data.Average == "" && data.Handicap == "") {
              this.database.CreateBowler(data.Name, "M", 0, 0, null);
            }
            // average null and handicap valid
            else if (
              data.Average >= 0 &&
              data.Average <= 300 &&
              data.Handicap == "" &&
              data.Handicap == "" &&
              data.Handicap % 1 == 0
            ) {
              this.database.CreateBowler(data.Name, "M", data.Average, 0, null);
            }
            // average valid and handicap null
            else if (
              data.Average == "" &&
              data.Average == "" &&
              data.Handicap >= 0 &&
              data.Handicap <= 30 &&
              data.Handicap % 1 == 0
            ) {
              this.database.CreateBowler(
                data.Name,
                "M",
                0,
                data.Handicap,
                null
              );
            }
            // all entries valid
            else if (
              data.Average >= 0 &&
              data.Average <= 300 &&
              data.Handicap >= 0 &&
              data.Handicap <= 30 &&
              data.Name != "" &&
              data.Handicap % 1 == 0
            ) {
              this.database.CreateBowler(
                data.Name,
                "M",
                data.Average,
                data.Handicap,
                null
              );
            } else {
              prompt.setMessage("Error: try again");
              return false;
            }
          }
        },
        {
          text: "Female",
          handler: data => {
            console.log(JSON.stringify(data));
            // empty name error
            if (data.Name == "") {
              prompt.setMessage("Invalid Entry. Enter in a name.");
              return false;
            }
            // average & handicap out of range
            else if (
              (data.Average < 0 || data.Average > 300) &&
              (data.Handicap < 0 || data.Handicap > 30)
            ) {
              prompt.setMessage(
                "Invalid Entry. Verify numbers within valid range \nAverage: 0-300 & \nHandicap: 0-30."
              );
              return false;
            }
            // average out of range
            else if (data.Average < 0 || data.Average > 300) {
              prompt.setMessage("Invalid Entry. Out of range\nAverage: 0-300.");
              return false;
            }
            // handicap out of range
            else if (data.Handicap < 0 || data.Handicap > 30) {
              prompt.setMessage(
                "Invalid Entry. Out of range\nHandicap: 0-300."
              );
              return false;
            }
            // average and handicap null
            else if (data.Average == "" && data.Handicap == "") {
              this.database.CreateBowler(data.Name, "F", 0, 0, null);
            }
            // average null and handicap valid
            else if (
              data.Average >= 0 &&
              data.Average <= 300 &&
              data.Handicap == "" &&
              data.Handicap == "" &&
              data.Handicap % 1 == 0
            ) {
              this.database.CreateBowler(data.Name, "F", data.Average, 0, null);
            }
            // average valid and handicap null
            else if (
              data.Average == "" &&
              data.Average == "" &&
              data.Handicap >= 0 &&
              data.Handicap <= 30 &&
              data.Handicap % 1 == 0
            ) {
              this.database.CreateBowler(
                data.Name,
                "F",
                0,
                data.Handicap,
                null
              );
            }
            // all entries valid
            else if (
              data.Average >= 0 &&
              data.Average <= 300 &&
              data.Handicap >= 0 &&
              data.Handicap <= 30 &&
              data.Name != "" &&
              data.Handicap % 1 == 0
            ) {
              this.database.CreateBowler(
                data.Name,
                "F",
                data.Average,
                data.Handicap,
                null
              );
            } else {
              prompt.setMessage("Invalid Entry");
              return false;
            }
          }
        }
      ]
    });
    prompt.present(),
      //refreshes list of bowlers
      prompt.onDidDismiss(() => {
        this.GetAllBowlers();
      });
  }

  //Alert user if none selected
  presentAlert0() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle:
        "You currently have selected " +
        this.checked.length +
        " bowlers! Add 2 or 3 bowlers to start game!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }
  //Alert user if selected number of bowlers do not evenly fill out teams of 3
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle:
        "You currently have selected " +
        this.checked.length +
        " bowlers! Add 1 or 2 bowlers or remove 1 bowler to start game!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle:
        "You currently have selected " +
        this.checked.length +
        " bowlers! Add 1 or 2 bowlers to start game!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle:
        "You currently have selected " +
        this.checked.length +
        " bowlers! Add 1 bowler or remove 1 or 2 bowlers to start game!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  //console logs values in checked[] array, goes to teams page and shares checked[] array to teams page
  showNextPage() {
    if (this.checked.length == 0) {
      this.presentAlert0();
    } else if (
      (this.checked.length % 3 >= -0.1 &&
        this.checked.length % 3 <= 0.1 &&
        this.checked.length != 0) ||
      (this.checked.length >= 3 &&
        this.checked.length % 3 >= -0.1 &&
        this.checked.length % 3 <= 0.1) ||
      (this.checked.length % 2 >= -0.1 &&
        this.checked.length % 2 <= 0.1 &&
        this.checked.length != 0) ||
      (this.checked.length >= 2 &&
        this.checked.length % 2 >= -0.1 &&
        this.checked.length % 2 <= 0.1)
    ) {
      this.navCtrl.setRoot(TeamsPage, {
        checked: this.checked
      });
    } else if (
      this.checked.length % 3 >= 0.9 &&
      this.checked.length % 3 <= 1.1 &&
      this.checked.length % 2 >= 0.9 &&
      this.checked.length % 2 <= 1.1 && 
      this.checked.length > 1
    ) {
      //Alerts user if teams cannot be made with 3 people
      this.presentAlert1();
    } else if (this.checked.length == 1) {
      this.presentAlert3();
    }else {
      this.presentAlert2();
    }
  }

  deleteBowler() {
    console.log(
      "Deleting " + this.checked.length + " bowlers from the database."
    );
    let numBowlersToDelete = this.checked.length;
    for (var i = 0; i < numBowlersToDelete; i++) {
      console.log("Bowler deleted: " + this.checked[i]);
      this.database.DeleteBowler(this.checked[i]); //key value pair
      this.removeCheckedFromArray(this.checked[i]);
    }
    this.GetAllBowlers();
  }
  goToHomePage() {
    this.navCtrl.setRoot(GamesScoresPage);
  }

  showDeleteConfirm() {
    const confirm = this.alertCtrl.create({
      title: "GoBack",
      message: "Are you sure you want to delete selected bowler(s)?",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Return to teams pages");
          }
        },
        {
          text: "Delete",
          handler: () => {
            console.log("Delete bowler(s)");
            this.deleteBowler();
          }
        }
      ]
    });
    confirm.present();
  }

  private jsonBody = JSON.stringify(this.ListBowler);
  private fileName = 'BowlerList.json';

  manipulateBowlerList(){

    const confirm = this.alertCtrl.create({
      title: "Sending or Recieving Data",
      message:
        "Do you want import or export the list of bowlers?",
      buttons: [
        {
          text: "Export",
          handler: () => {
            console.log("exports bowler list");
            this.exportBL();
          }
        },
        {
          text: "Import",
          handler: () => {
            console.log("imports bowler list");
            //method for import
          }
        }
      ]
    });
    confirm.present(); 
    
  }

  exportBL(){
    this.file.createFile(this.file.dataDirectory, this.fileName, true);
    /*
    this.file.checkFile(this.file.dataDirectory, this.fileName)
      .then(doesExist => {
          console.log("doesExist : " + doesExist);
          return this.writeToFile(this.jsonBody);
      }).catch(err => {
          return this.file.createFile(this.file.dataDirectory, this.fileName, true)
              .then(FileEntry => this.writeToFile(this.jsonBody))
              .catch(err => console.log("Couldn't create file"));
      });
      */
  }

  writeToFile(text: string){
    this.file.writeFile(this.file.dataDirectory, this.fileName, text, {replace:true});
  }
}
 /*
 
 this.file.checkFile(this.file.dataDirectory, this.fileName)
      .then(doesExist => {
          console.log("doesExist : " + doesExist);
          return this.writeToFile(this.jsonBody);
      }).catch(err => {
          return this.file.createFile(this.file.dataDirectory, this.fileName, true)
              .then(FileEntry => this.writeToFile(this.jsonBody))
              .catch(err => console.log("Couldn't create file"));
      });
  }

  writeToFile(text: string){
    this.file.writeFile(this.file.dataDirectory, this.fileName, text, {replace:true});
  }


  let path = null;

    if (this.platform.is('ios')){
      path = this.file.documentsDirectory
    } else {
      path = this.file.dataDirectory
    }

    let url = encodeURI(path);

    let jsonBody = JSON.stringify(this.ListBowler);


    const transfer = this.transfer.create();
    transfer.download("https://github.com/JaekwonS/team-bowling/blob/version2-production/README.md", 
                      path + fileName).then(entry => {
      let url = entry.toUrL();
      this.document.viewDocument(url, "appliation/json", {});
    });
 */