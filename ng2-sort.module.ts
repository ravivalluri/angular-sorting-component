import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2SortComponent } from './ng2-sort.component';
import { Ng2SortService } from './ng2-sort-service/ng2-sort.service';

@NgModule({
  declarations: [
    Ng2SortComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
      Ng2SortComponent
  ],
  providers: [Ng2SortService]
})
export class Ng2SortModule { }
