import { Injectable } from '@angular/core';
import { SortingValue } from '../SortingValue';

import 'rxjs/add/operator/map';

@Injectable()
export class Ng2SortService {
    sortData(sortingValue: SortingValue, dataToSort: any): void {
        let reverseSortingOrder = false;
        let sortingValueTemp = sortingValue.value;

        if (sortingValueTemp.indexOf('-') === 0) { // Check if the sortingValue is to be reversed
            sortingValueTemp = sortingValueTemp.substr(1, sortingValueTemp.length); // Remove the minus from the sortingValue
            reverseSortingOrder = true;
        }

        dataToSort.sort((a: any, b: any) => { // Sort data regularly
            let compareA = a[sortingValueTemp]; // Without comparators the observables will be overwritten when manipulated
            let compareB = b[sortingValueTemp];

            if (!compareA) { // if A is undefined, move it to bottom
                return 1;
            } else if (!compareB) { // if B is undefined move it to bottom
                return -1;
            }

            if (sortingValue.type === 'string') {
                if (compareA) {
                    compareA = compareA.toLowerCase();
                }

                if (compareB) {
                    compareB = compareB.toLowerCase();
                }
            } else if (sortingValue.type === 'date') {
                if (compareA) {
                    compareA = new Date(compareA).getTime();
                }

                if (compareB) {
                    compareB = new Date(compareB).getTime();
                }
            }

            if (!reverseSortingOrder) { // Will return the data as normal
                if (compareA < compareB) {
                    return -1;
                } else if (compareA > compareB) {
                    return 1;
                } else {
                    return 0;
                };
            } else { // Will return the data in a reverse order
                if (compareA < compareB) {
                    return 1;
                } else if (compareA > compareB) {
                    return -1;
                } else {
                    return 0;
                };
            }
        });
    }
}
