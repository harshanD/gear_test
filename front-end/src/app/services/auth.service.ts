import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = 'http://localhost:8000/oauth/token';
  apiUrl = 'http://localhost:8000/api';
  options: any;
  loggedOptions: any;

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient
  ) {
    this.options = {
      headers: new HttpHeaders({Accept: 'application/json'})
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
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
      client_secret: 'WV31yRuMeaLjUI44sMloysZQZc2zIzpept8xBPRL',
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
