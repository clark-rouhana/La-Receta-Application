import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEditPageRoutingModule } from './create-edit-routing.module';

import { CreateEditPage } from './create-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEditPageRoutingModule
  ],
  declarations: [CreateEditPage]
})
export class CreateEditPageModule {}
