import { Project } from './../../_models/project';
import { ProjectService } from './../../_services/project.service';
import { ProjectAddModalComponent } from './../projectAddModal/projectAddModal.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../_services/alertify.service';
import { ProjectEditModalComponent } from '../projectEditModal/projectEditModal.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  bsModalRef: BsModalRef;

  constructor(private http: HttpClient, private alertify: AlertifyService,
              public projectService: ProjectService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    }, error => {
      console.log(error);
    });
  }
  openModalWithComponent() {
    const initialState = {
      list: [
      ],
      title: 'Add New Proince'
    };
    this.bsModalRef = this.modalService.show(ProjectAddModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.getProjects();
      });
  }

  editProject(project) {
    const initialState = {
      project,
      title: 'Edit Project'
    };
    this.bsModalRef = this.modalService.show(ProjectEditModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.getProjects();
      });
   }
   deleteProject(id: number) {
    this.alertify.confirm('Warning', 'Are you sure you want to delete this project?', () => {
      this.projectService.deleteProject(id).subscribe(() => {
        this.getProjects();
        this.alertify.success('Project has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the project');
      });
    });
  }
}
