import { MainLayoutComponent } from './components/mainLayout.ts/mainLayout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './config/routeGuard';
import { ClientComponent } from './views/client/client.component';
import { DashboardComponent } from './views/dashboard/home/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'client/:id', component: ClientComponent, canActivate: [RouteGuard] },
  {
    path: 'dashboard', component: MainLayoutComponent, canActivate: [RouteGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
