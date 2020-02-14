import { GeneralService } from './../../_services/general.service';
import { ProjectService } from './../../_services/project.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-projectAddModal',
  templateUrl: './projectAddModal.component.html',
  styleUrls: ['./projectAddModal.component.css']
})
export class ProjectAddModalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  list: any[] = [];
  loaded = false;
  bsConfig: Partial<BsDatepickerConfig>;
  drProgrammes: any;
  drCurrencies: any;

  constructor(
    public bsModalRef: BsModalRef,
    private alertify: AlertifyService,
    public projectService: ProjectService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    this.projectService.formModalProject.reset();
    this.getProgrammes();
    this.getCurrencies();
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
  getCurrencies() {
    this.projectService.getCurrencies().subscribe(
      response => {
        this.drCurrencies = response;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  addProject() {
    this.projectService.addProject().subscribe(
      (res: any) => {
        this.projectService.formModalProject.reset();
        this.alertify.success('Operation Successfully!');
        this.updateTable.emit();
      },
      err => {
        this.alertify.error(err + 'Error, Operation Failed!');
      }
    );
  }
}
