import { GeneralService } from './../../_services/general.service';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { ProjectTransactionService } from './../../_services/projectTransaction.service';
import { Transaction } from './../../_models/transaction';
import { ProjectService } from 'src/app/_services/project.service';
import { WBSService } from './../../_services/WBS.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Project } from '../../_models/project';
import { WBS } from '../../_models/WBS';
import { TransAddModalComponent } from '../Modals/TransAddModal/TransAddModal.component';
import { TransEditModalComponent } from '../Modals/TransEditModal/TransEditModal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-TransactionMain',
  templateUrl: './TransactionMain.component.html',
  styleUrls: ['./TransactionMain.component.css']
})
export class TransactionMainComponent implements OnInit {
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  bsModalRef: BsModalRef;
  pagination: Pagination;
  selectedRow: number;
  searchParams: any = {};
  user: User = JSON.parse(localStorage.getItem('user'));
  transactionList: Transaction[];
  WBSList: any[];
  projectList: any[];
  transId: number;
  showTrnsactionDiv:boolean = false;
  showTrnsactionEventsDiv:boolean = false;
  drTransactionType: any;
  drProvince: any;
  trans: Transaction;
  constructor(
    private WBSService: WBSService,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private projTransService: ProjectTransactionService,
    private generalService: GeneralService
  ) {}
  ngOnInit() {
    this.loadProjects();
    this.getTransTypes();
    this.getProvinces();
    this.searchParams.projectId = null;
    this.searchParams.wbsId = null;
    this.route.data.subscribe(data => {
      this.transactionList = data.transactions.result;
      this.pagination = data.transactions.pagination;
      this.transId = 0;
    });
    this.pagination.itemsPerPage = 5;
    this.projTransService.searchFormModalTrans.reset();
  }
  getTransTypes() {
    this.projTransService.getTransTypes().subscribe(
      response => {
        this.drTransactionType = response;
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
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  showTransEvents(id, index)
  {
    this.transId = id;
    this.selectedRow = index;
    if (index !== -1) {
      this.showTrnsactionEventsDiv = true;
    }
  }

  loadProjects() {
    this.projectService.getProjectsByProgramme(this.user.programId).subscribe(
      (res: Project[]) => {
        this.projectList = res;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  loadWBSes() {
    this.WBSService.getWBSes(this.searchParams.projectId).subscribe(
      (res: WBS[]) => {
        this.WBSList = res;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  loadTrans() {
    this.projTransService
    .getTransactions(this.searchParams.wbsId, this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<Transaction[]>) => {
      this.transactionList = res.result;
      this.pagination = res.pagination;
      this.showTransEvents(0, -1);
      this.showTrnsactionDiv = true;

  }, error => {
    this.alertify.error(error);
  });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.showTransEvents(0, -1);
    this.loadTrans();
  }

  editTransaction(trans) {
    const initialState = {
      trans,
      title: 'Edit Transaction'
    };
    this.bsModalRef = this.modalService.show(TransEditModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.loadTrans();
      });
   }
   openAddModal() {
    const initialState = {
      list: [
      ],
      title: 'Add New Transaction',
      wbsId: this.searchParams.wbsId
    };
    this.bsModalRef = this.modalService.show(TransAddModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.loadTrans();
      });
  }

   deleteTransaction(id) { }

   searchTransaction(){
    this.loadTrans();
   }
   resetSearchTransaction(){
        this.projTransService.searchFormModalTrans.reset();
        this.loadTrans();
   }

}
