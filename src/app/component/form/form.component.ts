
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  submitText: string = 'FINISH'
  titleText: string = ''
  titleIndex: number = 0
  projectForm!: FormGroup;
  projectDetailsForm!: FormGroup;
  reader = new FileReader();
  image: string[] = [];
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  ProjectId!: number
  constructor(private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private activeRoute: ActivatedRoute) {
    let id = this.activeRoute.snapshot.params['id'];
    this.ProjectId = parseInt(id)
  }

  ngOnInit() {
    this.myForm()
    this.formValue()

  }

  myForm() {
    this.projectForm = this.fb.group(
      {
        projectDetails: this.fb.group({
          organization: ['', Validators.required],
          category: ['', Validators.required],
          activity: ['', Validators.required],
          title: ['', [Validators.required, this.validateString]],
          minimum: ['', Validators.required],
          maximum: ['', Validators.required],
          description: ['', Validators.required],
        }, {
          validator: this.ageValidator('minimum', 'maximum')
        }),
        projectFile: [Validators.required],
        projectCost: this.fb.array([this.projectCost()]),
        projectIncludes: this.fb.array([this.projectIncludes()]),
        projectDate: this.fb.array([this.projectDate()])
      });
  }

  formValue() {
    if (this.ProjectId >= 0) {
      let data = this.projectService.getUser(this.ProjectId)
      console.log(data)
      for (let i = 1; i < data.projectCost.length; i++) {
        this.addProjectCost()
      }
      for (let i = 1; i < data.projectIncludes.length; i++) {
        this.addProjectIncludes()
      }
      for (let i = 1; i < data.projectDate.length; i++) {
        this.addProjectDate()
      }
      this.projectForm.patchValue(data)
      this.image = data.projectFile
      this.submitText = "UPDATE"
    }
  }

  get getProjectDetails() {
    return this.projectForm.get('projectDetails') as FormGroup;
  }

  get getFileName() {
    if (this.image.length == 0) { return true } return false
  }


  projectCost() {
    return this.fb.group({
      cost: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    })
  }
  get getProjectCost() {
    return this.projectForm.controls['projectCost'] as FormArray
  }
  addProjectCost() {
    this.getProjectCost.push(this.projectCost())
  }
  removeProjectCost(index: number) {
    this.getProjectCost.removeAt(index)
  }

  projectIncludes() {
    return this.fb.group({
      description: ['', [Validators.required, this.validateString]],
      includesCondition: ['', Validators.required]
    })
  }
  get getProjectIncludes() {
    return this.projectForm.controls['projectIncludes'] as FormArray
  }
  addProjectIncludes() {
    this.getProjectIncludes.push(this.projectIncludes())
  }
  removeProjectIncludes(index: number) {
    this.getProjectIncludes.removeAt(index)
  }

  projectDate() {
    return this.fb.group({
      date: ['', Validators.required]
    })
  }
  get getProjectDate() {
    return this.projectForm.controls['projectDate'] as FormArray
  }
  addProjectDate() {
    this.getProjectDate.push(this.projectDate())
  }
  removeProjectDate(index: number) {
    this.getProjectDate.removeAt(index)
  }

  onFileChange(event: any) {
    this.image = []
    for (let file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image.push(reader.result as string);
        console.log(this.image)
      };
    }
    this.projectForm.get('projectFile')?.setValue(this.image)
  }



  submit() {
    if (this.ProjectId >= 0) {
      alert(`New Project with Id ${this.ProjectId} added successfully`)
      this.projectService.updateProject(this.projectForm.value, this.ProjectId)
    } else {
      console.log("Submitted");
      this.projectService.addProjectData(this.projectForm.value)
    }
    return this.router.navigateByUrl('/list')
  }

  validateString(control: FormControl) {
    const trimmedValue = control.value.trim();
    if (trimmedValue === '') {
      return { spacesOnly: true };
    }
    return null;
  }

  ageValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value >= matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  removeImg(i: number) {
    this.image.splice(i, 1)
    this.projectForm.get('projectFile')?.setValue(this.image)
  }

  changeStep(event: any) {
    this.titleText = this.getProjectDetails.get('title')?.value
    this.titleIndex = event.selectedIndex
  }
}
