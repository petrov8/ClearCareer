
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.dev"
import { urlPaths } from "../support/url.paths"



import { JobSpecific, JobAll } from '../_typesCustom/job';
import { generateHttpHeaders } from '../support/common';


@Injectable({
    providedIn: "root"
})

export class JobsApiService {
    paths = urlPaths    

    constructor(private http: HttpClient){}


    getAllJobs() {

        return this.http.get<JobAll>(`${environment.defaultURL}/${urlPaths.dashboard}`)
        .pipe(tap(
            (res: JobAll) => res
        ))
    }


    getSpecificJob(jobId: number) {
        
        return this.http.get<JobSpecific>(`${environment.defaultURL}/${urlPaths.showJob}/${jobId}`, {headers: generateHttpHeaders()})
        .pipe(tap(
            (res: JobSpecific) => res
        ))

    }


    postNewJob(postJobBody: {})
        {
        return this.http.post(`${environment.defaultURL}/${urlPaths.newJob}`,
            postJobBody,
            {
                headers: generateHttpHeaders()
            })
            .pipe(tap(
                (res) => res
            ))
    }


    editExistingJob(putJobBody: {}, jobId: number){
        return this.http.put(`${environment.defaultURL}/${urlPaths.editJob}/${jobId}`, 
            putJobBody,
            {
                headers: generateHttpHeaders()
            })
            .pipe(tap(
                (res) => res
            ))
    }

    deleteExistingJob(jobId: number) {

        return this.http.delete<any>(`${environment.defaultURL}/${urlPaths.deleteJob}/${jobId}`, {headers: generateHttpHeaders()})
        
    }

}



