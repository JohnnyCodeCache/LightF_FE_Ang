import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataFromAwsApiService {

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get('assets/config.json');
  }

}
