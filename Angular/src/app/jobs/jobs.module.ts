import { ReactiveFormsModule } from '@angular/forms';
import { JobsRooting } from './jobs.rooting';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    NewComponent,
    EditComponent,
    DeleteComponent,
    DashboardComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,


    ReactiveFormsModule,
    
    JobsRooting,
  ], 
  exports: [
    NewComponent,
    EditComponent,
    DeleteComponent,
    DashboardComponent,
    DetailsComponent,
  ]
})
export class JobsModule { }
