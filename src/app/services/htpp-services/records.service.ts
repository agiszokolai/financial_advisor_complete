import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecordsType } from '../../commons/models/records';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService extends CrudService<RecordsType> {


  constructor(protected http: HttpClient) {
    super(http, "records");
  }

  getRecordsByPeriod(period: string): Observable<RecordsType[]> {
    return this.http.get<RecordsType[]>(`${this.url}@period=${period}`);
  }
}
