# Angular: Reusable orderBy component using Observables #

## Tutorial ##

Because there are serious performance issues with using an orderBy pipe, the Angular documentation recommends using a dedicated function either in the component or in a service to do sorting. This tutorial tries do achieve this by using Observables. If you're not familiar with Observables then I would recommend watching [this video](https://egghead.io/lessons/javascript-introducing-the-observable). 

First let's make an analysiss of what our component has to do. 
```
- Sort a datalist depending on the selected sorting value
- Update the view whenever the sorting value is changed
- Allow different sorting values to dynamically be options
- Have an option for a default value
```

Let's set up the architecture with generic `app.component` that gets some mock data from a generic `data.service`. The Ng2SortComponent will need a module, a component and a service that will to the sorting with strongly typed sorting values. The architecture should look something like this:

```
app
└───folder1
    app.component.html
    app.component.ts
    └───data-service
        │   ng2-sort.component.html
        │   ng2-sort.component.ts
    └───ng2-sort-component
        │   ng2-sort.component.html
        │   ng2-sort.component.ts
        │   ng2-sort.module.ts
        |   SortingValue.ts
        └───ng2-sort-service
            |   ng2-sort-service.ts
```

This data has to be an Observable as seen in the snippet below. Don't forget to import the necessary rxjs statements. I'm using a .json with mock data from [Mockaroo](https://www.mockaroo.com/). It's also a good practice to get the sorting values in a data-driven way. The Ng2SortComponent expects SortingValues to have a value, a label and a type. This makes the sorting process less prone to errors than if we were to send primitive data and check whether strings are datestrings. 

`data.service.ts`
```typescript
    import { Observable } from 'rxjs/observable';
    import 'rxjs/add/operator/map';
    ...

    private dataUrl = 'assets/json/mock-data.json';
    private sortingValuesUrl = 'assets/json/sorting-values.json';

    constructor(private http: Http) {}

    getData(): Observable<Data[]> {
        return this.http.get(this.dataUrl)
            .map(data => {
                return this.data = data.json() as Data[];
            });
    }

    getSortingValues(): Observable<SortingValue[]> {
        return this.http.get(this.sortingValuesUrl).map(sortingValues => sortingValues.json() as SortingValue[]);
    }
```

`sorting-values.json`
```json
[
    {"value" : "appName", "type" : "string", "label": "App Name"},
    {"value" : "-appName", "type" : "string", "label": "App Name Reversed"},
    {"value" : "releaseDate", "type" : "date", "label": "Release Date"},
    {"value" : "-releaseDate", "type" : "date", "label": "Release Date Reversed"},
    {"value" : "netWorth", "type" : "number", "label": "Net Worth"},
    {"value" : "-netWorth", "type" : "number", "label": "Net Worth Reversed"}
]
```

The sorting component will want to receive three directives: The data we want to sort, the different sorting values and a default value to be sorted on. The datalist is represented below using `*ngFor`. In this tutorial the basic styling is done using Bootstrap. 

`app.component.html`
```html
    <div class="col-lg-12">
        <ng2-sort-component [sortingValues]="sortingValues" [defaultSortingValue]="defaultSortingValue" [dataToSort]="data" class="float-right"></ng2-sort-component>
    </div>
    <ul class="col-lg-12">
        <li *ngFor="let item of data">
            <h5>{{ item.appName }}</h5>
            <p><strong>ReleaseDate:</strong> {{ item.releaseDate | date }}</p>
            <p><strong>Net Worth:</strong> {{ item.netWorth | currency }}</p>
            <hr>
        </li>
    </ul>
```

Our `ng2-sort-component` is no more than a simple select input. Whenever the values are changed the sortData function will be called.

`ng2-sort-component.html`
```html
<select [(ngModel)]="selectedSortingValue" class="form-control" (change)="sortData()">
    <option *ngFor="let sortingValue of sortingValues" [ngValue]="sortingValue">{{ sortingValue.label }}</option>
</select>
```

So that the component immediately starts working on initialisation ngOnChanges lifecycle hook has to be implement. This should not be confused with the change event listener on the component. This lifecycle hook only triggers when data is bound or directives are changed. In this case it will trigger three times so we only want the sorting function to run when the default sorting value has been bound.

`ng2-sort-component.ts`
```typescript
    @Input('defaultSortingValue') selectedSortingValue: SortingValue;
    @Input() sortingValues: SortingValue[];
    @Input() dataToSort: any;

    constructor(private sortService: Ng2SortService) { }

    sortData(): void {
        this.sortService.sortData(this.selectedSortingValue, this.dataToSort);
    }

    ngOnChanges(): void {
        if (this.selectedSortingValue) {
            this.sortData(); // Trigger sort on component initialisation
        }
    }
```

The sortData function is stored in a seperate service. This is not necessary but it keeps the code cleaner in my opinion. This function will first check whether it has to reverse the sorting order or not. Then it checks the type to see whether there should be any mutations done to the values and lastly it will do the sorting either regular or reversed. 

`ng2-sort.service.ts`
```typescript
sortData(sortingValue: SortingValue, dataToSort: any): void {
        let reverseSortingOrder = false;

        if (sortingValue.value.indexOf('-') === 0) { // Check if the sortingValue is to be reversed
            sortingValue.value = sortingValue.value.substr(1, sortingValue.value.length); // Remove the minus from the sortingValue
            reverseSortingOrder = true;
        }

        dataToSort.sort((a: any, b: any) => { // Sort data regularly
            let compareA = a[sortingValue.value]; // Without comparators the observables will be overwritten when manipulated
            let compareB = b[sortingValue.value];

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
```

As a final step the Ng2Component is exported from the module so that it can be used anywhere with a simple import.

`ng2-sort.module.ts`
```typescript
@NgModule({
  declarations: [
    Ng2SortComponent,
  ],
  imports: [
    ...
  ],
  exports: [
      Ng2SortComponent
  ],
  providers: [Ng2SortService]
})
```

As a final step it's probably a good idea to write some tests for our component. Of course, writing tests after the face goes against every principle of test-driven development but okay.
