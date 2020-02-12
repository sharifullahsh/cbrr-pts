import { RegisterUser } from './../_models/RegisterUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,  private fb: FormBuilder) { }
  baseUrl = environment.apiUrl;
  searchFormModalUser = this.fb.group({
    ProgrammeId: '',
    Name: '',
    RoleId: '',
    ProvinceId: ''
    });
  formModalUser = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required],
    RoleId: ['', Validators.required],
    ProgramId: ['', Validators.required],
    ProvinceId: ['', Validators.required],
  });
  formEditModalUser = this.fb.group({
    Id: [''],
    UserName: ['', Validators.required],
    Password: ['', Validators.required],
    RoleId: ['', Validators.required],
    ProgramId: ['', Validators.required],
    ProvinceId: ['', Validators.required],
  });
  
  getUsers() {
    return  this.http.get(this.baseUrl + 'Admin/allUsers');
  }
  getProgrammes() {
    return  this.http.get(this.baseUrl + 'Lookup/GetProgrammes');
  }
  getAllRoles() {
    return  this.http.get(this.baseUrl + 'Admin/getAllRoles');
  }
  getProvinces() {
    return this.http.get(this.baseUrl + 'lookup/GetProvinces');
  }
  registerUser(user: RegisterUser) {
    console.log("inside the regis te and urse is "+ JSON.stringify(user));
    return this.http.post(this.baseUrl + 'Auth/register', user);
  }
  
  editUser(user: RegisterUser) {
    return this.http.post(this.baseUrl + 'Auth/editUser', user);
   }


  deleteUser(id: string | number) {
    return  this.http.post(this.baseUrl + 'Admin/RemoveUser/' + id, {});
  }
}
