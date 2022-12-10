import { ReactiveFormsModule } from '@angular/forms';
import { UserRooting } from './user.rooting';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

import { EdituserComponent } from './edituser/edituser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';



@NgModule({
  declarations: [
    ProfileComponent,
    EdituserComponent,
    DeleteuserComponent,


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    UserRooting,
   
  ],
  exports: [
    ProfileComponent,
    EdituserComponent,
    DeleteuserComponent,


  ]
})
export class UserModule { }
