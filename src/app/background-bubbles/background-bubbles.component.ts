import { Component, HostListener, OnInit } from '@angular/core';
import { Particle } from '../particle/particle.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-background-bubbles',
  templateUrl: './background-bubbles.component.html',
  styleUrls: ['./background-bubbles.component.scss'],
})
export class BackgroundBubblesComponent implements OnInit {
  particles: Particle[] = [];

  rightArrowKeyDown$ = new Subject<boolean>();
  leftArrowKeyDown$ = new Subject<boolean>();

  keyCode = {
    RIGHT_ARROW: 'ArrowRight',
    LEFT_ARROW: 'ArrowLeft',
  };

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === this.keyCode.RIGHT_ARROW) {
      if (event.type === 'keyup') {
        this.rightArrowKeyDown$.next(false);
      } else if (event.type === 'keydown') {
        this.rightArrowKeyDown$.next(true);
      }
    } else if (event.code === this.keyCode.LEFT_ARROW) {
      if (event.type === 'keyup') {
        this.leftArrowKeyDown$.next(false);
      } else if (event.type === 'keydown') {
        this.leftArrowKeyDown$.next(true);
      }
    }
  }

  ngOnInit(): void {
    for (let i = 1; i < 100; i++) {
      this.particles.push(new Particle());
    }
  }
}
