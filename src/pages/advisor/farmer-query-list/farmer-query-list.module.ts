import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerQueryListPage } from './farmer-query-list';

@NgModule({
  declarations: [
    FarmerQueryListPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerQueryListPage),
  ],
})
export class FarmerQueryListPageModule {}
