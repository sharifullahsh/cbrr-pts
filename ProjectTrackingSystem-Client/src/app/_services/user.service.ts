import { RegisterUser } from './../_models/RegisterUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MustMatch } from '../_helpers/validators';

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
    RoleId: ['', Validators.required],
    ProgramId: ['', Validators.required],
    ProvinceId: ['', Validators.required],
  });

  formChangePassModal = this.fb.group({
    Id: [''],
    CurrentPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    NewPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    ConfirmPassword : ['', Validators.required]
  }, {validator : MustMatch('NewPassword', 'ConfirmPassword')});
  
  getUsers() {
    return  this.http.get(this.baseUrl + 'Admin/allUsers');
  }
  getUser(id: number) {
    return  this.http.get(this.baseUrl + 'Admin/getUser/' + id);
  }
  getAllRoles() {
    return  this.http.get(this.baseUrl + 'Admin/getAllRoles');
  }
  
  registerUser(user: RegisterUser) {
    return this.http.post(this.baseUrl + 'Admin/register', user);
  }
  editUser(user: RegisterUser) {
    return this.http.post(this.baseUrl + 'Admin/editUser', user);
   }
   editPassword(passworChangeInfo: any) {
    return this.http.post(this.baseUrl + 'Admin/changePassword', passworChangeInfo);
   }

  deleteUser(id: string | number) {
    return  this.http.post(this.baseUrl + 'Admin/RemoveUser/' + id, {});
  }
  resetPassword(id: string | number) {
    return  this.http.post(this.baseUrl + 'Admin/resetPasswrod/' + id, {});
  }
  
}
