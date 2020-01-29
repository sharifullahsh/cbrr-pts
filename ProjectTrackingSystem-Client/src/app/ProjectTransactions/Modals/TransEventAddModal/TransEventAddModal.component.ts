import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TransactionEventsService } from 'src/app/_services/transactionEvents.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-TransEventAddModal',
  templateUrl: './TransEventAddModal.component.html',
  styleUrls: ['./TransEventAddModal.component.css']
})
export class TransEventAddModalComponent implements OnInit {
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
  constructor(
    public bsModalRef: BsModalRef,
    private alertify: AlertifyService,
    public transEventService: TransactionEventsService
  ) {}

  ngOnInit() {
    this.transEventService.formModalTransEvent.reset();
    this.getDepartments();
    this.getEventTypes();
    this.getResponsibles();
    this.getEventStatus();
  }
  public uploadFile = files => {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = files[0] as File;
    this.file = fileToUpload;
  }
  getDepartments() {
    this.transEventService.getDepartments().subscribe(
      response => {
        this.drDepartment = response;
        // console.log(this.drTransactionType);
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
        console.log(this.drResponsible);
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
        console.log(this.drEventStatus);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  addTransactionEvent() {
    if (this.file) {
      this.transEventService.uploadFile(this.file).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.response = event.body;
          console.log(this.response);

          // add transaction event
          this.transEventService
            .addTransEvent(this.transId, this.response.dbPath)
            .subscribe(
              (res: any) => {
                this.transEventService.formModalTransEvent.reset();
                this.alertify.success('Operation Successfully!');
                this.updateTable.emit();
              },
              err => {
                this.alertify.error(err + 'Error, Operation Failed!');
              }
            );
        }
      });
    } else {
      this.transEventService
      .addTransEvent(this.transId, '')
      .subscribe(
        (res: any) => {
          this.transEventService.formModalTransEvent.reset();
          this.alertify.success('Operation Successfully!');
          this.updateTable.emit();
        },
        err => {
          this.alertify.error(err + 'Error, Operation Failed!');
        }
      );
    }
  }
  public uploadFinished = event => {
    this.response = event;
  }
}
