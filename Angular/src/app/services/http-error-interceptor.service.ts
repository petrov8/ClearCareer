import { AlertifyService } from './alertify-service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';



@Injectable({
    providedIn: "root"
})
export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private alertify: AlertifyService){}


    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log("Http Request started")
        return next.handle(request)
        .pipe(
            catchError((err: HttpErrorResponse) => {
                const errorMessage = this.assignErrors(err)
                this.alertify.onError(errorMessage)
                return throwError(errorMessage)
            })
        )
    }


    assignErrors(err: HttpErrorResponse): string {
        let errorMessage = "Ooops ... something broke :("
        // check if client side error 
        console.log(err)

        if (err.error instanceof ErrorEvent) {
            errorMessage = err.error.message
        }
        // all other types will be server side errors
        else {
            
            // check if server is live 
            if (err.status == 0 && err.statusText === "Unknown Error") {
                errorMessage = "Connection problem"
            } 
            else if (err.status !== 0){
                errorMessage = err.error.message
            }
        }
        return errorMessage
    }
}