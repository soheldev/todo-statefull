import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpenseSummaryComponent } from './monthly-expense-summary.component';

describe('MonthlyExpenseSummaryComponent', () => {
  let component: MonthlyExpenseSummaryComponent;
  let fixture: ComponentFixture<MonthlyExpenseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyExpenseSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyExpenseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
