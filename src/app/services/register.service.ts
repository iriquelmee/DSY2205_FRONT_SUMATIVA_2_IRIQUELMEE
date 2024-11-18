import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environment.apiUrl;
  private username = environment.basicAuth.username;
  private password = environment.basicAuth.password;

  constructor(private http: HttpClient) { }

  registerUser(registerData: any): Observable<any> {
    
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    
    
    const headers = new HttpHeaders({
      'Authorization': basicAuth,
      'Content-Type': 'application/json'
    });

    
    return this.http.post(this.apiUrl, registerData, { headers });
  }
}
