
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { environment } from "../../environments/environment.dev"
import { currentSession } from "../_models/models";
import { urlPaths } from "../support/url.paths"


@Injectable({
    providedIn: "root"
})


export class AuthService {
    user: {} = {}
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
    isLoggenIn$ = this._isLoggedIn$.asObservable()


    constructor(
        private http: HttpClient) {
            const token = localStorage.getItem("token")
            this._isLoggedIn$.next(!!token)
        }


    setLocalStorage(userInfo: currentSession) {
        Object.entries(userInfo).forEach(
            ([key, value]) => 
            localStorage.setItem(`${key}`, `${value}`))
            this.changeisLoggedInStatus(true)
    }


    clearLocalStorage() {
        localStorage.clear()
        this.changeisLoggedInStatus(false)
    }


    register(body: {}) {
        return this.http.post<currentSession>(`${environment.defaultURL}/${urlPaths.register}`, body)
        .pipe(tap(
            (res) => this.setLocalStorage(res)
        ))
    }

    login(email: string, password: string) {
        return this.http.post<currentSession>(`${environment.defaultURL}/${urlPaths.login}`, {
            email,
            password,
        })
        .pipe(
            tap(
            (res) => this.setLocalStorage(res)
            ))
        }


    changeisLoggedInStatus(value: boolean){
        this._isLoggedIn$.next(value)
    }
    
}

