import { AuthguardGuard } from './../support/guards/authguard.guard';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';



const coreRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: HomeComponent,

    },
    {
        path: "dashboard",
        component: MainComponent,
        canActivate: [AuthguardGuard]
    },


]


export let CoreRooting = RouterModule.forChild(coreRoutes)