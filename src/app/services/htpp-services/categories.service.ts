import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesType } from '../../commons/models/categories';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService extends CrudService<CategoriesType> {


  constructor(protected http: HttpClient) {
    super(http, "categories");
  }
}