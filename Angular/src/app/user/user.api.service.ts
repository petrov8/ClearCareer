
import { UserProfileType } from './../_typesCustom/user';
import { tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { urlPaths } from "../support/url.paths"
import { environment } from "../../environments/environment.dev"
import { Injectable } from '@angular/core';
import { generateHttpHeaders } from '../support/common';



@Injectable({
    providedIn: "root"
})

export class UserApiService {

    constructor(private http: HttpClient){}
    
    //user_id in token - no need to pass to back-end. 
    getProfileUser() {
        
        return this.http.get<UserProfileType>(`${environment.defaultURL}/${urlPaths.profile}`, {headers: generateHttpHeaders()})
        .pipe(
            tap((res: UserProfileType) => res)
        )
    }



    editExistingUser(body: {}){
        return this.http.put(`${environment.defaultURL}/${urlPaths.editUser}`, 
            body,
            {
                headers: generateHttpHeaders()
            })
            .pipe(tap(
                (res) => res
            ))
    }
    

    deleteExistingUser() {

        return this.http.delete(`${environment.defaultURL}/${urlPaths.deleteUser}`, {headers: generateHttpHeaders()})
        .pipe(tap(
            (res) => res
        ))
    }

}

