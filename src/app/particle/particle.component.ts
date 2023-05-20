import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Particle } from './particle.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss'],
})
export class ParticleComponent implements OnInit, OnDestroy {
  @ViewChild('particleContainer', { static: false })
  particleContainerRef!: ElementRef;

  @Input() particle: Particle = {};
  @Input() random = false;
  @Input() xTarget = 0;
  @Input() yTarget = 0;
  @Input() rightArrowKeyDown$!: Subject<boolean>;
  @Input() leftArrowKeyDown$!: Subject<boolean>;

  private rightArrowKeyDown = false;
  private leftArrowKeyDown = false;
  public outOfBounds = false;

  public screenHeight = window.innerHeight;
  public screenWidth = window.innerWidth;
  private extraHorizontalBoundSpace = 300; // Increases the bounded space so that particles can be generated out of bounds for more realistic wind effect.

  constructor(private changeRef: ChangeDetectorRef) {}
  ngOnDestroy(): void {
    console.log('Destroyed');
  }

  ngOnInit(): void {
    this.xTarget = 0;
    console.log('Inner screen width: ', this.screenWidth);
    console.log('Inner screen height: ', this.screenHeight);
    if (this.random) {
      this.setToRandomParameters();
      this.changeRef.detectChanges();
    }

    this.rightArrowKeyDown$.subscribe((rArrowKeyDown) => {
      if (this.restarting) return;
      if (rArrowKeyDown) {
        this.setXTarget(-(this.screenWidth + this.extraHorizontalBoundSpace));
        this.rightArrowKeyDown = true;
      } else {
        this.setXTarget(0);
        this.particle.xOffset! = this.currentXPosition;
        this.rightArrowKeyDown = false;
      }
    });

    this.leftArrowKeyDown$.subscribe((lArrowKeyDown) => {
      if (this.restarting) return;
      if (lArrowKeyDown) {
        this.setXTarget(this.screenWidth + this.extraHorizontalBoundSpace);
        this.leftArrowKeyDown = true;
      } else {
        this.setXTarget(0);
        this.particle.xOffset! = this.currentXPosition;
        this.leftArrowKeyDown = false;
      }
    });
  }

  get currentXPosition() {
    if (this.particleContainerRef) {
      return this.particleContainerRef.nativeElement.getBoundingClientRect()
        .left;
    } else {
      return this.particle.xOffset;
    }
  }

  private restarting = false;

  ngAfterViewInit() {
    setInterval(() => {
      if (!this.particleContainerRef) {
        return;
      }
      if (this.restarting) {
        setTimeout(() => {
          this.restarting = false;
        }, 100);
      }
      const boundingRect =
        this.particleContainerRef.nativeElement.getBoundingClientRect();
      // console.log(this.particle.animationDelay, boundingRect);
      if (this.isOutOfBounds(boundingRect)) {
        this.restarting = true;
        this.outOfBounds = true;
        this.particle.animationDelay = 0;
        this.particle.xOffset = this.randomXOffset;
        setTimeout(() => {
          this.outOfBounds = false;
          this.xTarget = 0;
        });
      }
    }, 500);
  }

  setXTarget(xTarget: number) {
    if (this.xTarget !== xTarget) {
      this.xTarget = xTarget;
    }
  }

  isOutOfBounds(boundingRect: DOMRect) {
    if (boundingRect.bottom < 0) {
      return true;
    }
    if (this.leftArrowKeyDown) {
      if (
        boundingRect.left > this.screenWidth ||
        boundingRect.right < 0 - this.extraHorizontalBoundSpace
      ) {
        return true;
      }
    } else if (this.rightArrowKeyDown) {
      if (
        boundingRect.left >
          window.innerWidth + this.extraHorizontalBoundSpace ||
        boundingRect.right < 0
      ) {
        return true;
      }
    } else {
      if (boundingRect.left > this.screenWidth || boundingRect.right < 0) {
        return true;
      }
    }
    return false;
  }

  setToRandomParameters() {
    this.particle.oscillate = this.randomOscillation;
    this.particle.animationDuration = this.randomDuration;
    this.particle.animationDelay = this.randomDelay;
    this.particle.xOffset = this.randomXOffset;
    this.particle.yOffset = this.randomYOffset;
    this.particle.colour = this.randomColour;
    const randomSize = this.randomSize;
    this.particle.width = randomSize.width;
    this.particle.height = randomSize.height;
  }

  get randomOscillation() {
    let rand = Math.random();
    if (rand <= 0.5) {
      return true;
    } else {
      return false;
    }
  }

  get randomDuration() {
    return Math.random() * 12 + 4;
  }

  get randomDelay() {
    return Math.random() * 5;
  }

  get randomColour() {
    const rand = Math.random();
    if (rand > 0.75) {
      return 'blue';
    } else if (rand > 0.5) {
      return 'red';
    } else if (rand > 0.25) {
      return 'purple';
    } else {
      return 'orange';
    }
  }

  get randomXOffset() {
    if (this.rightArrowKeyDown) {
      return (
        Math.random() * (window.innerWidth + this.extraHorizontalBoundSpace) +
        this.extraHorizontalBoundSpace
      );
    } else if (this.leftArrowKeyDown) {
      return (
        Math.random() * (window.innerWidth - this.extraHorizontalBoundSpace) -
        this.extraHorizontalBoundSpace
      );
    }
    return Math.random() * window.innerWidth;
  }

  get randomYOffset() {
    const yOffset =
      this.screenHeight - Math.random() * (this.screenHeight * 0.5);
    return yOffset;
  }

  get randomSize() {
    const rand = Math.random();
    if (rand > 0.75) {
      return { width: '10px', height: '10px' };
    } else if (rand > 0.5) {
      return { width: '15px', height: '15px' };
    } else if (rand > 0.25) {
      return { width: '20px', height: '20px' };
    } else {
      return { width: '10px', height: '10px' };
    }
  }
}
