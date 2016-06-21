import orderBy from 'lodash/orderBy';
import reverse from 'lodash/reverse';
import { expect } from 'chai';
import byColumns from '../../src/sort/byColumns';

describe('byColumns', function () {
  it('sorts ascending by default', function () {
    const sortingColumns = null;
    const selectedColumn = 'test';

    const expected = [
      {
        property: selectedColumn,
        sort: 'asc',
      },
    ];
    const result = byColumns(sortingColumns, selectedColumn);

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending by default with an empty array', function () {
    const sortingColumns = [];
    const selectedColumn = 'test';

    const expected = [
      {
        property: selectedColumn,
        sort: 'asc',
      },
    ];
    const result = byColumns(sortingColumns, selectedColumn);

    expect(result).to.deep.equal(expected);
  });

  it('sorts descending if ascending the same first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: selectedColumn,
      sort: 'asc',
    }];

    const expected = [
      {
        property: selectedColumn,
        sort: 'desc',
      },
    ];
    const result = byColumns(sortingColumns, selectedColumn);

    expect(result).to.deep.equal(expected);
  });

  it('removes sorting if descending the same first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: selectedColumn,
      sort: 'desc',
    }];

    const expected = [];
    const result = byColumns(sortingColumns, selectedColumn);

    expect(result).to.deep.equal(expected);
  });

  it('sorts ascending if ascending another one first', function () {
    const selectedColumn = 'test';
    const sortingColumns = [{
      property: 'another',
      sort: 'asc',
    }];

    const expected = sortingColumns.concat([
      {
        property: selectedColumn,
        sort: 'asc',
      },
    ]);
    const result = byColumns(sortingColumns, selectedColumn);

    expect(result).to.deep.equal(expected);
  });
});

describe('byColumn.sort', function () {
  it('sorts ascending', function () {
    const data = [
      {
        test: 'abc',
      },
      {
        test: 'def',
      },
    ];
    const sortingColumns = [{
      property: 'test',
      sort: 'asc',
    }];

    const result = byColumns.sort(data, sortingColumns, orderBy);

    expect(result).to.deep.equal(data);
  });

  it('sorts descending', function () {
    const data = [
      {
        test: 'abc',
      },
      {
        test: 'def',
      },
    ];
    const sortingColumns = [{
      property: 'test',
      sort: 'desc',
    }];

    const result = byColumns.sort(data, sortingColumns, orderBy);

    expect(result).to.deep.equal(reverse(data));
  });

  it('returns data if there is no sorting information', function () {
    const data = [
      {
        test: 'abc',
      },
      {
        test: 'def',
      },
    ];
    const result = byColumns.sort(data, null, orderBy);

    expect(result).to.deep.equal(data);
  });

  it('returns data if there sorting information is missing', function () {
    const data = [
      {
        test: 'abc',
      },
      {
        test: 'def',
      },
    ];
    const result = byColumns.sort(data, [], orderBy);

    expect(result).to.deep.equal(data);
  });
});