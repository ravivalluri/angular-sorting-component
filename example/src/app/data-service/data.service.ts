import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Data } from './Data';
import { SortingValue } from '../ng2-sort-component/SortingValue';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    private dataUrl = 'assets/json/mock-data.json';
    private sortingValuesUrl = 'assets/json/sorting-values.json';
    private data: Data[];

    constructor(private http: Http) {

    }

    getData(): Observable<Data[]> {
        return this.http.get(this.dataUrl)
            .map(data => {
                return this.data = data.json() as Data[];
            });
    }

    getSortingValues(): Observable<SortingValue[]> {
        return this.http.get(this.sortingValuesUrl).map(sortingValues => sortingValues.json() as SortingValue[]);
    }
}
