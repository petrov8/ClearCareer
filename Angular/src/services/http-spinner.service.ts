import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class LoadingSpinnerService {

    loading: boolean = false;


    setLoading(loading: boolean) {
        this.loading = loading;
    }

    getLoading(): boolean {
        return this.loading;
    }
    
}