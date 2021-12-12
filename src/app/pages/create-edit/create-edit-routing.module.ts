import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditPage } from './create-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditPageRoutingModule {}
