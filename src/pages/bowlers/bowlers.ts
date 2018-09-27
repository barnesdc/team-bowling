import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

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
  // bowlers: Observable<any[]>;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, private afs: AngularFirestore) {
    // this.bowlers = afDB.list("bolwers").valueChanges();
  }
  ionViewWillEnter() {
    this.bowlersCollection = this.afs.collection("Bowlers");
    this.bowlers = this.bowlersCollection.valueChanges();
  }
}
