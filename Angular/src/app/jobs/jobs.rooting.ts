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
    },
    {
        path: urlPaths.newJob,
        component: NewComponent, 
    },
    {
        path: `${urlPaths.showJob}/:id`,
        component: DetailsComponent,
    },
    {
        path: `${urlPaths.editJob}/:id`,
        component: EditComponent,
    },
    {
        path: `${urlPaths.deleteJob}/:id`,
        component: DeleteComponent,
    }



]

export let JobsRooting = RouterModule.forChild(jobRoutes)

