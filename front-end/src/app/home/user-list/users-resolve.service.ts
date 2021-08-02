import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersResolveService implements Resolve <any> {

  constructor(
    private http: HttpClient,
    private _authService: AuthService
  ) {
  }


  resolve(): Observable<any> {
    let Url = environment.auth.domain;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this._authService.getAccessToken()}`);
    return this.http.get(Url + '/users-list', {headers: headers}).pipe(
      map((data) => data),
      catchError((err) => Observable.throw(err.json().error))
    )
  }
}
