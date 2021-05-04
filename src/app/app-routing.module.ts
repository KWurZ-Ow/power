import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { TableComponent } from './table/table.component';
import { TelComponent } from './tel/tel.component';

const routes: Routes = [
  {
    path: "table",
    component: TableComponent
  },
  {
    path: "tel",
    component: TelComponent
  },
  {
    path: "",
    component: AccueilComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
