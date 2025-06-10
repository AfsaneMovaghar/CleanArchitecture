import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.api_url + '/Authentication/';
 
  constructor(private http: HttpClient) {
    
   }

  // متد ثبت کاربر
  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl+"Register", userData, { headers });
  }

  
  getUser(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl+"GetUserById", {id}, { headers });

  }
}