import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {JwtHelperService} from "./jwt-helper.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = 'http://localhost:8000/oauth/token';
  apiUrl = environment.auth.domain;
  options: any;
  loggedOptions: any;
  roleList: string
  rolesData: any = [];

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient,
    jwtHelper: JwtHelperService,
  ) {
    this.options = {
      headers: new HttpHeaders({Accept: 'application/json'})
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
    this.roleList = jwtHelper.roleList();
    this.rolesData = jwtHelper.rolesData();
  }

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  login(e: string, p: string) {
    return this.http.post(this.authUrl, {
      grant_type: 'password',
      client_id: '2',
      client_secret: environment.auth.clientId,
      username: e,
      password: p,
      scope: '',
    }, this.options);
  }

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  signup(x: string, e: string, p: string) {
    this.loggedOptions = {
      headers: new HttpHeaders({Accept: 'application/json'})
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    }

    return this.http.post(this.apiUrl + '/signup', {
      name: x,
      email: e,
      password: p,
      roles: 'Author',
    }, this.loggedOptions);
  }

  getAccessToken() {
    return localStorage.getItem('access_token') || null;
  }

  currentUserRole() {
    return this.roleList[0];
  }

  privilegeCheck(permission) {
    const role = this.roleList[0];
    const key = this.rolesData['roles'].findIndex(x => x.name == role)
    if (key > -1) {
      const perKey = this.rolesData['roles'][key]['permissions'].findIndex(z => z.name == permission)
      if (perKey > -1) {
        return true
      }
    }
    return false;
  }

  /**
   * Revoke the authenticated user token
   */
  logout() {
    this.loggedOptions = {
      headers: new HttpHeaders({Accept: 'application/json'})
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    }
    return this.http.get(this.apiUrl + '/token/revoke', this.loggedOptions);
  }
}
