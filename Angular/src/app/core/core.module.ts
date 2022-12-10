import { CoreRooting } from './core.rooting';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
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
  ]
})
export class CoreModule { }
