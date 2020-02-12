import { UserEditModalComponent } from './../Modals/UserEditModal/UserEditModal.component';
import { UserAddModalComponent } from './../Modals/UserAddModal/UserAddModal.component';
import { ProjectService } from './../../_services/project.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { WBSService } from './../../_services/WBS.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
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
  users: any[];
  drProgrammes: any;
  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private userService: UserService,
    public projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getUsers();
    //this.projTransService.searchFormModalTrans.reset();
  }
  getUsers() {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.log(">>>>>>>>>>"+ JSON.stringify(users));
    }, error => {
      console.log(error);
    });
  }

  getProgrammes() {
    this.projectService.getProgrammes().subscribe(
      response => {
        this.drProgrammes = response;
        console.log(this.drProgrammes);
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

}
