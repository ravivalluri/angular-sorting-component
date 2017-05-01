# Angular: Reusable orderBy component using Observables #
A fairly simple sorting component for sorting data lists.
## How-to use ##
### 1. Installation ###
```
npm install angular-sorting-component
```
Import the module where needed. If you use SystemJS you first have to import `node_modules/angular-sorting-component/dist/angular-sorting-component.umd.js`. 
```typescript
import { Ng2SortModule } from 'angular-sorting-component';

@NgModule({
  imports: [
    Ng2SortModule
  ]
})
```

### 2. Usage ###

The component needs the `dataToSort` and `sortingValues` directives to function. 

#### Base component ####

```html
<ng2-sort-component [dataToSort]="data" [sortingValues]="sortingValues"></ng2-sort-component>
```

**dataToSort:** *Object[]*
This is the instance that will be sorted.

**sortingValues:** *SortingValue*
Expects an array of values that will be sorted, the label that will be presented and their type.

```typescript
export interface SortingValue {
    value: string;
    type: string;
    label: string;
}
```
#### Optional directives ####
**customClasses:** *string*
Add the classes that you want on the input field.

**defaultSortingValue**: *string*
If no default sorting value is chosen, the component will default to the first item in the sortingValue array.


### 2. Options ###

## Example ##
Install the Angular CLI and run `ng serve` in the example folder to check it out.

```
cd example
npm install
ng serve // npm install angular-cli -g if it's not yet installed
```
