# Angular: Reusable orderBy component using Observables #

## How-to use ##
The easiest way is to use npm. Just type `npm install ng2-sort-component`. Import it

```typescript
import { Ng2SortModule } from './ng2-sort-component/ng2-sort.module';
...

@NgModule({
  declarations: [
    AppComponent
    ...
  ],
  imports: [
    Ng2SortModule
    ...
  ],
  providers: [DataService, ...],
  bootstrap: [AppComponent, ...]
})
```

The Sorting values directive is strongly typed and expects data to come in as follows with a value, a type and a label property.

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
