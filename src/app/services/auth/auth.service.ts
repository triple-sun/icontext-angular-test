import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../../utils/const';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_URL + 'signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API_URL + 'signup',
      {
        email,
        firstName,
        lastName,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signout', { }, httpOptions);
  }
}
