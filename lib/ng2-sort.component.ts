import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Ng2SortService } from './ng2-sort-service/ng2-sort.service';
import { SortingValue } from './SortingValue';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ng2-sort-component',
    template: 
    `
    <select [(ngModel)]="selectedSortingValue" [ngClass]="customClasses" (change)="sortData()">
        <option *ngFor="let sortingValue of sortingValues" [ngValue]="sortingValue">{{ sortingValue.label }}</option>
    </select>
    `
})

export class Ng2SortComponent implements OnChanges {
    @Input('defaultSortingValue') selectedSortingValue: SortingValue;
    @Input() sortingValues: SortingValue[];
    @Input() dataToSort: any;
    @Input() customClasses: string;

    constructor(private sortService: Ng2SortService) { }

    sortData(): void {
        this.sortService.sortData(this.selectedSortingValue, this.dataToSort);
    }

    ngOnChanges(): void {
        if (this.selectedSortingValue && this.dataToSort) {
            this.sortData(); // Trigger sort on component initialisation
        } else if(this.selectedSortingValue === undefined && this.sortingValues && this.dataToSort) {
            this.selectedSortingValue = this.sortingValues[0]; // If no default value is given, it will default to the first
            this.sortData();
        }
    }
}
