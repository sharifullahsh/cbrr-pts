import { GeneralService } from './../../../_services/general.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterUser } from './../../../_models/RegisterUser';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';

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
    public alertify: AlertifyService,
    public userService: UserService,
    public authServic: AuthService,
    public bsModalRef: BsModalRef,
    public generalService: GeneralService
  ) {}

  ngOnInit() {
    this.userService.editUserFormModal.reset();
    this.getProgrammes();
    this.getAllRoles();
    this.getProvinces();
    this.setFormValues();
  }
  setFormValues() {
    this.userService.editUserFormModal
      .get('Id')
      .setValue(this.user.id);
    this.userService.editUserFormModal
      .get('ProgramId')
      .setValue(this.user.programId);
    this.userService.editUserFormModal
      .get('ProvinceId')
      .setValue(this.user.provinceId);
    this.userService.editUserFormModal
      .get('RoleId')
      .setValue(this.user.roleId);
    this.userService.editUserFormModal
      .get('UserName')
      .setValue(this.user.userName);
  }
  getProgrammes() {
    this.generalService.getProgrammes().subscribe(
      response => {
        this.drProgrammes = response;
        const selectedOption = this.drProgrammes.filter(
          programme => programme.programmeName === this.user.programmeName
        )[0];
        this.userService.editUserFormModal
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
        this.userService.editUserFormModal
          .get('RoleId')
          .setValue(selectedOption.id);
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
        const selectedOption = this.drProvince.filter(
          province => province.provinceName === this.user.provinceName
        )[0];
        this.userService.editUserFormModal
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
      this.userService.editUserFormModal.value
    );
    if (this.userService.editUserFormModal.dirty) {
      if(this.userService.editUserFormModal.valid){
        this.bsModalRef.hide();
        this.user.programId = +this.userService.editUserFormModal.get('ProgramId').value;
        this.user.provinceId = +this.userService.editUserFormModal.get('ProvinceId').value;
        this.user.roleId = this.userService.editUserFormModal.get('RoleId').value;
        this.user.userName = this.userService.editUserFormModal.get('UserName').value;
        this.bsModalRef.hide();
        this.userService.editUser(this.user).subscribe(
          (res: any) => {
            this.userService.editUserFormModal.reset();
            this.alertify.success('User Updated Successfully');
            this.updateTable.emit();
          },
          err => {
            this.alertify.error(err + 'Error, Operation Failed!');
          }
        );
        return;
      }
      return;
    }
    this.bsModalRef.hide();
  }
}
