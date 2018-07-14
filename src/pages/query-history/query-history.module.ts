import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QueryHistoryPage } from './query-history';
import { AccordionListComponent } from '../../components/accordion-list/accordion-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QueryHistoryPage,
    AccordionListComponent
  ],
  imports: [
    IonicPageModule.forChild(QueryHistoryPage),
    TranslateModule.forChild()
  ],
  providers: [
    AccordionListComponent
  ]
})
export class QueryHistoryPageModule {}
