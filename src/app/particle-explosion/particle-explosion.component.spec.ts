import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleExplosionComponent } from './particle-explosion.component';

describe('ParticleExplosionComponent', () => {
  let component: ParticleExplosionComponent;
  let fixture: ComponentFixture<ParticleExplosionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleExplosionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticleExplosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
