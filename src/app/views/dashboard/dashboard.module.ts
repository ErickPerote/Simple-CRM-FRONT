import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './home/dashboard.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { USERFilterComponent } from './filter/filter.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    }
];


@NgModule({
  declarations: [
    DashboardComponent,
    USERFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgPipesModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DashboardModule {}