import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the GroupmeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupmeProvider {
  private botID: any;
  private apiUrl: string = "https://api.groupme.com/v3/bots/post";
  
  private d1 = new Date().getTime();
  private counter = 0;

  constructor(public http: HttpClient, private storage: Storage) { }

  numOrdinal(num : any){
    var j = num % 10,
        k = num % 100;
    if (j == 1 && k != 11) {
        return num + "st";
    }
    if (j == 2 && k != 12) {
        return num + "nd";
    }
    if (j == 3 && k != 13) {
        return num + "rd";
    }
    return num + "th";
  }

  createBot(idBody: any){
    this.storage.ready().then(() => {
      this.storage.set('botID', idBody);
    },
    error => {
      console.log(error);
    });
    
  }

  getBot(){
    this.storage.ready().then(() => {
      this.storage.get('botID').then((id) => {
        this.botID = id;
      },
      error => {
        console.log(error);
      });
    },
    error => {
      console.log(error);
    });
  }

  parseTeamBody(body: any){
    var teamBodyString: string = " ";
    for(let i = 0; i < body.length; i++){
      teamBodyString += body[i].bowler_name + " will be on team " + body[i].team_id + "\n";
    }

    return "Hello Everyone for todays game: \n\n" + teamBodyString + "\nHappy Bowling!!!";
  }

  parseResultBody3(teamBody: any, rankBody: any, scoreBody: any){
    var resultBodyString: string = " ";
    var count: number = 0;
    for(let i = 0; i < rankBody.length; i++){
      resultBodyString += "Team: " + teamBody[rankBody[i]].team_id + " placed " + this.numOrdinal((count + 1)) + 
                          " with a score of " + scoreBody[count] + "\n\n" + "Individual bowler scores: \n" +
                          teamBody[rankBody[i]].bowler_name + ": " + teamBody[rankBody[i]].score + " \n" +
                          teamBody[rankBody[i]+1].bowler_name + ": " + teamBody[rankBody[i]+1].score + " \n" +
                          teamBody[rankBody[i]+2].bowler_name + ": " + teamBody[rankBody[i]+2].score + " \n\n ";
      count += 1;
    }
    return "Now for the awaited results: \n\n" + resultBodyString + "Congratulations to the winners!!!";
  }

  parseResultBody2(teamBody: any, rankBody: any, scoreBody: any){
    var resultBodyString: string = " ";
    var count: number = 0;
    for(let i = 0; i < rankBody.length; i++){
      resultBodyString += "Team: " + teamBody[rankBody[i]].team_id + " placed " + this.numOrdinal((count + 1)) + 
                          " with a score of " + scoreBody[count] + "\n\n" + "Individual bowler scores: \n" +
                          teamBody[rankBody[i]].bowler_name + ": " + teamBody[rankBody[i]].score + " \n" +
                          teamBody[rankBody[i]+1].bowler_name + ": " + teamBody[rankBody[i]+1].score + " \n\n";
      count += 1;
    }
    return "Now for the awaited results: \n\n" + resultBodyString + "Congratulations to the winners!!!";
  }

  postTeamData(postBody: any){
    this.getBot();
    this.http.post(`${this.apiUrl}`, {bot_id: this.botID, text: this.parseTeamBody(postBody)}).subscribe(value => {
      this.counter++;
            if (this.counter === 100) {
              const d2: number = new Date().getTime();
              console.log(`POST Teams request finished in ${d2 - this.d1} ms`);
            }
          });
  }

  postResultData3(teamBody: any, rankBody: any, scoreBody: any){
    this.getBot();
    this.http.post(`${this.apiUrl}`, {bot_id: this.botID, text: this.parseResultBody3(teamBody, rankBody, scoreBody)}).subscribe(value => {
      this.counter++;
            if (this.counter === 100) {
              const d2: number = new Date().getTime();
              console.log(`POST Results request finished in ${d2 - this.d1} ms`);
            }
          });
  }

  postResultData2(teamBody: any, rankBody: any, scoreBody: any){
    this.getBot();
    this.http.post(`${this.apiUrl}`, {bot_id: this.botID, text: this.parseResultBody2(teamBody, rankBody, scoreBody)}).subscribe(value => {
      this.counter++;
            if (this.counter === 100) {
              const d2: number = new Date().getTime();
              console.log(`POST Results request finished in ${d2 - this.d1} ms`);
            }
          });
  }

}