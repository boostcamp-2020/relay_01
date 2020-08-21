/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const assert = require('assert');
const chai = require('chai');

const { expect } = chai;

const csvSort = require('..').sort;

describe('CSV sort function', () => {
  let csv;

  beforeEach(() => {
    csv = 'Address Number,Address Street,City,State,Zip\n'
        + '11111,De Anza Blvd,Cupertino,CA,95014\n'
        + '22222,Main St,Chicago,IL,60605\n'
        + '22211,Michigan Ave,Chicago,IL,60607\n'
        + '33333,Woodward Ave,Detroit,MI,48048\n'
        + '44444,Mission St,San Francisco,CA,95001\n';
  });

  it('should sort CSV by ascending order when column name is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: 'Address Number',
      orderBy: 'ASC',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n22211,Michigan Ave,Chicago,IL,60607\n22222,Main St,Chicago,IL,60605\n33333,Woodward Ave,Detroit,MI,48048\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should sort CSV based on critria when column number string is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: '3',
      orderBy: 'ASC',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('Address Number,Address Street,City,State,Zip\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607\n11111,De Anza Blvd,Cupertino,CA,95014\n33333,Woodward Ave,Detroit,MI,48048\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should sort CSV based on critria when column number integer is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: 2,
      orderBy: 'ASC',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607\n44444,Mission St,San Francisco,CA,95001\n33333,Woodward Ave,Detroit,MI,48048');
      done();
    });
  });

  it('should sort CSV with no header row', (done) => {
    csv = csv.split('\n');
    csv.shift();
    csv = csv.join('\n');
    const sortOpts = {
      hasHeader: false,
      sortByColumn: '3',
      orderBy: 'ASC',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607\n11111,De Anza Blvd,Cupertino,CA,95014\n33333,Woodward Ave,Detroit,MI,48048\n44444,Mission St,San Francisco,CA,95001');
      done();
    });
  });

  it('should default to ascending order if no sort order is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: '4',
      orderBy: null,
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607\n33333,Woodward Ave,Detroit,MI,48048');
      done();
    });
  });

  it('should sort by ascending order if ASC is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: '5',
      orderBy: 'ASC',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('Address Number,Address Street,City,State,Zip\n33333,Woodward Ave,Detroit,MI,48048\n22222,Main St,Chicago,IL,60605\n22211,Michigan Ave,Chicago,IL,60607\n44444,Mission St,San Francisco,CA,95001\n11111,De Anza Blvd,Cupertino,CA,95014');
      done();
    });
  });

  it('should sort by descending order if DESC is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: '5',
      orderBy: 'DESC',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001\n22211,Michigan Ave,Chicago,IL,60607\n22222,Main St,Chicago,IL,60605\n33333,Woodward Ave,Detroit,MI,48048');
      done();
    });
  });

  it('should sort by descending order without case sensitivity', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: '5',
      orderBy: 'desc',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      assert.ifError(err);
      expect(sortedCsv).to.equal('Address Number,Address Street,City,State,Zip\n11111,De Anza Blvd,Cupertino,CA,95014\n44444,Mission St,San Francisco,CA,95001\n22211,Michigan Ave,Chicago,IL,60607\n22222,Main St,Chicago,IL,60605\n33333,Woodward Ave,Detroit,MI,48048');
      done();
    });
  });

  it('should return error if no CSV string is provided', (done) => {
    const sortOpts = {
      hasHeader: false,
      sortByColumn: '4',
      orderBy: 'ASC',
    };
    csvSort(null, sortOpts, (err, sortedCsv) => {
      expect(sortedCsv).to.not.be.ok;
      expect(err.message).to.equal('Unable to parse CSV string. Make sure that a valid CSV string has been provided.');
      done();
    });
  });

  it('should return error if invalid CSV string is provided', (done) => {
    const sortOpts = {
      hasHeader: false,
      sortByColumn: '4',
      orderBy: 'ASC',
    };
    csvSort([1, 2, 3], sortOpts, (err, sortedCsv) => {
      expect(sortedCsv).to.not.be.ok;
      expect(err.message).to.equal('Unable to parse CSV string. Make sure that a valid CSV string has been provided.');
      done();
    });
  });

  it('should return error if no column is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: null,
      orderBy: 'ASC',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      expect(sortedCsv).to.not.be.ok;
      expect(err.message).to.equal('Must provide a column name or number to sort CSV rows by.');
      done();
    });
  });

  it('should return error if invalid sort order is provided', (done) => {
    const sortOpts = {
      hasHeader: true,
      sortByColumn: '2',
      orderBy: 'banana',
    };
    csvSort(csv, sortOpts, (err, sortedCsv) => {
      expect(sortedCsv).to.not.be.ok;
      expect(err.message).to.equal("Invalid value provided for 'orderBy'. Use 'ASC' or 'DESC' to sort by ascending or decending order respectively.");
      done();
    });
  });
});
