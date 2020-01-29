import { Transaction } from './../_models/transaction';
import { WBS } from './../_models/WBS';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectTransactionService {
  baseUrl = environment.apiUrl;
  // tslint:disable-next-line: no-output-native
  @Output() click: EventEmitter<boolean> = new EventEmitter();
  constructor(private http: HttpClient, private fb: FormBuilder) {}
  formModalTrans = this.fb.group({
    Id: [''],
    WBSId: ['', Validators.required],
    TransactionTypeId: ['', Validators.required],
    Description: ['', Validators.required],
    TransactionDate: ['', Validators.required],
    Amount: ['', Validators.required],
    CurrencyId: [''],
    ExchangeRate: [''],
    ProvinceId: ['']
    });

  formEditModalTrans = this.fb.group({
    Id: [''],
    WBSId: ['', Validators.required],
    TransactionTypeId: ['', Validators.required],
    Description: ['', Validators.required],
    TransactionDate: ['', Validators.required],
    Amount: ['', Validators.required],
    CurrencyId: [''],
    ExchangeRate: [''],
    ProvinceId: ['']
  });
  addTrans(wbsId: number | string) {
    const formData = {
      transactionTypeId: this.formModalTrans.value.TransactionTypeId,
      description: this.formModalTrans.value.Description,
      transactionDate: this.formModalTrans.value.TransactionDate,
      amount: this.formModalTrans.value.Amount,
      currencyId: this.formModalTrans.value.CurrencyId,
      provinceId: this.formModalTrans.value.ProvinceId,
      exchangeRate: this.formModalTrans.value.ExchangeRate,
      wbsId
    };
    console.log(formData);
    return this.http.post(this.baseUrl + 'ProjectTransaction/AddTransaction', formData);
  }
  editTrans(trans: Transaction) {
    console.log(trans);
    return this.http.post(this.baseUrl + 'ProjectTransaction/EditTransaction', trans);
 }

 deleteTrans(id: string | number) {
  return  this.http.post(this.baseUrl + 'WBS/RemoveWBS/' + id, {});
}
getTransactions(wbsId: string | number, page?, itemsPerPage?): Observable<PaginatedResult<Transaction[]>> {
  const paginatedResult: PaginatedResult<Transaction[]> = new PaginatedResult<Transaction[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
  return this.http.get<Transaction[]>(this.baseUrl + 'ProjectTransaction/GetTransactions/' + wbsId, { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );

  // return this.http.get(this.baseUrl + 'ProjectTransaction/GetTransactions/' + wbsId);
}
getTransTypes() {
  return this.http.get(this.baseUrl + 'lookup/GetTransTypes');
}
getProvinces() {
  return this.http.get(this.baseUrl + 'lookup/GetProvinces');
}
}
