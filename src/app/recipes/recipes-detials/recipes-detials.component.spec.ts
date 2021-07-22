import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDetialsComponent } from './recipes-detials.component';

describe('RecipesDetialsComponent', () => {
  let component: RecipesDetialsComponent;
  let fixture: ComponentFixture<RecipesDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesDetialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
