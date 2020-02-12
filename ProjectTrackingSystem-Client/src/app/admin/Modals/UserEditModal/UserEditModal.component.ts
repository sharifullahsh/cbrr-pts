import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterUser } from './../../../_models/RegisterUser';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { isArray } from 'util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-projectEditModal',
  templateUrl: './UserEditModal.component.html',
  styleUrls: ['./UserEditModal.component.css']
})
export class UserEditModalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  drProgrammes: any;
  drRoles: any;
  response: any;
  drProvince: any;
  user: any;
  constructor(
    private alertify: AlertifyService,
    private userService: UserService,
    private authServic: AuthService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.userService.formModalUser.reset();
    this.getProgrammes();
    this.getAllRoles();
    this.getProvinces();
    this.setFormValues();
  }
  setFormValues() {   
    this.userService.formEditModalUser
      .get('Id')
      .setValue(this.user.id);
    this.userService.formEditModalUser
      .get('ProgramId')
      .setValue(this.user.programId);
    this.userService.formEditModalUser
      .get('ProvinceId')
      .setValue(this.user.provinceId);
    this.userService.formEditModalUser
      .get('RoleId')
      .setValue(this.user.roleId);
    this.userService.formEditModalUser
      .get('UserName')
      .setValue(this.user.userName);
    this.userService.formEditModalUser
      .get('Password')
      .setValue(this.user.password);
  }
  getProgrammes() {
    this.userService.getProgrammes().subscribe(
      response => {
        this.drProgrammes = response;
        
        const selectedOption = this.drProgrammes.filter(
          programme => programme.programmeName === this.user.programmeName
        )[0];
        console.log("selectedOption is >>>>>>>>>>"+ JSON.stringify(selectedOption));
        this.userService.formEditModalUser
          .get('ProgramId')
          .setValue(selectedOption.id);
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
        const selectedOption = this.drRoles.filter(
          role => role.name === this.user.roleName
        )[0];
        this.userService.formEditModalUser
          .get('RoleId')
          .setValue(selectedOption.id);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getProvinces() {
    this.userService.getProvinces().subscribe(
      response => {
        this.drProvince = response;
        const selectedOption = this.drProvince.filter(
          province => province.provinceName === this.user.provinceName
        )[0];
        this.userService.formEditModalUser
          .get('ProvinceId')
          .setValue(selectedOption.id);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  editUser() {
    this.user = Object.assign(
      {},
      this.userService.formEditModalUser.value
    );
    if (this.userService.formEditModalUser.dirty) {
      this.user.programId = +this.userService.formEditModalUser.get('ProgramId').value;
      this.user.provinceId = +this.userService.formEditModalUser.get('ProvinceId').value;
      this.user.roleId = this.userService.formEditModalUser.get('RoleId').value;
      this.user.userName = this.userService.formEditModalUser.get('UserName').value;

      this.userService.editUser(this.user).subscribe(
        (res: any) => {
          this.userService.formEditModalUser.reset();
          this.alertify.success('User Updated Successfully');
          this.updateTable.emit();
        },
        err => {
          this.alertify.error(err + 'Error, Operation Failed!');
        }
      );
    }
  }
}
