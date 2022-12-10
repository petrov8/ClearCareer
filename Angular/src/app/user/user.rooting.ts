import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from "@angular/router";
import { urlPaths } from "../support/url.paths"


const userRoutes: Routes = [
    {
        path: urlPaths.profile,
        component: ProfileComponent

    },
    {
        path: urlPaths.editUser,
        component: EdituserComponent, 
    }
    ,
    {
        path: urlPaths.deleteUser,
        component: DeleteuserComponent
    }
    

]


export let UserRooting = RouterModule.forChild(userRoutes)
  