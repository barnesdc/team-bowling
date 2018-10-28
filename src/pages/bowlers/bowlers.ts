import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
<<<<<<< HEAD
import {AlertController} from "ionic-angular";
import { SQLite } from "@ionic-native/sqlite";
=======
<<<<<<< HEAD
=======
import {AlertController} from "ionic-angular";
import { SQLite } from "@ionic-native/sqlite";
>>>>>>> issues
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
<<<<<<< HEAD
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { DatabaseProvider } from "../../providers/database/database";
=======
<<<<<<< HEAD
=======
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { DatabaseProvider } from "../../providers/database/database";
>>>>>>> issues
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30

interface Bolwers {
  name: string;
  avg: number;
}

@Component({
  selector: "page-bowlers",
  templateUrl: "bowlers.html"
})
export class BowlersPage {
  bowlersCollection: AngularFirestoreCollection<Bolwers>; //firestore collection
  bowlers: Observable<Bolwers[]>; //read collection
<<<<<<< HEAD
  private database : DatabaseProvider;
=======
<<<<<<< HEAD
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
  // bowlers: Observable<any[]>;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public alertCtrl: AlertController, private afs: AngularFirestore, public navCtrl: NavController){
    
  }
<<<<<<< HEAD
  /*constructor(public navCtrl: NavController, private afs: AngularFirestore) {
    // this.bowlers = afDB.list("bolwers").valueChanges();
  }*/
=======
=======
  private database : DatabaseProvider;
  // bowlers: Observable<any[]>;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public alertCtrl: AlertController, private afs: AngularFirestore, public navCtrl: NavController){
    
  }
  /*constructor(public navCtrl: NavController, private afs: AngularFirestore) {
    // this.bowlers = afDB.list("bolwers").valueChanges();
  }*/
>>>>>>> issues
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
  ionViewWillEnter() {
    this.bowlersCollection = this.afs.collection("Bowlers");
    this.bowlers = this.bowlersCollection.valueChanges();
  }
<<<<<<< HEAD
=======
<<<<<<< HEAD
}
=======
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30

  AddBowlerPrompt()
  {
    const prompt = this.alertCtrl.create({
    title: 'Add Bowler',
    message: 'Fill out the following boxes to enter your bowler',
    inputs: [
      {
        name: 'Name',
        placeholder: 'Bowler name'
      },
      {
        name: 'Handicap',
        placeholder: 'Handicap (Ex. A, B or C)'
      },
      {
        name: 'Gender',
        placeholder: 'Gender (Ex. Male/Female)'
      },
      {
        name: 'AverageScore',
        placeholder: 'Average Score (Ex. 200)'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked')
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log(JSON.stringify(data));
          this.database.CreateBowler(data.Name, data.Gender, data.AverageScore, data.Handicap, data.Score);
        }
      }
    ]
    
  });
  prompt.present();
  
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> issues
>>>>>>> dfa1b776ed77da55f13ad3c2e2e4f6a85837af30
