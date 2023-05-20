import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundBubblesComponent } from './background-bubbles/background-bubbles.component';
import { ParticleComponent } from './particle/particle.component';

@NgModule({
  declarations: [AppComponent, BackgroundBubblesComponent, ParticleComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
