import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminMainComponent } from './admin/AdminMain/AdminMain.component';
import { TransactionResolver } from './_resolvers/transactions.resolver';
import { TransactionMainComponent } from './ProjectTransactions/TransactionMain/TransactionMain.component';
import { ProjectsComponent } from './Project/projects/projects.component';
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { WBSComponent } from './WBS/WBS.component';
import { AdminGuard } from './_guards/admin.guard';
import { ProfileComponent } from './profile/ProfileMain/profile.component';

export const appRoutes: Routes = [
    {
        path: 'project', component: ProjectsComponent, 
        canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] }},
    {
        path: 'WBS', component: WBSComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] }
    },
    {
        path: 'transactions', component: TransactionMainComponent,
        canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] },
         resolve: {transactions: TransactionResolver}
    },
    {
        path: 'admin', component: AdminMainComponent, canActivate: [AuthGuard, AdminGuard], data: { roles: ['Admin'] }
    },
    {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'DataEntry'] }
    },
    {path: 'home', component: HomeComponent},
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '', component: PageNotFoundComponent, pathMatch: 'full'},
];
