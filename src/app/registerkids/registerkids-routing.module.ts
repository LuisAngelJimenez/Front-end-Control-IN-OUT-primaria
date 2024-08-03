import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterkidsPage } from './registerkids.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterkidsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterkidsPageRoutingModule {}
