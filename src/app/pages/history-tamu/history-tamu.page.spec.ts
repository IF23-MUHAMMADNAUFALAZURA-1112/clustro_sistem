import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryTamuPage } from './history-tamu.page';

describe('HistoryTamuPage', () => {
  let component: HistoryTamuPage;
  let fixture: ComponentFixture<HistoryTamuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTamuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
