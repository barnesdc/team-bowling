import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { GamesScoresPage } from "../pages/games-scores/games-scores";
import { TeamsPage } from "../pages/teams/teams";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { InformationPage } from "../pages/information/information";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

// firebase imports for future use
// import { AngularFireModule } from "angularfire2";
// import { AngularFireAuth } from "angularfire2/auth";
// import { AngularFireAuthModule } from "angularfire2/auth"; // authentication
// import { AngularFirestoreModule } from "angularfire2/firestore"; // user info, data dictionary
// import {
//   AngularFireDatabaseModule,
//   AngularFireDatabase
// } from "angularfire2/database"; // database
// import { AngularFireStorageModule } from "angularfire2/storage";
//import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { SQLite } from "@ionic-native/sqlite";
import { DatabaseProvider } from "../providers/database/database";
import { HttpModule } from "@angular/http";
import { BowlersPage } from "../pages/bowlers/bowlers";
import { HttpClientModule } from "@angular/common/http";
import { GroupmeProvider } from "../providers/groupme/groupme";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
import { IonicStorageModule } from "@ionic/storage";


@NgModule({
  declarations: [
    MyApp,
    GamesScoresPage,
    TeamsPage,
    BowlersPage,
    TabsPage,
    LoginPage,
    InformationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // AngularFireAuthModule,
    // AngularFirestoreModule.enablePersistence(), //.enablePersistence() used for offline storage
    // AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
     driverOrder: ['indexeddb', 'sqlite', 'websql']
   })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesScoresPage,
    BowlersPage,
    TeamsPage,
    TabsPage,
    LoginPage,
    InformationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // AngularFireDatabase,
    // AngularFireAuth,
    SQLite,
    DatabaseProvider,
    GroupmeProvider,
    File,
    FileTransfer,
    DocumentViewer
  ]
})
export class AppModule {}
