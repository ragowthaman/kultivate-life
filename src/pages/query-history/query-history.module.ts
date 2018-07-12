import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QueryHistoryPage } from './query-history';
import { AccordionListComponent } from '../../components/accordion-list/accordion-list';

@NgModule({
  declarations: [
    QueryHistoryPage,
    AccordionListComponent
  ],
  imports: [
    IonicPageModule.forChild(QueryHistoryPage),
  ],
  providers: [
    AccordionListComponent
  ]
})
export class QueryHistoryPageModule {}
