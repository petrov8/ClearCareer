import { CoreRooting } from './core.rooting';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,

    CoreRooting,
  ],
  exports: [
    HomeComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    NotFoundComponent,
  ]
})
export class CoreModule { }
