import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { json } from 'stream/consumers';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthencationService {

  private apiUrl = environment.localApiUrl;
  token:any;
  header:any;

  // Headers for consuming APIs
  reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  })

  constructor(private router: Router, private http: HttpClient) { }
  isAuthencated(): boolean {
    // Check the user is authencated or not.
    if (sessionStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  canAccess() {
    if (!this.isAuthencated()) {
      // Redirect to the Login page.
      this.router.navigate(["/login"]);
    }
  }

  canAuthenticate() {
    if (this.isAuthencated()) {
      // Redirect to the dashboard page.
      this.router.navigate(["/dashboard"]);
    }
  }

  registerUser(email: string, pass: string, al: string): Observable<string> {
    // Send the data to register API (local Core API) 
    return this.http.post<string>(this.apiUrl + "/api/Auth/Register", JSON.stringify({ username: email, password: pass, roles: [al] }), { 'headers': this.reqHeaders });
  }

  loginUser(username: string, pass: string): Observable<{ token: string }> {
    // Send the data to login API (local Core API) 
    return (this.http.post<{ token: string }>(this.apiUrl + "/api/Auth/Login", JSON.stringify({ username: username, password: pass }), { 'headers': this.reqHeaders }))
  }

  storeToken(token: string) {
    // Store the token user is authencated.
    if (token)
      sessionStorage.setItem("token", token);
  }

  getUserDetails(): Observable<{ userName: string }> {
    this.token = sessionStorage.getItem("token");
    this.header = { "Authorization": "Bearer " + this.token}
    return this.http.get<{ userName: string }>(this.apiUrl + "/api/v1/Site/getuserdetails", { 'headers': this.header })
  }
}
