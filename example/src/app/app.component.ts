import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2SortService } from './ng2-sort-component/ng2-sort-service/ng2-sort.service';
import { DataService } from './data-service/data.service';
import { Ng2SortComponent } from './ng2-sort-component/ng2-sort.component';
import { Data } from './data-service/Data';
import { SortingValue } from './ng2-sort-component/SortingValue';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  data: Data[];
  sortingValues: any;
  defaultSortingValue: SortingValue;
  @ViewChild(Ng2SortComponent) sortComponent;

  constructor(private sortService: Ng2SortService, private dataService: DataService) {
  }

  getData(): void {
    this.dataService.getData().subscribe(data => {
        this.data = data;
    });
  }

  getSortingValues(): void {
        this.dataService.getSortingValues().subscribe(sortingvalues => {
            this.sortingValues = sortingvalues;
            // this.defaultSortingValue = this.sortingValues[3];
        });
    }

  ngOnInit() {
    this.getData();
    this.getSortingValues();
  }
}
