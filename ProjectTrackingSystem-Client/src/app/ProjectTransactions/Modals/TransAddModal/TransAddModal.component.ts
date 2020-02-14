import { GeneralService } from './../../../_services/general.service';
import { ProjectService } from './../../../_services/project.service';
import { ProjectTransactionService } from './../../../_services/projectTransaction.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-TransAddModal',
  templateUrl: './TransAddModal.component.html',
  styleUrls: ['./TransAddModal.component.css']
})
export class TransAddModalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  list: any[] = [];
  loaded = false;
  wbsId: any;
  bsConfig: Partial<BsDatepickerConfig>;
  drCurrency: any;
  drTransactionType: any;
  drProvince: any;
  drCurrencies: any;


  constructor(public bsModalRef: BsModalRef,
              private alertify: AlertifyService,
              private projectService: ProjectService,
              public transService: ProjectTransactionService,
              public generalService: GeneralService) { }

  ngOnInit() {
    this.transService.formModalTrans.reset();
    this.getCurrencies();
    this.getTransTypes();
    this.getProvinces();
  }
  getTransTypes() {
    this.transService.getTransTypes().subscribe(
      response => {
        this.drTransactionType = response;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getProvinces() {
    this.generalService.getProvinces().subscribe(
      response => {
        this.drProvince = response;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getCurrencies() {
    this.projectService.getCurrencies().subscribe(
      response => {
        this.drCurrencies = response;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  addTransaction() {
   /// if (this.transService.formModalTrans.valid) {
    this.transService.addTrans(this.wbsId).subscribe(
      (res: any) => {
        this.transService.formModalTrans.reset();
        this.alertify.success('Operation Successfully!');
        this.updateTable.emit();
      },
      err => {
        this.alertify.error(err + 'Error, Operation Failed!');
      }
    );
    // } else {
    //   this.alertify.error('Validation Failed');
    // }
  }
}


