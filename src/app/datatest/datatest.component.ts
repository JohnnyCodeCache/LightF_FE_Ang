import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GetDataFromAwsApiService } from '../get-data-from-aws-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datatest',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './datatest.component.html',
  styleUrl: './datatest.component.css'
})
export class DatatestComponent implements OnInit  {
httpClient = inject(HttpClient); 

  data: any[] = [];

  constructor(
    //private getDataFromAwsApiService: GetDataFromAwsApiService
  ) { };

  ngOnInit(): void {
    //alert("Hi"); 

    this.fetchData(); 
    //this.getDataFromAws();
  }

  fetchData() {
    this.httpClient
    .get('http://3.137.205.32:8080/api/supervisors')
    .subscribe((data: any) => {
      console.log(data); 
      this.data = data;
    });
  }

  // getDataFromAws() {
  //   this.getDataFromAwsApiService.fetchData().subscribe((data: any[]) => {
  //     this.data = data; // Assuming the API response is an array of objects
  //   });
  // }

}
