/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const assert = require('assert');
const chai = require('chai');

const { expect } = chai;

const csvFilter = require('..').filter;

describe('CSV filter function', () => {
  let csv;

  beforeEach(() => {
    csv = 'Address Number,Address Street,City,State,Zip\n'
        + '11111,De Anza Blvd,Cupertino,CA,95014\n'
        + '22222,Main St,Chicago,IL,60605\n'
        + '22211,Michigan Ave,Chicago,IL,60607\n'
        + '33333,Woodward Ave,Detroit,MI,48048\n'
        + '44444,Mission St,San Francisco,CA,95001\n';
  });

  it('should filter CSV based on critria when column name is provided', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: 'City',
      filterCriteria: 'Chicago',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607');
      done();
    });
  });

  it('should filter CSV based on critria when column number string is provided', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: '4',
      filterCriteria: 'CA',
      filterType: 'EXACT',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should filter CSV based on critria when column number integer is provided', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: 4,
      filterCriteria: 'CA',
      filterType: 'exact',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should filter CSV for values less than criteria', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: 1,
      filterCriteria: 30000,
      filterType: 'LESS',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607');
      done();
    });
  });

  it('should filter CSV for values greater than criteria', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: 1,
      filterCriteria: '30000',
      filterType: 'greater',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n33333,Woodward Ave,Detroit,MI,48048\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should use character length when string criters is used with LESS filter type', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: 2,
      filterCriteria: '11',
      filterType: 'less',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n22222,Main St,Chicago,IL,60605\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should use character length when string criters is used with GREATER filter type', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: 2,
      filterCriteria: '10',
      filterType: 'GREATER',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n22211,Michigan Ave,Chicago,IL,60607\n33333,Woodward Ave,Detroit,MI,48048');
      done();
    });
  });

  it('should filter CSV with no header row', (done) => {
    csv = csv.split('\n');
    csv.shift();
    csv = csv.join('\n');
    const filterOpts = {
      hasHeader: false,
      columnToFilter: '4',
      filterCriteria: 'CA',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      assert.ifError(err);
      expect(filteredCsv).to.equal('11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should return error if no CSV string is provided', (done) => {
    const filterOpts = {
      hasHeader: false,
      columnToFilter: '4',
      filterCriteria: 'CA',
    };
    csvFilter(null, filterOpts, (err, filteredCsv) => {
      expect(filteredCsv).to.not.be.ok;
      expect(err.message).to.equal('Unable to parse CSV string. Make sure that a valid CSV string has been provided.');
      done();
    });
  });

  it('should return error if invalid CSV string is provided', (done) => {
    const filterOpts = {
      hasHeader: false,
      columnToFilter: '4',
      filterCriteria: 'CA',
    };
    csvFilter([1, 2, 3], filterOpts, (err, filteredCsv) => {
      expect(filteredCsv).to.not.be.ok;
      expect(err.message).to.equal('Unable to parse CSV string. Make sure that a valid CSV string has been provided.');
      done();
    });
  });

  it('should return error if no column is provided', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: null,
      filterCriteria: 'CA',
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      expect(filteredCsv).to.not.be.ok;
      expect(err.message).to.equal('Must provide a column name or number to filter CSV rows by.');
      done();
    });
  });

  it('should return error if no criteria is provided', (done) => {
    const filterOpts = {
      hasHeader: true,
      columnToFilter: '4',
      filterCriteria: null,
    };
    csvFilter(csv, filterOpts, (err, filteredCsv) => {
      expect(filteredCsv).to.not.be.ok;
      expect(err.message).to.equal('Must provide a criteria to filter CSV rows by.');
      done();
    });
  });
});
