import { AuthRooting } from './auth.rooting';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,

    AuthRooting,
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,

  ]
})
export class AuthModule { }
