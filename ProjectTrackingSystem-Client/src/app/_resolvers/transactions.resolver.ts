import { ProjectTransactionService } from './../_services/projectTransaction.service';
import { Transaction } from './../_models/transaction';
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TransactionResolver implements Resolve<Transaction[]> {
    pageNumber = 1;
    pageSize = 1;
    constructor(private transService: ProjectTransactionService, private router: Router,
                private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Transaction[]> {
        return this.transService.getTransactions(0, this.pageNumber, this.pageSize)
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
