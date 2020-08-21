//csv sort filter module
const csvFilterSort = require("csv-filter-sort");
const fs = require("fs");
const csv = fs.readFileSync("./data/musics.txt").toString();
const Music = require('../model/music');

/* 
csv 형태
Id,Url,Title,Artist,Mood,Rate
526229,http://e-cdn-preview-b.deezer.com.mp3,Funky Lowland,Kelly O'Brian,happy,2.31
536440,http://ir.ii.uam.mp3,Blue Suede Shoes,Elvis Presley,feel good,3.42
*/
/* 무드 종류 */
const mood = {
  기쁨: "Happy",
  신뢰: "Feel Good",
  공포: "Horror",
  기대: "Epic",
  놀라움: "Adventure",
  슬픔: "Sad",
  혐오: "Strange",
  분노: "Crime",
};

const convertMoodStringToType = (moodString) => {
  return mood[moodString.trim()].toLowerCase();
};

const getMusicsByMood = (moodString) => {
    const mood = convertMoodStringToType(moodString);
    const filterOptions = {
        hasHeader: true,
        columnToFilter: "Mood",
        filterCriteria: mood,
        filterType: "EXACT",
    };
    const sortOptions = {
        hasHeader: true,
        sortByColumn: 'Rate',
        orderBy: "DESC"
    };

    return new Promise((resolve, reject) => {
        csvFilterSort.filter(csv, filterOptions, function (err, filteredCsv) {
            if (err) {
                reject(err);
                return err;
            }
            csvFilterSort.sort(filteredCsv, sortOptions, (err, sortedCsv) => {
                if(err) {
                    reject(err);
                    return err;
                }
                const musics = sortedCsv.split('\n').slice(1, 6).map(musicInfo => new Music(musicInfo));
                resolve(musics);
            })
        });
    });
}

module.exports = {getMusicsByMood};