import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import Validation from '../utils/validation';
import { CommonModule } from '@angular/common';
import { GetDataFromAwsApiService } from '../get-data-from-aws-api.service';

@Component({
  selector: 'app-noticeform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './noticeform.component.html',
  styleUrl: './noticeform.component.css'
})
export class NoticeformComponent implements OnInit  {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''), 
    email: new FormControl(''), 
    phoneNumber: new FormControl(''), 
    requireEmail: new FormControl(''),
    requirePhoneNumber: new FormControl(''),
    //, supervisor: new FormControl('')
  });

  submitted = false;
  data: any[] = [];
  ///supervisor: string = ''; 

  constructor(private formBuilder: FormBuilder 
              //, private getDataFromAwsApiService: GetDataFromAwsApiService
  ) {}

  ngOnInit(): void {
    //this.getData();

    this.form  = this.formBuilder.group(
      {
        firstName: [
          '', 
          [
            Validators.required
          ]
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ], 
        email: [
          '', 
          Validators.email
        ], 
        phoneNumber: [
          '', 
          Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)
        ], 
        requireEmail: [], 
        requirePhoneNumber: [], 
        // ,supervisor: [
        //   '', 
        //   [
        //     Validators.required
        //   ]
        // ]
      },
      {
        validators: []
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  //disallow users to type anything but letters
  alphabetOnlyInput(event: any, controlName: string) {
    let currentValue = event.target.value;
    currentValue = currentValue.replace(/[^a-zA-Z]/g, '');
    this.form.patchValue({ [controlName]: currentValue }, { emitEvent: false }); // Patch value to the form without emitting events
  }
  //disallow users to type anything but numbers and - 
  numbersAndDashOnlyInput(event: any, controlName: string) {
    let currentValue = event.target.value;
    currentValue = currentValue.replace(/[^\d-]/g, '');
    this.form.patchValue({ [controlName]: currentValue }, { emitEvent: false });
  }

  onCheckboxChange(event: any, controlName: string) {
    const requireControl = event.target.checked;
    const thisControl = this.form.get(controlName);
    if (thisControl) {
      if (requireControl) {
        if(controlName == 'phoneNumber'){
          thisControl.setValidators([Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]);
        }
        if(controlName == 'email'){
          thisControl.setValidators([Validators.required, Validators.email]);
        }
      } else {
        thisControl.clearValidators();
      }
      thisControl.updateValueAndValidity();
    }
  }

  // getData() {
  //   this.getDataFromAwsApiService.fetchData().subscribe((data: any[]) => {
  //     this.data = data; // Assuming the API response is an array of objects
  //   });
  // }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

}
