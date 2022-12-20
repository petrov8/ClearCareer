import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from 'src/services/http-spinner.service';



@Injectable()

export class LoadingSpinnerInteceptor implements HttpInterceptor {

    totalRequests: number  = 0

    constructor(private loadingService: LoadingSpinnerService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(request)
        this.totalRequests++
        this.loadingService.setLoading(true)

        return next.handle(request).pipe(
            finalize(() => {
                    this.totalRequests--
                    if (this.totalRequests == 0) {
                        this.loadingService.setLoading(false)
                    }
                }
            )
        )
    }
}
