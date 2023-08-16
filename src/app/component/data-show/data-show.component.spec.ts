import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShowComponent } from './data-show.component';
import { MaterialModule } from '../../material/material.module';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('DataShowComponent', () => {
  let component: DataShowComponent;
  let fixture: ComponentFixture<DataShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataShowComponent],
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check title', () => {
    let control: FormControl
    control = component.title
    control.setValue('target')
    expect(control.value).toBe('target')
  });

  it('Input TitleName', () => {
    component.titleName = 'titleName'
    expect(component.titleName).toBe('titleName')
  });


});
