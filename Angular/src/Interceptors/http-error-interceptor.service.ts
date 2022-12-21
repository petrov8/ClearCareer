import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AlertifyService } from 'src/services/alertify-service';
import { GlobalErrorService } from 'src/services/http-error.service';




@Injectable({
    providedIn: "root"
})

export class HttpErrorInterceptorService implements HttpInterceptor {

    constructor(private alertify: AlertifyService, private errorService: GlobalErrorService){}


    intercept(request: HttpRequest<any>, next: HttpHandler) {
        console.log("Http Request started")
        return next.handle(request)
        .pipe(
            catchError((err: HttpErrorResponse) => {
                const errorMessage = this.errorService.assignErrors(err)
                this.alertify.onError(errorMessage)
                return throwError(errorMessage)
            })
        )
    }

}