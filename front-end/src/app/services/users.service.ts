import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {
  }

  userStatusChange(data: object): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this._authService.getAccessToken()}`);
    const params = new HttpParams().append('id', data['id']).append('status', data['status']);

    return this._httpClient.get<any>(`${environment.auth.domain}/users-activation`, {headers: headers, params: params})
      .pipe(
        map((response) => {

          return response;
        }),
        shareReplay()
      );

  }
}
