import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../utils/DataService';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-noticeform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './noticeform.component.html',
  styleUrl: './noticeform.component.css', 
  providers: [HttpClientModule] // Provide HttpClientModule here
})
export class NoticeformComponent implements OnInit  {
  //////////////////////////////////////////////
  // vars for form
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''), 
    email: new FormControl(''), 
    phoneNumber: new FormControl(''), 
    requireEmail: new FormControl(''),
    requirePhoneNumber: new FormControl(''),
    supervisor: new FormControl('')
  });
  submitted = false;
  apiMessage: string = "";

  //////////////////////////////////////////////
  // vars for data driven pulldown
  httpClient = inject(HttpClient); 
  data: any[] = [];
  dataReceived: boolean = false;
  dataNoError: boolean = true;
  apiUrl: string = "http://3.137.205.32:8080/api/supervisors";

  constructor(private formBuilder: FormBuilder
    , private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.fetchData2(); 

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
        supervisor: [
          '', 
          [
            Validators.required
          ]
        ]
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

  // fetchData(): void {
  //   this.httpClient
  //   .get<any>(this.apiUrl)
  //   .subscribe({
  //     next: (data: any) => {
  //       console.log(data); 
  //       this.data = data;
  //       this.dataReceived = true;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching data:', error);
  //       this.dataNoError = false; 
  //     }
  //   });
  // }

  fetchData2(): void {
    this.dataService.getData().pipe(
      tap(data => {
        console.log('pulldown data from api:', data);
        this.data = data;
        this.dataReceived = true;
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        this.dataNoError = false; 
        return of(null);
      })
    ).subscribe();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      // submit data

      // create payloadObj from form data.  We don't want to send check box info.
      const keysToRemove = ["requireEmail", "requirePhoneNumber"];
      const payloadObj = Object.fromEntries(Object.entries(this.form.value).filter(([key, value]) => !keysToRemove.includes(key)));

      console.log(JSON.stringify(this.form.value, null, 2));
      console.log(JSON.stringify(payloadObj, null, 2));

      // THIS WORKS WELL
      // https://www.youtube.com/watch?v=Sa8nVPzNWq4
      // this.dataService.submitData(payloadObj).subscribe(response => {
      //   console.log('Response:', response);
      //   this.apiMessage = response.message;
      //   this.submitted = false;
      //   this.form.reset(); 
      // }, error => {
      //   console.error('Error:', error);
      //   this.apiMessage = error; 
      // });


      this.dataService.submitData(payloadObj).pipe(
        tap(response => {
          console.log('Response:', response);
          this.apiMessage = response.message;
          this.submitted = false;
          this.form.reset(); 
        }),
        catchError(error => {
          console.error('Error:', error);
          this.apiMessage = error; 
          return of(null);
        })
      ).subscribe();

    }
  }

}
