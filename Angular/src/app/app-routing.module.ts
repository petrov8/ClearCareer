
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';



const routes: Routes = [

  { 
    path: '404', 
    component: NotFoundComponent,
    pathMatch: "full",
  },
  { 
    path: '**', 
    component: NotFoundComponent,
    pathMatch: "full",
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
