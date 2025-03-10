import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityComponent } from './equity.component';
import { ChartComponent } from 'ng-apexcharts';

describe('EquityComponent', () => {
  let component: EquityComponent;
  let fixture: ComponentFixture<EquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquityComponent, ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
