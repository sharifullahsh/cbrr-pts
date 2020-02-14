import { GeneralService } from './../../_services/general.service';
import { RegisterUser } from './../../_models/RegisterUser';
import { UserEditModalComponent } from './../Modals/UserEditModal/UserEditModal.component';
import { UserAddModalComponent } from './../Modals/UserAddModal/UserAddModal.component';
import { ProjectService } from './../../_services/project.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-AdminMain',
  templateUrl: './AdminMain.component.html',
  styleUrls: ['./AdminMain.component.css']
})
export class AdminMainComponent implements OnInit {
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  bsModalRef: BsModalRef;
  selectedRow: number;
  searchParams: any = {};
  users: RegisterUser[];
  FilteredUsersList: RegisterUser[];
  drProgrammes: any;
  drProvince: any;
  drRoles: any;
  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private userService: UserService,
    public projectService: ProjectService,
    public generalService: GeneralService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getProvinces();
    this.getProgrammes();
    this.getAllRoles();
    this.userService.searchFormModalUser.reset();
  }
  getUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
      this.FilteredUsersList = users;

    }, error => {
      console.log(error);
    });
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

  openModalWithComponent() {
    const initialState = {
      list: [
      ],
      title: 'Add New User'
    };
    this.bsModalRef = this.modalService.show(UserAddModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.getUsers();
      });
  }

  editUser(user) {
    const initialState = {
      user,
      title: 'Edit Project'
    };
    this.bsModalRef = this.modalService.show(UserEditModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.getUsers();
      });
   }
   deleteUser(id: number) {
    this.alertify.confirm('Warning', 'Are you sure you want to delete this User?', () => {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers();
        this.alertify.success('User has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the User');
      });
    });
  }
  resetUserPassword(id: number) {
    this.alertify.confirm('Warning', 'Are you sure you want to reset this user password?', () => {
      this.userService.resetPassword(id).subscribe(() => {
        this.alertify.success('User password reset successfully.');
      }, error => {
        this.alertify.error('Failed to reset user password');
      });
    });
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
  searchUser() {
    this.FilteredUsersList = this.users;
    const programmeId = this.userService.searchFormModalUser.get('ProgrammeId').value;
    const userName = this.userService.searchFormModalUser.get('Name').value;
    const roleId = this.userService.searchFormModalUser.get('RoleId').value;
    const provinceId = this.userService.searchFormModalUser.get('ProvinceId').value;
    if (programmeId) {
      this.FilteredUsersList = this.FilteredUsersList.filter(u => u.programId == programmeId);
    }
    if (userName) {
      this.FilteredUsersList = this.FilteredUsersList.filter(u =>
         u.userName.toLowerCase().indexOf(userName.toLowerCase()) !== -1);
    }
    if (provinceId) {
      this.FilteredUsersList = this.FilteredUsersList.filter(u => u.provinceId == provinceId);
    }
    if (roleId) {
      this.FilteredUsersList = this.FilteredUsersList.filter(u => u.roleId == roleId);
    }
  }
  resetSearchUser() {
    this.FilteredUsersList = this.users;
    this.userService.searchFormModalUser.reset();
  }

}
