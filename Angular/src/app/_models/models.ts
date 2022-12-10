import { UserModule } from './../user/user.module';
import { Injectable } from "@angular/core"


export class currentSession {
    
    token: string = ""
    _id: string = ""
    _role: string = ""
    key: string = ""

}

class BaseUserModel {

    full_name: string = ""
    email: string = ""
    password: string = ""
    profile_type: string = ""

}

@Injectable({
    providedIn: "root"
})

export class UserProfileModel extends BaseUserModel {
    
    entry_date: string = ""
    role: string = ""
    picture_url: string = ""
    id: string = ""

}

export class newUser extends BaseUserModel {

}









