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
