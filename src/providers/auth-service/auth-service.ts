import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/observable";
import "rxjs/add/operator/map";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {
  // constructor(public http: HttpClient) {
  //   console.log("Hello AuthServiceProvider Provider");
  // }
  bowler: Bowler;
  public login(credentials) {
    if (this.bowler.email === null || this.bowler.password === null) {
      return Observable.throw("Please enter in your login credentials");
    } else {
      return Observable.create(observer => {
        let access =
          credentials.password === "pass" && credentials.email === "email";
        // this.currentUser = new Bowler("Dante", "dcbarnes@aggies.ncat.edu");
        observer.next(access);
        observer.complete();
      });
    }
  }
}
