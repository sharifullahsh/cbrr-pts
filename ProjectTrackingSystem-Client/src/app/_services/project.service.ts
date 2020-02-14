import { Project } from './../_models/project';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  // tslint:disable-next-line: no-output-native
  @Output() click: EventEmitter<boolean> = new EventEmitter();

constructor(private http: HttpClient,  private fb: FormBuilder) { }


formModalProject = this.fb.group({
  Id: [''],
  ProjectCode: ['', Validators.required],
  ProjectName: ['', Validators.required],
  Budget: ['', Validators.required],
  StartDate: [null, Validators.required],
  EndDate: [null, Validators.required],
  Currency: ['', Validators.required],
  Programme: ['', Validators.required],
});

formEditModalProject = this.fb.group({
  Id: [''],
  ProjectCode: ['', Validators.required],
  ProjectName: ['', Validators.required],
  Budget: ['', Validators.required],
  StartDate: [null, Validators.required],
  EndDate: [null, Validators.required],
  Currency: ['', Validators.required],
  Programme: ['', Validators.required],
});

addProject() {
  const formData = {
    projectCode: this.formModalProject.value.ProjectCode,
    projectName: this.formModalProject.value.ProjectName,
    budget: this.formModalProject.value.Budget,
    startDate: this.formModalProject.value.StartDate,
    endDate: this.formModalProject.value.EndDate,
    currencyId: this.formModalProject.value.Currency,
    programmeId: this.formModalProject.value.Programme
  };
  return this.http.post(this.baseUrl + 'ProjectTracking/AddProject', formData);
}

editProject(project: Project) {
   return this.http.post(this.baseUrl + 'ProjectTracking/editProject', project);
}
getCurrencies() {
  return  this.http.get(this.baseUrl + 'Lookup/GetCurrencies');
}
getProjects() {
  return  this.http.get(this.baseUrl + 'ProjectTracking/GetProjects');
}
getProjectsByProgramme(id: string | number) {
  return  this.http.get(this.baseUrl + 'ProjectTracking/getprojectsbyprogramme/' + id);
}
deleteProject(id: string | number) {
  return  this.http.post(this.baseUrl + 'ProjectTracking/Removeproject/' + id, {});
}
}
