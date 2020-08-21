# csv-filter-sort

[![npm version](http://img.shields.io/npm/v/csv-filter-sort.svg?style=flat-square)](https://npmjs.org/package/csv-filter-sort "View this project on npm")
![Codecov](https://img.shields.io/codecov/c/github/jameswmoody/csv-filter-sort.svg?style=flat-square)
[![CircleCI](https://circleci.com/gh/jameswmoody/csv-filter-sort.svg?style=svg)](https://circleci.com/gh/jameswmoody/csv-filter-sort)

Filter CSV rows using criteria for column values and save the result as a new CSV.

## Getting Started

To use the csv-filter-sort library, just import it into your project:

```
const csvFilterSort = require('csv-filter-sort');
```

In the example above, the library is imported as `csvFilterSort` through which you can access the library's filter and sort (coming soon!) functions.

### Reference

#### `filter(csv, filterOptions, callback)`

**Parameters:**

| Name            | Type     |
| --------------- | -------- |
| `csv`           | String   |
| `filterOptions` | Object   |
| `callback`      | Function |


**`csv`:** A comma seperated list of values with each comma representing a new column. Use `\n` to represent the end of a row.

```
'Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n'22222,Main St,Chicago,IL,60605'
```

**`filterOptions`:** An object containing options to be included within the filter configuration. Valid options include `hasHeader` (BOOLEAN), `columnToFilter` (STRING or INTEGER), `filterCriteria` (STRING or INTEGER), and `filterType` (STRING).

```
{
    hasHeader: true,
    columnToFilter: 'City',
    filterCriteria: 'Chicago',
    filterType: 'EXACT'
}

OR

{
    hasHeader: false,
    columnToFilter: 2,
    filterCriteria: 10,
    filterType: 'LESS'
}
```

| Name            | Type               | Description                                              | Required | Default   |
| --------------- | ------------------ | -------------------------------------------------------- | -------- | --------- |
| `hasHeader`     | Boolean            | Specfies whether or not the first CSV row is a header. | `false`  | `false`   |
| `columnToFilter`| String or integer  | The column name or number to filter by.                  | `true`   |           |
| `filterCriteria`| String or integer  | The criteria to filter rows by. If string is provided, CSV will be filtered by character length of the value. | `true`   |           |
| `filterType`    | String             | Options include `EXACT`, `LESS`, and `GREATER`.          | `false`  | `'EXACT'` |

#### `sort(csv, sortOptions, callback)`

**Parameters:**

| Name            | Type     |
| --------------- | -------- |
| `csv`           | String   |
| `sortOptions`   | Object   |
| `callback`      | Function |


**`csv`:** A comma seperated list of values with each comma representing a new column. Use `\n` to represent the end of a row.

```
'Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n'22222,Main St,Chicago,IL,60605'
```

**`sortOptions`:** An object containing options to be included within the sort configuration. Valid options include `hasHeader` (BOOLEAN), `sortByColumn` (STRING or INTEGER), `orderBy`, (STRING).

```
{
    hasHeader: true,
    sortByColumn: 'Zip',
    orderBy: 'ASC'
}

OR

{
    hasHeader: false,
    sortByColumn: 4,
    orderBy: 'DESC'
}
```

| Name            | Type               | Description                                              | Required | Default   |
| --------------- | ------------------ | -------------------------------------------------------- | -------- | ------- |
| `hasHeader`     | Boolean            | Specfies whether or not the first CSV row is a header. | `false`  | `false` |
| `sortByColumn`  | String or integer  | The column name or number to sort by.                    | `true`   |         |
| `orderBy`       | String             | Options include `ASC` and `DESC` for ascending and descending respectively.   | `false`  | `'ASC'`   | 

## Examples

```
const csvFilterSort = require('csv-filter-sort');

const csv = 'Address Number,Address Street,City,State,Zip\n' +
            '11111,De Anza Blvd,Cupertino,CA,95014\n' +
            '22222,Main St,Chicago,IL,60605\n' +
            '22211,Michigan Ave,Chicago,IL,60607\n' +
            '33333,Woodward Ave,Detroit,MI,48048\n' +
            '44444,Mission St,San Francisco,CA,95001';

const filterOptions = {
    hasHeader: true,
    columnToFilter: 'City',
    filterCriteria: 'Chicago',
    filterType: 'EXACT'
}

const sortOptions = {
    hasHeader: true,
    sortByColumn: 4,
    orderBy: 'DESC'
}

csvFilterSort.filter(csv, filterOptions, function (err, filteredCsv) {
    if (err) {
        return err;
    }
    return filteredCsv;

    // Output: 'Address Number,Address Street,City,State,Zip\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607'
});

csvFilterSort.sort(csv, sortOptions, function (err, sortedCsv) {
    if (err) {
        return err;
    }
    return sortedCsv;

    // Output: 'Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001\n22211,Michigan Ave,Chicago,IL,60607\n22222,Main St,Chicago,IL,60605\n33333,Woodward Ave,Detroit,MI,48048'
});
```

## Running the tests

In the command line, run `npm run mocha` or `npm run test` to begin the test suite.

## Authors

* **James W Moody** - [jameswmoody](https://github.com/jameswmoody)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
