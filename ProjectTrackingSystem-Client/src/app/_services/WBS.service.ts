import { WBS } from './../_models/WBS';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WBSService {
  baseUrl = environment.apiUrl;
    // tslint:disable-next-line: no-output-native
  @Output() click: EventEmitter<boolean> = new EventEmitter();
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  formModalWBS = this.fb.group({
    Id: [''],
    WBSId: ['', Validators.required],
    WBSName: ['', Validators.required],
    Description: ['', Validators.required],
    Budget: ['', Validators.required],
    Target: [''],
    UnitCost: [''],
    ProjectId: [''],
  });

  formEditModalWBS = this.fb.group({
    Id: [''],
    WBSId: ['', Validators.required],
    WBSName: ['', Validators.required],
    Description: ['', Validators.required],
    Budget: ['', Validators.required],
    Target: [''],
    UnitCost: [''],
    ProjectId: [''],
  });

  getWBSes(id: string | number) {
    return this.http.get(this.baseUrl + 'WBS/GetWBSes/' + id);
  }
  addWBS(projId: number | string) {
    const formData = {
      WBSId: this.formModalWBS.value.WBSId,
      WBSName: this.formModalWBS.value.WBSName,
      budget: this.formModalWBS.value.Budget,
      target: this.formModalWBS.value.Target,
      unitCost: this.formModalWBS.value.UnitCost,
      description: this.formModalWBS.value.Description,
      projectId: projId
    };
    console.log(formData);
    return this.http.post(this.baseUrl + 'WBS/AddWBS', formData);
  }
  editWBS(wbs: WBS) {
   // console.log(wbs);
    return this.http.post(this.baseUrl + 'WBS/EditWBS', wbs);
 }

 deleteWBS(id: string | number) {
  return  this.http.post(this.baseUrl + 'WBS/RemoveWBS/' + id, {});
}
}
