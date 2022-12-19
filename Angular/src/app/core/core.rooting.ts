import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';



const coreRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: HomeComponent,

    },
    {
        path: "dashboard",
        component: MainComponent
    },


]


export let CoreRooting = RouterModule.forChild(coreRoutes)