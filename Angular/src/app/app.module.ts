import { RecruiterModule } from './recruiter/recruiter.module';

import { JobsModule } from './jobs/jobs.module';

import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { appInterceptorProvider } from './app.interceptor';



@NgModule({
  declarations: [
    AppComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,

    AuthModule,
    CoreModule,
    JobsModule,
    UserModule,
    RecruiterModule,

    HttpClientModule, 

  ],

  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
