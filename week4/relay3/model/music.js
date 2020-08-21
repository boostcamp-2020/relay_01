/**
 * 
 */
class Music {
    id;
    url;
    title;
    artist;
    mood;
    rate;
    /**
     * @param musicInfo csv 형식의 데이터
     */ 
    constructor(musicInfo) { 
        const fields = ['id', 'url', 'title', 'artist', 'mood', 'rate'];
        const infoTokens = musicInfo.split(',');
        if (infoTokens.length !== fields.length) {
            throw new Error('Invalid music info');
        }
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] === 'id' || fields[i] === 'rate') {
                this[fields[i]] = Number(infoTokens[i]);
            }
            else {
                this[fields[i]] = infoTokens[i];
            }
        }
    }
}

//test
const musicInfo = "526229,http://e-cdn-preview-b.deezer.com/stream/b8a5a5230fe387b4893892d61567deb2-3.mp3,Funky Lowland,Kelly O'Brian,혐오,2.45";
const music = new Music(musicInfo);

console.log(music);

module.exports = Music;