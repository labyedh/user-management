import { HttpClient } from '@angular/common/http';
import { compileDeclareInjectableFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiUrl = "http://localhost:3200/user";
  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  //create user
  createdata(data: any): Observable<any> {
    console.log(data, 'data created');
    return this.http.post(`${this.apiUrl}`, data);
  }
  //deletedata
  deletedata(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.apiUrl}/${ids}`);

  }
  //update data
  updatedata(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.apiUrl}/${ids}`, data);
  }

  //getsingledata
  getSingledata(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`);
  }
}
