import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2SortModule } from './ng2-sort-component/ng2-sort.module';
import { DataService } from './data-service/data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SortModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
