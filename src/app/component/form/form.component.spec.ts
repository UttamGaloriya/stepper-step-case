import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { MaterialModule } from '../../material/material.module';
import { DataShowComponent } from '../data-show/data-show.component';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, DataShowComponent],
      imports: [MaterialModule, ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('run angular form', () => {
    let control: AbstractControl
    control = component.projectForm.get('projectDetails.minimum') as AbstractControl,
      console.log("done");
  })

  it('form valid', () => {
    let projectDetails = {
      organization: 'steak',
      category: 'steak',
      activity: 'steak',
      title: 'string',
      minimum: 20,
      maximum: 74,
      description: 'string',
    };
    let projectForm: AbstractControl;
    projectForm = component.projectForm.get('projectDetails') as AbstractControl
    projectForm.patchValue(projectDetails)
    expect(projectForm.valid).toBeTruthy();
  })

  it('project form valid', () => {
    let ProjectData = {
      projectDetails: {
        organization: 'steak',
        category: 'steak',
        activity: 'steak',
        title: 'string',
        minimum: 20,
        maximum: 74,
        description: 'string',
      },
      projectFile: ['string'],
      projectCost: [{ cost: 12, duration: 15 }],
      projectIncludes: [{
        description: 'string',
        includesCondition: 'string'
      }],
      projectDate: [{
        date: new Date()
      }]
    }
    let projectForm: AbstractControl;
    projectForm = component.projectForm
    projectForm.patchValue(ProjectData)
    expect(projectForm.valid).toBeTruthy()
  })
});
