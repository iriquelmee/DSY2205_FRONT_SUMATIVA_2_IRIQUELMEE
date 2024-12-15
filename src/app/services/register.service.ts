import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrlUsers = environment.apiUrlUsers + '/Users';  // Uses environment variable for users API endpoint
  private apiUrlProduct = environment.apiUrlProduct + '/Products';
  private apiAuthEnpoint = '/Auth/authenticate'
  private username = environment.basicAuth.username;
  private password = environment.basicAuth.password;

  constructor(private http: HttpClient) { }

  registerUser(registerData: any): Observable<any> {
    
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    
    
    const headers = new HttpHeaders({
      'Authorization': basicAuth,
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Authorization, Content-Type, Accept'
    });    
    
    return this.http.post(this.apiUrlUsers, registerData, { headers });
  }

  authenticateUser(registerData: any): Observable<any> {
    
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    
    console.log("",environment.apiUrlUsers+this.apiAuthEnpoint);
    const headers = new HttpHeaders({
      'Authorization': basicAuth,
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Authorization, Content-Type, Accept'
    }); 
    console.log("data", registerData);   
    
    return this.http.post(environment.apiUrlUsers+this.apiAuthEnpoint, registerData, { headers });
  }
}
