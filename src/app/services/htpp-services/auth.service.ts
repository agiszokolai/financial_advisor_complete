import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { UserType } from 'src/app/commons/models/user';
import { API_URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  constructor(protected http: HttpClient) { }

  login(user: any): Observable<UserType> {
    return this.http.post<UserType>(`${API_URL}/login`,  user);
  }
}
