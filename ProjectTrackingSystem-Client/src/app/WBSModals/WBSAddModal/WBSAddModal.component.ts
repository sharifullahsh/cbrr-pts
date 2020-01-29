import { WBSService } from './../../_services/WBS.service';
import { ProjectService } from './../../_services/project.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-WBSAddModal',
  templateUrl: './WBSAddModal.component.html',
  styleUrls: ['./WBSAddModal.component.css']
})
export class WBSAddModalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  list: any[] = [];
  loaded = false;
  projectId: any;

  constructor(public bsModalRef: BsModalRef,
              private alertify: AlertifyService,
              public WBSService: WBSService) { }

  ngOnInit() {
    this.WBSService.formModalWBS.reset();
  }
  addWBS() {
    this.WBSService.addWBS(this.projectId).subscribe(
      (res: any) => {
        this.WBSService.formModalWBS.reset();
        this.alertify.success('Operation Successfully!');
        this.updateTable.emit();
      },
      err => {
        this.alertify.error(err + 'Error, Operation Failed!');
      }
    );
  }
}
