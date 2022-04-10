import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from 'src/app/commons/models/user';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserType>{

  constructor(protected http: HttpClient) {
    super(http, "users");
  }

}
