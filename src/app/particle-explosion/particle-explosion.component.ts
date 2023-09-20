import { Component, Input, OnInit } from '@angular/core';
import { ExplosiveParticle } from '../particle/particle.model';

@Component({
  selector: 'app-particle-explosion',
  templateUrl: './particle-explosion.component.html',
  styleUrls: ['./particle-explosion.component.scss'],
})
export class ParticleExplosionComponent implements OnInit {
  @Input() x!: number;
  @Input() y!: number;
  @Input() colour!: string;

  private readonly radiansInFullCircle = 2 * Math.PI;
  private readonly radius = 50;

  public numParticles: number = 32;
  public explosiveParticles: ExplosiveParticle[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < this.numParticles; i++) {
      this.explosiveParticles.push(
        new ExplosiveParticle(
          this.x,
          this.y,
          this.calculateXTarget(i),
          this.calculateYTarget(i),
          this.randomDuration
        )
      );
    }
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.y += 100;
    }, 100);
  }

  calculateXTarget(particleIndex: number) {
    return this.radius * Math.cos(this.getAngle(particleIndex));
  }

  calculateYTarget(particleIndex: number) {
    return this.radius * Math.sin(this.getAngle(particleIndex));
  }

  // Returns angle in radians
  getAngle(particleIndex: number) {
    return (this.radiansInFullCircle / this.numParticles) * particleIndex;
  }

  get randomDuration() {
    return Math.random() + 1;
  }
}
