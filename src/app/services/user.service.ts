import { AUTH_API_URL } from '../utils/const';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TEST_API_URL } from '../utils/const';
import { TUser } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = AUTH_API_URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<TUser[]> {
    return this.http.get<any>(this.baseUrl);
  }
  get(id: string): Observable<TUser> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }
  create(user: TUser) {
    return this.http.post<any>(this.baseUrl, user);
  }
  update(id: string, user: TUser): Observable<TUser> {
    return this.http.put<any>(this.baseUrl + '/' + id, user);
  }
  delete(id: string) {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(TEST_API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(TEST_API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(TEST_API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(TEST_API_URL + 'admin', { responseType: 'text' });
  }
}

