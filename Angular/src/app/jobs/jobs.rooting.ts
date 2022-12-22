import { AuthguardGuard } from './../support/guards/authguard.guard';
import { DetailsComponent } from './details/details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';


import { RouterModule, Routes } from "@angular/router"

import { urlPaths } from "../support/url.paths"



const jobRoutes: Routes = [
    {
        path: urlPaths.dashboard,
        component: DashboardComponent,
        canActivate: [AuthguardGuard]
    },
    {
        path: urlPaths.newJob,
        component: NewComponent, 
        canActivate: [AuthguardGuard]
    },
    {
        path: `${urlPaths.showJob}/:id`,
        component: DetailsComponent,
        canActivate: [AuthguardGuard]
    },
    {
        path: `${urlPaths.editJob}/:id`,
        component: EditComponent,
        canActivate: [AuthguardGuard]
    },
    {
        path: `${urlPaths.deleteJob}/:id`,
        component: DeleteComponent,
        canActivate: [AuthguardGuard]
    }



]

export let JobsRooting = RouterModule.forChild(jobRoutes)

