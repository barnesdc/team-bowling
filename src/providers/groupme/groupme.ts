import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { stringify } from 'querystring';

/*
  Generated class for the GroupmeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupmeProvider {
  private botID: string = "77af3b076f4c2027bc79d1eecd";
  private apiUrl: string = "https://api.groupme.com/v3/bots/post";
  
  private d1 = new Date().getTime();
  private counter = 0;

  constructor(public http: HttpClient) { }

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

  parseTeamBody(body: any){
    var teamBodyString: string = " ";
    for(let i = 0; i < body.length; i++){
      teamBodyString += "Hello Everyone for todays game: \n" + body[i].bowler_name + " will be on team " + body[i].team_id + "\n Happy Bowling!!!";
    }

    return teamBodyString;
  }

  parseResultBody(teamBody: any, rankBody: any, scoreBody: any){
    var resultBodyString: string = " ";
    var count: number = 0;
    for(let i = 0; i < rankBody.length; i++){
      resultBodyString += "Now for the awaited results: \n Team: " + teamBody[rankBody[i]].team_id + " placed " + this.numOrdinal((count + 1)) + 
                          " with a score of " + scoreBody[count] + "\n" + "Individual bowler scores: \n" +
                          teamBody[rankBody[i]].bowler_name + ": " + teamBody[rankBody[i]].score + " \n" +
                          teamBody[rankBody[i]+1].bowler_name + ": " + teamBody[rankBody[i]+1].score + " \n" +
                          teamBody[rankBody[i]+2].bowler_name + ": " + teamBody[rankBody[i]+2].score + " \n\n ";
      count += 1;
    }
    return resultBodyString + "Congradulations to the winners!!!";
  }



  postTeamData(postBody: any){
    return this.http.post(`${this.apiUrl}`, {bot_id: this.botID, text: this.parseTeamBody(postBody)}).subscribe(value => {
      this.counter++;
            if (this.counter === 100) {
              const d2: number = new Date().getTime();
              console.log(`POST Teams request finished in ${d2 - this.d1} ms`);
            }
          });
  }

  postResultData(teamBody: any, rankBody: any, scoreBody: any){
    return this.http.post(`${this.apiUrl}`, {bot_id: this.botID, text: this.parseResultBody(teamBody, rankBody, scoreBody)}).subscribe(value => {
      this.counter++;
            if (this.counter === 100) {
              const d2: number = new Date().getTime();
              console.log(`POST Results request finished in ${d2 - this.d1} ms`);
            }
          });
  }

}


/* possible call 
return new Promise((resolve, reject) => 
        resolve(this.http.post(`${this.apiUrl}`, {
          bot_id: this.botID,
          text: postBody
        })),  
    );
  }
*/