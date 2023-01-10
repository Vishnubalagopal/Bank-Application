import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  {
    path:"", component:LoginComponent
  },
  {
    path:'dashboard', component:DashboardComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'deposit', component:DepositComponent
  },
  {
    path:'withdraw',component:WithdrawComponent
  },
  {
    path:'transaction',component:TransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
