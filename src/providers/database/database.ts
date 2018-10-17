import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { dateValueRange } from "ionic-angular/umd/util/datetime-util";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: Http, public storage: SQLite) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage
        .create({
          name: "bowlerData.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.db = db;
          db.executeSql(
            "CREATE TABLE IF NOT EXISTS bowlers (bowler_id INTEGER PRIMARY KEY AUTOINCREMENT, bowler_name  TEXT, bowler_gender TEXT, bowler_avg INTEGER, bowler_score INTEGER, bowler_handicap TEXT,team_id INTEGER FOREIGN KEY (team_id) references teams(team_id))",
            []
          );
          //  db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, identification INTEGER, name TEXT, lastname text)", []);
          this.isOpen = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
    console.log("Hello DatabaseProvider Provider");
  }

  CreateBowler(
    bowler_name: string,
    bowler_gender: string,
    bowler_average: number,
    bowler_handicap: string,
    bowler_score: number
  ) {
    return new Promise((resolve, reject) => {
      this.storage
        .create({ name: "bowlerData.db", location: "default" })
        .then(() => {
          let sql =
            "INSERT INTO bowlers (bowler_name, bowler_gender, bowler_avg, bowler_handicap, bowler_score) VALUES (?, ?, ?, ?, ?)";
          this.db
            .executeSql(sql, [
              bowler_name,
              bowler_gender,
              bowler_average,
              bowler_handicap,
              bowler_score
            ])
            .then(
              data => {
                resolve(data);
              },
              error => {
                reject(error);
              }
            );
        });
    });
  }
  GetAllBowlers() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM bowlers", []).then(
        data => {
          let arrayBowlers = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              arrayBowlers.push({
                bowler_id: data.rows.item(i).bowler_id,
                bowler_name: data.rows.item(i).bowler_name,
                bowler_gender: data.rows.item(i).bowler_gender,
                bowler_handicap: data.rows.item(i).bowler_handicap,
                bowler_average: data.rows.item(i).bowler_average,
                bowler_score: data.rows.item(i).bowler_score
              });
            }
          }
          resolve(arrayBowlers);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  DeleteUser(bowler_id) {}
}
