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
  constructor(
    public bsModalRef: BsModalRef,
    private alertify: AlertifyService,
    private userService: UserService,
    private authServic: AuthService
  ) {}

  ngOnInit() {
    this.userService.formModalUser.reset();
    this.getProgrammes();
    this.getAllRoles();
    this.getProvinces();
  }
  getProgrammes() {
    this.userService.getProgrammes().subscribe(
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
    this.userService.registerUser(this.userService.formModalUser.value).subscribe(
      (res: any) => {
        this.userService.formModalUser.reset();
        this.alertify.success('Operation Successfully!');
        this.updateTable.emit();
      },
      err => {
        console.log("error is >>>>>>"+ JSON.stringify(err));
        this.alertify.error(err + 'Error, Operation Failed!');
      }
    );
  }
  getProvinces() {
    this.userService.getProvinces().subscribe(
      response => {
        this.drProvince = response;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

}
