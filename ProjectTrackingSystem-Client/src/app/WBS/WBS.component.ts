import { WBSEditModalComponent } from './../WBSModals/WBSEditModal/WBSEditModal.component';
import { ProjectService } from 'src/app/_services/project.service';
import { WBSService } from './../_services/WBS.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { WBS } from '../_models/WBS';
import { User } from '../_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WBSAddModalComponent } from '../WBSModals/WBSAddModal/WBSAddModal.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-WBS-list',
  templateUrl: './WBS.component.html',
  styleUrls: ['./WBS.component.css']
})
export class WBSComponent implements OnInit {
  bsModalRef: BsModalRef;
  searchParams: any = {};
  user: User = JSON.parse(localStorage.getItem('user'));
  WBSList: WBS[];
  FilteredWBSList: WBS[];
  projectList: any[];
  showWBSListDiv:boolean = false;
  constructor(private WBSService: WBSService, private alertify: AlertifyService,
              private modalService: BsModalService,
              private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    // populate the projectList
    this.loadProjects(this.user.programId);
    this.searchParams.projectId = null;
    // this.loadWBSes();
  }
loadWBSes() {
  // console.log(this.searchParams.projectId);
  this.WBSService.getWBSes(this.searchParams.projectId)
  .subscribe((res: WBS[]) => {
    this.WBSList = res;
    this.FilteredWBSList = res;
    this.showWBSListDiv = true;
    // console.log(res);
}, error => {
  this.alertify.error(error);
});
}
loadProjects(programmeId: number) {
  this.projectService.getProjectsByProgramme(programmeId).subscribe((projects: any[]) => {
    this.projectList = projects;
    // console.log(this.projectList);
  }, error => {
    console.log(error);
  });
}
openAddNewModal() {
  const initialState = {
    list: [
    ],
    title: 'Add New WBS',
    projectId: this.searchParams.projectId
  };
  this.bsModalRef = this.modalService.show(WBSAddModalComponent, {initialState});
  this.bsModalRef.content.closeBtnName = 'Close';
  this.bsModalRef.content.updateTable.subscribe((values) => {
    this.loadWBSes();
    });
}
editWBS(wbs) {
  const initialState = {
    wbs,
    title: 'Edit WBS'
  };
  this.bsModalRef = this.modalService.show(WBSEditModalComponent, {initialState});
  this.bsModalRef.content.closeBtnName = 'Close';
  this.bsModalRef.content.updateTable.subscribe((values) => {
    this.loadWBSes();
    });
 }
 deleteWBS(id: number) {
  this.alertify.confirm('Warning', 'Are you sure you want to delete this project?', () => {
    this.WBSService.deleteWBS(id).subscribe(() => {
      this.loadWBSes();
      this.alertify.success('WBS has been deleted');
    }, error => {
      this.alertify.error('Failed to delete the WBS');
    });
  });
}
searchWBS(){
  let _WBSId = this.WBSService.searchWBSForm.get('WBSId').value;
  let _WBSName = this.WBSService.searchWBSForm.get('WBSName').value;
  let _Description = this.WBSService.searchWBSForm.get('Description').value;
  let _Budget = this.WBSService.searchWBSForm.get('Budget').value;
  if (_WBSId) {
    this.FilteredWBSList = this.WBSList.filter(w => w.wbsId == _WBSId);
  }
  if (_WBSName) {
    this.FilteredWBSList = this.WBSList.filter(w =>
       w.wbsName.toLowerCase().indexOf(_WBSName.toLowerCase()) !== -1);
  }
  if (_Description) {
    this.FilteredWBSList = this.WBSList.filter(w =>
       w.description.toLowerCase().indexOf(_Description.toLowerCase()) !== -1);
  }
  if (_Budget) {
    this.FilteredWBSList = this.WBSList.filter(w => w.budget >= _Budget);
  }
}
resetSearchWBS(){
  this.FilteredWBSList = this.WBSList;
  this.WBSService.searchWBSForm.reset();
}
}
