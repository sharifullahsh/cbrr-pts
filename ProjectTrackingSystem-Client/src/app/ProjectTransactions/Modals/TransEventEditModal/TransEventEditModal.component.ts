import { TransactionEvents } from './../../../_models/transactionEvents';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TransactionEventsService } from 'src/app/_services/transactionEvents.service';
import { HttpEventType } from '@angular/common/http';
import {sayHello} from '../../../_helpers/common';

@Component({
  selector: 'app-TransEventEditModal',
  templateUrl: './TransEventEditModal.component.html',
  styleUrls: ['./TransEventEditModal.component.css']
})
export class TransEventEditModalComponent implements OnInit {

  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  list: any[] = [];
  loaded = false;
  transId: any;
  bsConfig: Partial<BsDatepickerConfig>;
  drDepartment: any;
  drEventType: any;
  drResponsible: any;
  drEventStatus: any;
  response: any;
  file: any;
  transEvent: TransactionEvents;
  constructor(
    public bsModalRef: BsModalRef,
    private alertify: AlertifyService,
    public transEventService: TransactionEventsService
  ) {}

  ngOnInit() {
    this.getDepartments();
    this.getEventTypes();
    this.getResponsibles();
    this.getEventStatus();
    this.setFormValues();
  }
  getDepartments() {
    this.transEventService.getDepartments().subscribe(
      response => {
        this.drDepartment = response;
        const selectedDepartment = this.drDepartment.filter(
          dept => dept.departmentName === this.transEvent.departmentName)[0];
        this.transEventService.formEditModalTrans
          .get('DepartmentId')
          .setValue(selectedDepartment.id);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getEventTypes() {
    this.transEventService.getEventTypes().subscribe(
      response => {
        this.drEventType = response;
        const selectedEventType = this.drEventType.filter(
          eventType => eventType.eventTypeName === this.transEvent.eventTypeName)[0];
        this.transEventService.formEditModalTrans
          .get('TransactionEventTypeId')
          .setValue(selectedEventType.id);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getResponsibles() {
    this.transEventService.getResponsibles().subscribe(
      response => {
        this.drResponsible = response;
        const selectedResponsible = this.drResponsible.filter(
          resp => resp.responsibleName === this.transEvent.responsibleName)[0];
        this.transEventService.formEditModalTrans
          .get('ResponsibleId')
          .setValue(selectedResponsible.id);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  getEventStatus() {
    this.transEventService.getEventStatus().subscribe(
      response => {
        this.drEventStatus = response;
        const selectedStatus = this.drEventStatus.filter(
          stat => stat.eventStatusName === this.transEvent.eventStatusName)[0];
        this.transEventService.formEditModalTrans
          .get('EventStatusId')
          .setValue(selectedStatus.id);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  setFormValues() {
    this.transEventService.formEditModalTrans.get('Id').setValue(this.transEvent.id);
    this.transEventService.formEditModalTrans
      .get('EventStatusId')
      .setValue(this.transEvent.eventStatusId);
    this.transEventService.formEditModalTrans
      .get('DepartmentId')
      .setValue(this.transEvent.departmentId);
    this.transEventService.formEditModalTrans
      .get('ResponsibleId')
      .setValue(this.transEvent.responsibleId);
    this.transEventService.formEditModalTrans
      .get('TransactionEventTypeId')
      .setValue(this.transEvent.eventTypeId);
    this.transEventService.formEditModalTrans
      .get('Remarks')
      .setValue(this.transEvent.remarks);
    this.transEventService.formEditModalTrans
      .get('ProjectTransactionId')
      .setValue(this.transEvent.projectTransactionId);
    // this.transEventService.formEditModalTrans
    //   .get('URL')
    //   .setValue(this.transEvent.url);
    this.transEventService.formEditModalTrans
      .get('EventDate')
      .setValue(this.transEvent.eventDate);

  }
  editTransEvent() {
    // this.project.startDate= this.TrasnformDate(this.formEditModalProject.value.StartDate),
    const url = this.transEvent.url;
    this.transEvent = Object.assign(
      {},
      this.transEventService.formEditModalTrans.value
    );
    if (this.transEventService.formEditModalTrans.dirty) {
      // this.transEvent.eventTypeId = +this.transEventService.formEditModalTrans.get('EventTypeId').value;
      // this.transEvent.responsibleId = +this.transEventService.formEditModalTrans.get('ResponsibleId').value;
      // this.transEvent.eventStatusId = +this.transEventService.formEditModalTrans.get('EventStatusId').value;
      // this.transEvent.departmentId = +this.transEventService.formEditModalTrans.get('DepartmentId').value;

      if (this.file) {
        this.transEventService.uploadFile(this.file).subscribe(event => {
          if (event.type === HttpEventType.Response) {
            this.response = event.body;

            // add transaction edit event
            this.transEventService.editTransEvent(this.transEvent, this.response.dbPath).subscribe(
              (res: any) => {
                this.transEventService.formEditModalTrans.reset();
                this.alertify.success('Transaction Event Updated Successfully');
                this.updateTable.emit();
              },
              err => {
                this.alertify.error(err + 'Error, Operation Failed!');
              }
            );
          }
        });
      } else {
        this.transEventService.editTransEvent(this.transEvent, url).subscribe(
          (res: any) => {
            this.transEventService.formEditModalTrans.reset();
            this.alertify.success('Transaction Event Updated Successfully');
            this.updateTable.emit();
          },
          err => {
            this.alertify.error(err + 'Error, Operation Failed!');
          }
        );
      }

    }
  }

  download(fileName) {
    this.transEventService.downloadFile(fileName).subscribe(
      data => {
        if (data.type === HttpEventType.Response) {
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
        }
      },
      error => {
        this.alertify.error('Failed to download the document');
      }
    );
  }
  public uploadFile = files => {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = files[0] as File;
    this.file = fileToUpload;
  }
}
