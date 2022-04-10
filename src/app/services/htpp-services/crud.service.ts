import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';

export class CrudService<T> {

  url: string = API_URL;
  //http helyett _http használata mivel ez lesz felülírva és override-olni kellene. 
  constructor(protected _http: HttpClient, protected path: string) {
    this.url += "/" + this.path;
   }

   getAll(): Observable<T[]> {
    return this._http.get(this.url) as Observable<T[]>;
  }

  getById(id: number): Observable<T> {
    return this._http.get(`${this.url}/${id}`) as Observable<T>;
  }

  put(id: number, request: T): Observable<T> {
    return this._http.put(`${this.url}/${id}`, request) as Observable<T>;
  }

  post(request: T): Observable<T> {
    return this._http.post(this.url, request) as Observable<T>;
  }

  delete(id: number) {
    return this._http.delete(`${this.url}/${id}`)
  }
}
