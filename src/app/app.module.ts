import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundBubblesComponent } from './background-bubbles/background-bubbles.component';
import { ParticleComponent } from './particle/particle.component';
import { ParticleExplosionComponent } from './particle-explosion/particle-explosion.component';

@NgModule({
  declarations: [AppComponent, BackgroundBubblesComponent, ParticleComponent, ParticleExplosionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
