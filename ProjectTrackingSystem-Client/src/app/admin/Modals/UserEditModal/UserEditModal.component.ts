import { Transaction } from './../../../_models/transaction';
import { ProjectTransactionService } from './../../../_services/projectTransaction.service';
import { ProjectService } from './../../../_services/project.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsDatepickerConfig, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-UserEditModal',
  templateUrl: './UserEditModal.component.html',
  styleUrls: ['./UserEditModal.component.css']
})
export class UserEditModalComponent implements OnInit {
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
  trans: Transaction;
  constructor(
    public bsModalRef: BsModalRef,
    private alertify: AlertifyService,
    private projectService: ProjectService,
    public transService: ProjectTransactionService
  ) {}

  ngOnInit() {
    //this.getTransTypes();
    //this.getProvinces();
    // this.setFormValues();
  }
  // getTransTypes() {
  //   this.transService.getTransTypes().subscribe(
  //     response => {
  //       this.drTransactionType = response;
  //       const selectedTransTtype = this.drTransactionType.filter(
  //         transType => transType.transactionTypeName === this.trans.transactionType
  //       )[0];
  //       this.transService.formEditModalTrans
  //         .get('TransactionTypeId')
  //         .setValue(selectedTransTtype.id);
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
  // getProvinces() {
  //   this.transService.getProvinces().subscribe(
  //     response => {
  //       this.drProvince = response;
  //       const selectedProvince = this.drProvince.filter(
  //         province => province.id === this.trans.provinceId
  //       )[0];
  //       this.transService.formEditModalTrans
  //         .get('ProvinceId')
  //         .setValue(selectedProvince.id);
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
 
  // setFormValues() {
  //   this.transService.formEditModalTrans.get('Id').setValue(this.trans.id);
  //   this.transService.formEditModalTrans
  //     .get('Description')
  //     .setValue(this.trans.description);
  //   this.transService.formEditModalTrans
  //     .get('TransactionDate')
  //     .setValue(this.trans.transactionDate);
  //   this.transService.formEditModalTrans
  //     .get('Amount')
  //     .setValue(this.trans.amount);
  //   this.transService.formEditModalTrans
  //     .get('ExchangeRate')
  //     .setValue(this.trans.exchangeRate);
  //   this.transService.formEditModalTrans
  //     .get('WBSId')
  //     .setValue(this.trans.wbsId);

  // }
  editTransaction() {
    // this.project.startDate= this.TrasnformDate(this.formEditModalProject.value.StartDate),
    this.trans = Object.assign(
      {},
      this.transService.formEditModalTrans.value
    );
    if (this.transService.formEditModalTrans.dirty) {
      // this.trans.currencyId = +this.transService.formEditModalTrans.get('CurrencyId').value;
      // this.trans.provinceId = +this.transService.formEditModalTrans.get('ProvinceId').value;
      // this.trans.transactionTypeId = +this.transService.formEditModalTrans.get('TransactionTypeId').value;
      this.transService.editTrans(this.trans).subscribe(
        (res: any) => {
          this.transService.formEditModalTrans.reset();
          this.alertify.success('Transaction Updated Successfully');
          this.updateTable.emit();
        },
        err => {
          this.alertify.error(err + 'Error, Operation Failed!');
        }
      );
    }
  }
}
