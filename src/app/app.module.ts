import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { GamesScoresPage } from "../pages/games-scores/games-scores";
import { BowlersPage } from "../pages/bowlers/bowlers";
import { BowlerProfilePage } from "../pages/bowler-profile/bowler-profile";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { InformationPage } from "../pages/information/information";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

// firebase imports
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth"; // authentication
import { AngularFirestoreModule } from "angularfire2/firestore"; // user info, data dictionary
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database"; // database
import { AngularFireStorageModule } from "angularfire2/storage"; // storage for images and other files

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBkjK4MXok4pe7HemheEPsQJ2x_miQia6Q",
  authDomain: "bowling-app-b45c0.firebaseapp.com",
  databaseURL: "https://bowling-app-b45c0.firebaseio.com",
  projectId: "bowling-app-b45c0",
  storageBucket: "bowling-app-b45c0.appspot.com",
  messagingSenderId: "49362757433"
};
@NgModule({
  declarations: [
    MyApp,
    GamesScoresPage,
    BowlersPage,
    BowlerProfilePage,
    EditProfilePage,
    TabsPage,
    LoginPage,
    SignupPage,
    InformationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
    // AngularFireModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesScoresPage,
    BowlersPage,
    BowlerProfilePage,
    EditProfilePage,
    TabsPage,
    LoginPage,
    SignupPage,
    InformationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
