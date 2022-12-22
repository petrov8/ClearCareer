import { MyjobsComponent } from './myjobs/myjobs.component';
import { RouterModule, Routes } from "@angular/router"
import { urlPaths } from "../support/url.paths"
import { AuthguardGuard } from '../support/guards/authguard.guard';



const myJobsRoutes: Routes = [
    {
        path: urlPaths.myJobs,
        component: MyjobsComponent,
        canActivate: [AuthguardGuard]
    },

]

export let myJobsRooting = RouterModule.forChild(myJobsRoutes)