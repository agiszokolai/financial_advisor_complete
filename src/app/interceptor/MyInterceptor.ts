import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!)['token']: "";

        return next.handle(
            httpRequest.clone({
                setHeaders: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Authorization": token,
                    "Accept": "*"
                }
            })
        ).pipe(
            catchError( error => {
                console.log("ERRRR")
                if (error.status === 401) {
                    localStorage.removeItem("user");
                    this.router.navigate(['login']);
                }

                return throwError(error);

            })
        )
    }
}