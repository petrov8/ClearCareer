import { Injectable } from "@angular/core";
import * as alertify from "alertifyjs"


@Injectable({
    providedIn: "root"
})

export class AlertifyService {

    constructor(){}

    onSuccess(msg: string ) {
        alertify.success(msg)
    }

    onWarning(msg: string ) {
        alertify.warning(msg)
    }

    onError(msg: string) {
        alertify.error(msg)
    }
}