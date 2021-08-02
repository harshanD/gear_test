import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService {

  constructor(
    private http: HttpClient,
    private _authService: AuthService
  ) {
  }

  resolve(): Observable<any> {
    let Url = environment.auth.domain;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this._authService.getAccessToken()}`);
    return this.http.get(Url + '/books-list', {headers: headers}).pipe(
      map((data) => data),
      catchError((err) => Observable.throw(err.json().error))
    )
  }
}
