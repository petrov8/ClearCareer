
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.dev"
import { urlPaths } from "../support/url.paths"



import { JobAll } from '../_typesCustom/job';
import { generateHttpHeaders } from '../support/common';



@Injectable({
    providedIn: "root"
})

export class RecruiterApiService {
    paths = urlPaths
      

    constructor(private http: HttpClient){}


    getAllMyJobs() {

        return this.http.get<JobAll>(`${environment.defaultURL}/${urlPaths.myJobs}`, {
            headers: generateHttpHeaders()
        })
        .pipe(tap(
            (res: JobAll) => res
        ))
    }
}