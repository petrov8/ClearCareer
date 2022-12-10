
import { RouterModule, Routes } from "@angular/router"

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { urlPaths } from "../support/url.paths"
import { LogoutComponent } from "./logout/logout.component";


const authRoutes: Routes = [
    {
        path: urlPaths.login,
        component: LoginComponent,
    },
    {
        path: urlPaths.register,
        component: RegisterComponent
    },
    {
        path: urlPaths.logout,
        component: LogoutComponent
    }
]

export let AuthRooting = RouterModule.forChild(authRoutes)

