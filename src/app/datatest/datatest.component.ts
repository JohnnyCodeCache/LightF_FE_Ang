import { Component, OnInit } from '@angular/core';
import { GetDataFromAwsApiService } from '../get-data-from-aws-api.service';

@Component({
  selector: 'app-datatest',
  standalone: true,
  imports: [],
  templateUrl: './datatest.component.html',
  styleUrl: './datatest.component.css'
})
export class DatatestComponent {
  data: any[] = [];

  constructor(
    //private getDataFromAwsApiService: GetDataFromAwsApiService
  ) { };

  ngOnInit(): void {
    //this.getDataFromAws();
  }

  // getDataFromAws() {
  //   this.getDataFromAwsApiService.fetchData().subscribe((data: any[]) => {
  //     this.data = data; // Assuming the API response is an array of objects
  //   });
  // }

}
