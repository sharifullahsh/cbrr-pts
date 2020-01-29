import { TransactionEventsService } from './../../_services/transactionEvents.service';
import { TransactionEvents } from './../../_models/transactionEvents';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { TransEventAddModalComponent } from '../Modals/TransEventAddModal/TransEventAddModal.component';
import { HttpEventType } from '@angular/common/http';
import { TransEventEditModalComponent } from '../Modals/TransEventEditModal/TransEventEditModal.component';

@Component({
  selector: 'app-TransactionEvents',
  templateUrl: './TransactionEvents.component.html',
  styleUrls: ['./TransactionEvents.component.css']
})
export class TransactionEventsComponent implements OnInit, OnChanges {
  @Input() transactionId: any;
  bsModalRef: BsModalRef;
  pagination: Pagination;
  transactionEventsList: TransactionEvents[];

  constructor(
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private transEventService: TransactionEventsService
  ) {}

  ngOnInit() {}

  loadTransEvent() {
    this.transEventService
    .getTransEvents(this.transactionId)
    .subscribe((res: TransactionEvents[]) => {
      this.transactionEventsList = res;
      console.log('events Data', res);
  }, error => {
    this.alertify.error(error);
  });
  }
  ngOnChanges() {
    console.log(this.transactionId);
    this.loadTransEvent();
  }

  editTransEvent(transEvent)  {
    const initialState = {
      transEvent,
      title: 'Edit Transaction Event'
    };
    this.bsModalRef = this.modalService.show(TransEventEditModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.loadTransEvent();
      });
  }

  deleteTransEvent(id) {}

  openAddModal() {
    const initialState = {
      list: [
      ],
      title: 'Add New',
      transId: this.transactionId
    };
    this.bsModalRef = this.modalService.show(TransEventAddModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.updateTable.subscribe((values) => {
      this.loadTransEvent();
      });
  }
  download(fileName) {
    this.transEventService.downloadFile(fileName).subscribe(
      data => {
        if (data.type === HttpEventType.Response) {
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
        }
      },
      error => {
        this.alertify.error('Failed to download the document');
      }
    );
  }
}