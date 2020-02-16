import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from './../../../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ChangePassModal',
  templateUrl: './ChangePassModal.component.html',
  styleUrls: ['./ChangePassModal.component.css']
})
export class ChangePassModalComponent implements OnInit {
  title: string;
  closeBtnName: string;
  response: any;
  user: any;
  submitted = false;
  constructor(
    public bsModalRef: BsModalRef,
    public alertify: AlertifyService,
    public userService: UserService,
    public authServic: AuthService
  ) {}

  ngOnInit() {
    this.userService.formChangePassModal.reset();
    this.setFormValues();
  }
  setFormValues() {
    this.userService.formChangePassModal
      .get('Id')
      .setValue(this.user.id);
  }
  get f() { return this.userService.formChangePassModal.controls; }

  changePasswod() {
    this.submitted = true;
    if (this.userService.formChangePassModal.valid) {
      this.bsModalRef.hide();
      const passchangeInfo = {
        Id: this.userService.formChangePassModal.get('Id').value,
        CurrentPassword : this.userService.formChangePassModal.get('CurrentPassword').value,
        NewPassword: this.userService.formChangePassModal.get('NewPassword').value
      };
      this.userService.editPassword(passchangeInfo).subscribe(
        (res: any) => {
          this.userService.formChangePassModal.reset();
          this.submitted = false;
          this.alertify.success('Operation Successfully!');
        },
        err => {
          this.alertify.error(err + 'Error, Operation Failed!');
        }
      );
    } else {
      return;
    }
  }

}
