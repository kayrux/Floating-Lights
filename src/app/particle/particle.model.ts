export type ParticleColour = 'blue' | 'red' | 'purple' | 'orange';

export class Particle {
  rise?: boolean = true;
  oscillate?: boolean = false;
  xOffset?: number = 0;
  yOffset?: number = 0;
  width?: string = '10px';
  height?: string = '10px';
  colour?: ParticleColour = 'blue';
  animationDuration?: number = 5;
  animationDelay?: number = 0;
}

export class ExplosiveParticle {
  x: number;
  y: number;
  colour: ParticleColour = 'red';
  xTarget: number;
  yTarget: number;
  animationDuration: number;

  public constructor(
    x: number,
    y: number,
    xTarget: number,
    yTarget: number,
    animationDuration: number
  ) {
    this.x = x;
    this.y = y;
    this.xTarget = xTarget;
    this.yTarget = yTarget;
    this.animationDuration = animationDuration;
  }
}
