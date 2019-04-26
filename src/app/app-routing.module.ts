import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//include home component
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
//include role component
import { RoleComponent } from './role/role.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'roles',
    component: RoleComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
  path: 'dashboard',
  component: DashboardComponent 
  },
  { 
  path: 'register', 
  component: RegisterComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
