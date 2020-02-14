import { GeneralService } from './../../_services/general.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig, BsModalRef } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProjectService } from 'src/app/_services/project.service';
import { Project } from 'src/app/_models/project';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-projectEditModal',
  templateUrl: './projectEditModal.component.html',
  styleUrls: ['./projectEditModal.component.css']
})
export class ProjectEditModalComponent implements OnInit {
  @Output() updateTable = new EventEmitter();
  title: string;
  closeBtnName: string;
  list: any[] = [];
  loaded = false;
  bsConfig: Partial<BsDatepickerConfig>;
  drProgrammes: any;
  drCurrencies: any;
  project: Project;

  constructor(
    public bsModalRef: BsModalRef,
    private alertify: AlertifyService,
    public projectService: ProjectService,
    public generalService: GeneralService
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    this.projectService.formEditModalProject.reset();
    this.getProgrammes();
    this.getCurrencies();
    this.setFormValues();
  }
  setFormValues() {
    this.projectService.formEditModalProject
      .get('Id')
      .setValue(this.project.id);
    this.projectService.formEditModalProject
      .get('ProjectCode')
      .setValue(this.project.projectCode);
    this.projectService.formEditModalProject
      .get('ProjectName')
      .setValue(this.project.projectName);
    this.projectService.formEditModalProject
      .get('Budget')
      .setValue(this.project.budget);
    this.projectService.formEditModalProject
      .get('StartDate')
      .setValue(this.project.startDate);
    this.projectService.formEditModalProject
      .get('EndDate')
      .setValue(this.project.endDate);
  }
  getProgrammes() {
    this.generalService.getProgrammes().subscribe(
      response => {
        this.drProgrammes = response;
        const selectedOption = this.drProgrammes.filter(
          programme => programme.programmeName === this.project.programme
        )[0];
        this.projectService.formEditModalProject
          .get('Programme')
          .setValue(selectedOption.id);
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
        const selectedOption = this.drCurrencies.filter(
          currency => currency.currencyName === this.project.currency
        )[0];
        this.projectService.formEditModalProject
          .get('Currency')
          .setValue(selectedOption.id);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  editProject() {
    // this.project.startDate= this.TrasnformDate(this.formEditModalProject.value.StartDate),
    this.project = Object.assign(
      {},
      this.projectService.formEditModalProject.value
    );
    if (this.projectService.formEditModalProject.dirty) {
      this.project.currencyId = +this.projectService.formEditModalProject.get('Currency').value;
      this.project.programmeId = +this.projectService.formEditModalProject.get('Programme').value;
      this.projectService.editProject(this.project).subscribe(
        (res: any) => {
          this.projectService.formEditModalProject.reset();
          this.alertify.success('Project Updated Successfully');
          this.updateTable.emit();
        },
        err => {
          this.alertify.error(err + 'Error, Operation Failed!');
        }
      );
    }
  }
  TrasnformDate(MyDate) {
    // return formatDate(MyDate, 'yyyy-MM-dd', 'en');
    // return this.datePipe.transform(MyDate, 'yyyy-MM-dd'); // date formatter
  }
}
