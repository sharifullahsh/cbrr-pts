import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEventType, HttpEvent, HttpRequest } from '@angular/common/http';
import { TransactionEvents } from '../_models/transactionEvents';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionEventsService {
  baseUrl = environment.apiUrl;
  response: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {}
  formModalTransEvent = this.fb.group({
    Id: [''],
    TransactionId: ['', Validators.required],
    EventTypeId: ['', Validators.required],
    Remarks: ['', Validators.required],
    EventDate: ['', Validators.required],
    DepartmentId: ['', Validators.required],
    ResponsibleId: [''],
    EventStatusId: ['']
    // URL: ['']
  });

  formEditModalTrans = this.fb.group({
    Id: [''],
    ProjectTransactionId: ['', Validators.required],
    TransactionEventTypeId: ['', Validators.required],
    Remarks: ['', Validators.required],
    EventDate: ['', Validators.required],
    DepartmentId: ['', Validators.required],
    ResponsibleId: [''],
    EventStatusId: ['']
   
  });

  addTransEvent(transId: number | string, path: string) {
    const formData = {
      eventTypeId: this.formModalTransEvent.value.EventTypeId,
      transactionEventTypeId: this.formModalTransEvent.value.EventTypeId,
      remarks: this.formModalTransEvent.value.Remarks,
      eventDate: this.formModalTransEvent.value.EventDate,
      departmentId: this.formModalTransEvent.value.DepartmentId,
      responsibleId: this.formModalTransEvent.value.ResponsibleId,
      eventStatusId: this.formModalTransEvent.value.EventStatusId,
      projectTransactionId: transId,
      URL: path
    };
    return this.http.post(
      this.baseUrl + 'ProjectTransaction/AddTransactionEvent',
      formData
    );
  }
  uploadFile(file: any) {
    // if (file) {
      const fileToUpload = file as File;
      const fileData = new FormData();
      fileData.append('file', fileToUpload, fileToUpload.name);
      return this.http.post(this.baseUrl + 'upload', fileData, {
        reportProgress: true,
        observe: 'events'
      });
   // }
  }
  getDepartments() {
    return this.http.get(this.baseUrl + 'Lookup/GetDepartments');
  }
  getTransEvents(id: string | number) {
    return this.http.get(
      this.baseUrl + 'ProjectTransaction/GetProjectTransactionEvents/' + id
    );
  }
  editTransEvent(transEvent: TransactionEvents, path: string) {
    transEvent.url = path;
    return this.http.post(
      this.baseUrl + 'ProjectTransaction/EditTransactionEvent',
      transEvent
    );
  }

  deleteTransEvent(id: string | number) {
    return this.http.post(
      this.baseUrl + 'ProjectTransaction/RemoveTransactionEven/' + id,
      {}
    );
  }

  getEventTypes() {
    return this.http.get(this.baseUrl + 'Lookup/GetEventTypes');
  }

  getResponsibles() {
    return this.http.get(this.baseUrl + 'Lookup/GetResponsibles');
  }

  getEventStatus() {
    return this.http.get(this.baseUrl + 'Lookup/GetEventStatuses');
  }

  downloadFile(filePath: string) {
     // tslint:disable-next-line: max-line-length
     return this.http.get(this.baseUrl + 'upload/download?file=' + filePath , {reportProgress: true, responseType: 'blob',  observe: 'events'});
  }
}
