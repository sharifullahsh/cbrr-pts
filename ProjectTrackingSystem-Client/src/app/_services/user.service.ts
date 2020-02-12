import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../_models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,  private fb: FormBuilder) { }
  baseUrl = environment.apiUrl;
  searchFormModalUser = this.fb.group({
    ProgrammeId: '',
    Name: '',
    RoleId: ''
    });
  formModalUser = this.fb.group({
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
  // formEditModalProject = this.fb.group({
  //   Id: [''],
  //   ProjectCode: ['', Validators.required],
  //   ProjectName: ['', Validators.required],
  //   Budget: ['', Validators.required],
  //   StartDate: [null, Validators.required],
  //   EndDate: [null, Validators.required],
  //   Currency: ['', Validators.required],
  //   Programme: ['', Validators.required],
  // });
  
  // addProject() {
  //   const formData = {
  //     projectCode: this.formModalProject.value.ProjectCode,
  //     projectName: this.formModalProject.value.ProjectName,
  //     budget: this.formModalProject.value.Budget,
  //     startDate: this.formModalProject.value.StartDate,
  //     endDate: this.formModalProject.value.EndDate,
  //     currencyId: this.formModalProject.value.Currency,
  //     programmeId: this.formModalProject.value.Programme
  //   };
  //   return this.http.post(this.baseUrl + 'ProjectTracking/AddProject', formData);
  // }
  
  // editProject(project: Project) {
  //    return this.http.post(this.baseUrl + 'ProjectTracking/editProject', project);
  // }


  // getProjectsByProgramme(id: string | number) {
  //   return  this.http.get(this.baseUrl + 'ProjectTracking/getprojectsbyprogramme/' + id);
  // }
  // deleteProject(id: string | number) {
  //   return  this.http.post(this.baseUrl + 'ProjectTracking/Removeproject/' + id, {});
  // }
  deleteUser(id: string | number) {
    return  this.http.post(this.baseUrl + 'Admin/RemoveUser/' + id, {});
  }
}
