import { AdminMainComponent } from './admin/AdminMain/AdminMain.component';
import { TransactionResolver } from './_resolvers/transactions.resolver';
import { TransactionMainComponent } from './ProjectTransactions/TransactionMain/TransactionMain.component';
import { ProjectsComponent } from './Project/projects/projects.component';
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { WBSComponent } from './WBS/WBS.component';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'project', component: ProjectsComponent},
    {path: 'WBS', component: WBSComponent},
    {path: 'transactions', component: TransactionMainComponent, resolve: {transactions: TransactionResolver}},
    {path: 'admin', component: AdminMainComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: []
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
