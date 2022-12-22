import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from "@angular/router";
import { urlPaths } from "../support/url.paths"
import { AuthguardGuard } from '../support/guards/authguard.guard';


const userRoutes: Routes = [
    {
        path: urlPaths.profile,
        component: ProfileComponent,
        canActivate: [AuthguardGuard]

    },
    {
        path: urlPaths.editUser,
        component: EdituserComponent, 
        canActivate: [AuthguardGuard]
    }
    ,
    {
        path: urlPaths.deleteUser,
        component: DeleteuserComponent,
        canActivate: [AuthguardGuard]
    }
    

]


export let UserRooting = RouterModule.forChild(userRoutes)
  