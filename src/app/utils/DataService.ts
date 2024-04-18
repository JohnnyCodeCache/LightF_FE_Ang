import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Method to submit JSON data to AWS Endpoint
  submitData(jsonData: any): Observable<any> {
    const url = 'http://3.137.205.32:8080/api/submit';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(url, jsonData, { headers });
  }

  getData(): Observable<any> {
    const url = 'http://3.137.205.32:8080/api/supervisors';
    return this.http.get<any>(url);
  }

}