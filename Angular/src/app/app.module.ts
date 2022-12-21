
import { SharedModule } from './shared/shared.module';
import { AlertifyService } from '../services/alertify-service'
import { RecruiterModule } from './recruiter/recruiter.module';
import { JobsModule } from './jobs/jobs.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { appInterceptorProvider } from './app.interceptor';
import { HttpErrorInterceptorService } from 'src/Interceptors/http-error-interceptor.service';
import { LoadingSpinnerInteceptor } from 'src/Interceptors/http-spinner.interceptor';




@NgModule({
  declarations: [
    AppComponent,

  ],

  imports: [
    BrowserModule,

    AuthModule,
    CoreModule,
    JobsModule,
    UserModule,
    RecruiterModule,
    SharedModule, 

    HttpClientModule, 
    AppRoutingModule, 

  ],

  providers: [
    appInterceptorProvider, 
    AlertifyService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInteceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
