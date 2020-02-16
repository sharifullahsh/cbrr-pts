import { GeneralService } from './../../../_services/general.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TransactionEventsService } from 'src/app/_services/transactionEvents.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from './../../../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-UserAddModal',
  templateUrl: './UserAddModal.component.html',
  styleUrls: ['./UserAddModal.component.css']
})
export class UserAddModalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  drProgrammes: any;
  drRoles: any;
  response: any;
  drProvince: any;
  submitted = false;
  constructor(
    public bsModalRef: BsModalRef,
    public alertify: AlertifyService,
    public userService: UserService,
    public authServic: AuthService,
    public generalService: GeneralService
  ) {}

  ngOnInit() {
    this.userService.addUserFormModal.reset();
    this.getProgrammes();
    this.getAllRoles();
    this.getProvinces();
  }
  getProgrammes() {
    this.generalService.getProgrammes().subscribe(
      response => {
        this.drProgrammes = response;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getAllRoles() {
    this.userService.getAllRoles().subscribe(
      response => {
        this.drRoles = response;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  
  addUser() {
    this.submitted = true;
    if (this.userService.addUserFormModal.valid) {
      this.bsModalRef.hide();
      this.userService.registerUser(this.userService.addUserFormModal.value).subscribe(
        (res: any) => {
          this.userService.addUserFormModal.reset();
          this.alertify.success('Operation Successfully!');
          this.updateTable.emit();
        },
        err => {
          this.alertify.error(err + 'Error, Operation Failed!');
        }
      );
    }
    return;
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

}
