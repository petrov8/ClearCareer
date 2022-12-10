import { MyjobsComponent } from './myjobs/myjobs.component';
import { RouterModule, Routes } from "@angular/router"
import { urlPaths } from "../support/url.paths"



const myJobsRoutes: Routes = [
    {
        path: urlPaths.myJobs,
        component: MyjobsComponent,
    },

]

export let myJobsRooting = RouterModule.forChild(myJobsRoutes)