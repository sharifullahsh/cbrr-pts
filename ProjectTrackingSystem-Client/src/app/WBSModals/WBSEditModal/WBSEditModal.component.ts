import { WBSService } from './../../_services/WBS.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { WBS } from 'src/app/_models/WBS';

@Component({
  selector: 'app-WBSEditModal',
  templateUrl: './WBSEditModal.component.html',
  styleUrls: ['./WBSEditModal.component.css']
})
export class WBSEditModalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  list: any[] = [];
  loaded = false;
  wbs: WBS;

  constructor(public bsModalRef: BsModalRef,
              private alertify: AlertifyService,
              public WBSService: WBSService) { }

  ngOnInit() {
    this.WBSService.formEditModalWBS.reset();
    this.setFormValues();
  }
  setFormValues() {
    this.WBSService.formEditModalWBS
      .get('Id')
      .setValue(this.wbs.id);
    this.WBSService.formEditModalWBS
      .get('WBSId')
      .setValue(this.wbs.wbsId);
    this.WBSService.formEditModalWBS
      .get('WBSName')
      .setValue(this.wbs.wbsName);
    this.WBSService.formEditModalWBS
      .get('Description')
      .setValue(this.wbs.description);
    this.WBSService.formEditModalWBS
      .get('Budget')
      .setValue(this.wbs.budget);
    this.WBSService.formEditModalWBS
      .get('Target')
      .setValue(this.wbs.target);
    this.WBSService.formEditModalWBS
      .get('UnitCost')
      .setValue(this.wbs.unitCost);
    this.WBSService.formEditModalWBS
      .get('ProjectId')
      .setValue(this.wbs.projectId);
  }

  editWBS() {
    // this.project.startDate= this.TrasnformDate(this.formEditModalWBS.value.StartDate),
    this.wbs = Object.assign(
      {},
      this.WBSService.formEditModalWBS.value
    );
    console.log(this.wbs);
    if (this.WBSService.formEditModalWBS.dirty) {
      this.WBSService.editWBS(this.wbs).subscribe(
        (res: any) => {
          this.WBSService.formEditModalWBS.reset();
          this.alertify.success('Project Updated Successfully');
          this.updateTable.emit();
        },
        err => {
          this.alertify.error(err + 'Error, Operation Failed!');
        }
      );
    }
  }
}
