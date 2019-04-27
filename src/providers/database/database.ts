import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { dateValueRange } from "ionic-angular/umd/util/datetime-util";
import { database } from "firebase";
import { ConvertActionBindingResult } from "@angular/compiler/src/compiler_util/expression_converter";
import { BowlersPage } from "../../pages/bowlers/bowlers";
import { SQLitePorterOriginal } from '@ionic-native/sqlite-porter';
import { analyzeAndValidateNgModules } from "@angular/compiler";

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
    /*****************************************************/
    /*  Create all the tables for the app functionality  */
    /*****************************************************/
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
            "CREATE TABLE IF NOT EXISTS 'bowlers' (bowler_id INTEGER PRIMARY KEY AUTOINCREMENT, bowler_name TEXT, bowler_gender TEXT, bowler_average INTEGER, bowler_score INTEGER, bowler_handicapPins INTEGER, bowler_date INTEGER)",
            []
          )
            .then(res => console.log("Executed SQL for bowlers"))
            .catch(e => console.log("Error in creating bowlers table" + e));

          db.executeSql(
            "CREATE TABLE IF NOT EXISTS 'team' (team_id INTEGER, bowler_id1 INTEGER, bowler_id2 INTEGER, bowler_id3 INTEGER, FOREIGN KEY (bowler_id1) references bowler(bowler_id), FOREIGN KEY (bowler_id2) references bowler(bowler_id), FOREIGN KEY (bowler_id3) references bowler(bowler_id))",
            []
          )
            .then(res => console.log("Executed SQL for team"))
            .catch(e => {
              console.log("Error in creating team table");
              console.log(e);
            });
          db.executeSql(
            "CREATE TABLE IF NOT EXISTS 'game' (game_id INTEGER PRIMARY KEY AUTOINCREMENT, team_id INTEGER, FOREIGN KEY (team_id) references team(team_id))",
            []
          )
            .then(res => console.log("Executed SQL for game"))
            .catch(e => {
              console.log("Error in creating game table");
              console.log(e);
            });

          db.executeSql(
            "CREATE TABLE IF NOT EXISTS 'scores'(bowler_id INTEGER ,score_score INTEGER, score_date DATE, FOREIGN KEY (bowler_id) references bowler(bowler_id))",
            []
          )
            .then(res => console.log("Executed SQL for scores"))
            .catch(e => {
              console.log("Error in creating scores table");
              console.log(e);
            });
          db.executeSql(
            "CREATE TABLE IF NOT EXISTS 'history'(bowler_id INTEGER, team_id INTEGER, game_id INTEGER, history_date DATE, history_score INTEGER, FOREIGN KEY (bowler_id)references bowler(bowler_id))",
            []
          )
            .then(res => console.log("Executed SQL for history"))
            .catch(e => {
              console.log("Error in creating history table");
              console.log(e);
            });
          db.executeSql(
            "CREATE TABLE IF NOT EXISTS 'handicap'(handicap_id INTEGER PRIMARY KEY, handicap_start INTEGER, handicap_end INTEGER, handicap_numPins DATE)",
            []
          )
            .then(res => console.log("Executed SQL for handicap"))
            .catch(e => {
              console.log("Error in creating handicap table");
              console.log(e);
            });
        });
      this.isOpen = true;

      console.log("Hello DatabaseProvider Provider");
    }
  }

  /*****************************************************/
  /*             Create games for U/I                  */
  /*****************************************************/

  CreateGames(game_number: number, game_score: number) {
    return new Promise((resolve, reject) => {
      this.storage
        .create({ name: "bowlerData.db", location: "default" })
        .then(() => {
          let sql = "INSERT INTO game(game_number, game_score) VALUES (?, ?)";
          this.db.executeSql(sql, [game_number, game_score]).then(
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

  /*****************************************************/
  /*            Create bowlers from U/I                */
  /*****************************************************/
  CreateBowler(
    bowler_name: string,
    bowler_gender: string,
    bowler_average: number,
    bowler_handicapPins: number,
    bowler_date: number
  ) {
    return new Promise((resolve, reject) => {
      this.storage
        .create({ name: "bowlerData.db", location: "default" })
        .then(() => {
          let sql =
            "INSERT INTO bowlers (bowler_name, bowler_gender, bowler_average, bowler_handicapPins, bowler_date) VALUES (?, ?, ?, ?,?)";
          // "INSERT INTO bowlers (bowler_name, bowler_gender) VALUES (?, ?)";
          this.db
            .executeSql(sql, [
              bowler_name,
              bowler_gender,
              bowler_average,
              bowler_handicapPins,
              bowler_date
            ])
            .then(
              data => {
                console.log("Bowler insertion complete");
                resolve(data);
              },
              error => {
                console.log(error);
                reject(error);
              }
            );
        });
    });
  }

  /*****************************************************/
  /*            Insert bowlers score                   */
  /*****************************************************/
  insertScore(bowler_score: number, bowler_id: number) {
    let date = new Date();
    let sqlite_date = date.toISOString;
    return new Promise((resolve, reject) => {
      let sql =
        "INSERT into scores (bowler_id, score_score, score_date) VALUES (?,?,?)";
      this.db.executeSql(sql, [bowler_id, bowler_score, sqlite_date]).then(
        data => {
          console.log("Inserted new score: " + bowler_score + " into table");
          resolve(data);
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  }
  /*****************************************************/
  /*            Update bowlers avg U/I                 */
  /*****************************************************/

  /* This may be a better approach using a trigger

  CREATE TRIGGER update_average_value_after_insert
  AFTER INSERT ON table_1
  FOR EACH ROW
  BEGIN
      UPDATE table_2
      SET average_value = (SELECT AVG(value)
                          FROM table1
                          WHERE table1.field = NEW.field)
      WHERE field = NEW.field;
  END;
  */
  updateAverage(bowler_id: number) {
    return new Promise((resolve, reject) => {
      let sql =
        "UPDATE bowlers SET bowler_average = (SELECT round(avg (score_score),2) FROM scores WHERE bowler_id = ?) WHERE bowler_id = ?";
      console.log("updated bowler_id: " + bowler_id);
      this.db.executeSql(sql, [bowler_id, bowler_id]).then(
        data => {
          console.log("Updated bowler_id: " + bowler_id + " averages");
          resolve(data);
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  }
  /*****************************************************/
  /*       Randomize bowlers for team generation       */
  /*****************************************************/
  randomizeBowlers(names: string[]) {
    return new Promise((resolve, reject) => {
      this.db
        .executeSql(
          "SELECT bowler_id, bowler_name, bowler_handicapPins FROM bowlers ORDER BY random()",
          []
        )
        .then(
          data => {
            let arrayTeams = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                arrayTeams.push({
                  bowler_id: data.rows.item(i).bowler_id,
                  bowler_name: data.rows.item(i).bowler_name,
                  bowler_handicapPins: data.rows.item(i).bowler_handicapPins
                });
              }
            }

            resolve(arrayTeams);
          },
          error => {
            reject(error) + "Get team error";
          }
        );
    });
  }

  /*****************************************************/
  /*      Create teams from randomized bowlers set     */
  /*****************************************************/
  /* 
  Steps:
    - determine how many bowlers are present / bowling
      - number should be divisible by 3 
        - unless less than 8 bowlers then number should be divisible by 2
        - if not divisble by 3, remainder on a team of two
    - select these bowlers and 
  */
  CreateTeamsOf3(teamNum: number, team1: any, team2: any, team3: any) {
    /*
    
    */
    console.log("Stepped into Create Teams function");
    let bowler1 = team1.bowler_id;
    let bowler2 = team2.bowler_id;
    let bowler3 = team3.bowler_id;
    return new Promise((resolve, reject) => {
      this.storage
        .create({ name: "bowlerData.db", location: "default" })
        .then(() => {
          let sql =
            "INSERT INTO team (team_id, bowler_id1, bowler_id2, bowler_id3) VALUES(?, ?, ?, ?)";
          console.log("Team Test: " + teamNum);
          console.log("ID " + team1.bowler_id);
          this.db.executeSql(sql, [teamNum, bowler1, bowler2, bowler3]).then(
            data => {
              console.log("Team insertion complete");
              resolve(data);
            },
            error => {
              console.log(error);
              reject(error);
            }
          );
        });
    });
  }

  CreateTeamsOf2(teamNum: number, team1: any, team2: any) {
    /*
    
    */
    console.log("Stepped into Create Teams function");
    let bowler1 = team1.bowler_id;
    let bowler2 = team2.bowler_id;
    return new Promise((resolve, reject) => {
      this.storage
        .create({ name: "bowlerData.db", location: "default" })
        .then(() => {
          let sql =
            "INSERT INTO team (team_id, bowler_id1, bowler_id2, bowler_id3) VALUES(?, ?, ?, ?)";
          console.log("Team Test: " + teamNum);
          console.log("ID " + team1.bowler_id);
          this.db.executeSql(sql, [teamNum, bowler1, bowler2]).then(
            data => {
              console.log("Team insertion complete");
              resolve(data);
            },
            error => {
              console.log(error);
              reject(error);
            }
          );
        });
    });
  }

  /*****************************************************/
  /*          Get all games  from games table          */
  /*****************************************************/
  getGames() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM game", []).then(
        data => {
          let arrayGames = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              arrayGames.push({
                game_id: data.rows.item(i).game_id,
                game_number: data.rows.item(i).game_number,
                game_score: data.rows.item(i).game_score
              });
            }
          }
          resolve(arrayGames);
        },
        error => {
          reject(error + "Error with games");
        }
      );
    });
  }

  /*****************************************************/
  /*       Get all bowlers from bowlers table          */
  /*****************************************************/
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
                bowler_date: data.rows.item(i).bowler_date
              });
            }
          }
          resolve(arrayBowlers);
        },
        error => {
          reject(error + "ERROR!!!!");
        }
      );
    });
  }

  GetTeams() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM team", []).then(
        data => {
          let arrayTeams = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              arrayTeams.push({
                team_id: data.rows.item(i).team_id,
                bowler_id: data.rows.item(i).bowler_id,
                bowler_name: data.rows.item(i).bowler_name
              });
            }
          }
          resolve(arrayTeams);
        },
        error => {
          reject(error + "Team GET error!");
        }
      );
    });
  }

  /*****************************************************/
  /*                 Delete a Bowler                   */
  /*****************************************************/
  DeleteBowler(item: any) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM bowlers WHERE bowler_id = ? ";
      console.log("delete test: " + item);
      this.db.executeSql(sql, [item]).then(
        data => {
          console.log("Delete Bowler complete");
          resolve(data);
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  //clear teams table
  ClearTeams() {
    console.log("Clearing Teams");
    return new Promise((resolve, reject) => {
      this.db.executeSql("DELETE FROM team");
      error => {
        reject(error);
      };
    });
  }

  //update date for bowler to remember in checklist
  PresentBowler(id: any) {
    console.log("marking present bowler id " + id);
    return new Promise((resolve, reject) => {
      this.db.executeSql(
        "UPDATE bowlers SET bowler_date = 1 WHERE bowler_id = ?",
        [id]
      );
      error => {
        reject(error);
      };
    });
  }

  //mark non-present bowlers date as null, to prevent them being checked
  AbsentBowler(id: any) {
    console.log("marking bowler absent with id " + id);
    return new Promise((resolve, reject) => {
      this.db.executeSql(
        "UPDATE bowlers SET bowler_date = 0 WHERE bowler_id = ?",
        [id]
      );
      error => {
        reject(error);
      };
    });
  }
}

/*
Datagrip Table

CREATE TABLE 'bowler'(
  bowler_id  INTEGER primary key AUTOINCREMENT,
  bowler_name TEXT,
  bowler_gender TEXT,
  bowler_avg INTEGER,
  bowler_handicap INTEGER,
  bowler_date DATE );

CREATE TABLE 'team'(
  team_id INTEGER primary key,
  bowler_id INTEGER ,
  FOREIGN KEY (bowler_id) references  bowler(bowler_id));

CREATE TABLE 'game'(
  game_id INTEGER primary key,
  team_id INTEGER ,
  FOREIGN KEY (team_id) references team(team_id));

CREATE TABLE 'scores'(
  bowler_id INTEGER ,
  score_score
  score_date DATE ,
  FOREIGN KEY (bowler_id)references bowler(bowler_id));

CREATE TABLE 'history'(
  bowler_id INTEGER,
  team_id INTEGER,
  game_id INTEGER,
  history_date DATE,
  history_score INTEGER,
  FOREIGN KEY (bowler_id)references bowler(bowler_id));

CREATE TABLE 'handicap'(
  handicap_id INTEGER PRIMARY KEY ,
  handicap_start INTEGER,
  handicap_end INTEGER,
  handicap_numPins DATE);


  Update record with current date:
  UPDATE "bowler" SET "bowler_date" = '2018-11-04' WHERE "bowler_id" = 1

*/
