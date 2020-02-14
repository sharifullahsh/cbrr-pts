import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getProvinces() {
    return this.http.get(this.baseUrl + 'lookup/GetProvinces');
  }
  getProgrammes() {
    return  this.http.get(this.baseUrl + 'Lookup/GetProgrammes');
  }
}
