window.onload = init();

function init() {
  let inputValue = "";
  let input = document.getElementById("input-mood");
  let button = document.getElementById("search-mood");

  let main = document.getElementById("main");
  let api = new API();

  button.addEventListener("click", async (e) => {
    inputValue = input.value;
    let ret;
    try {
      ret = await api.getAdam(inputValue);
    } catch (e) {
      alert("Data-fetching-Error!");
    }

    let mood = moodParser(ret.data); // 입력한 문장을 기반으로 받아온 JSON Object에서 감정만 받아온다.

    await removeMusic();

    musicJson
      .filter((obj) => obj.mood === mood)
      .forEach((obj) => {
        document
          .getElementById("track-list")
          .appendChild(getMusicJsonNode(obj));
      });
  });
}

const removeMusic = () => {
  let mainNode = document.getElementById("main");
  let trackListNode = document.getElementById("track-list");

  mainNode.removeChild(trackListNode);

  let newTrackListNode = document.createElement("div");
  newTrackListNode.setAttribute("id", "track-list");

  mainNode.appendChild(newTrackListNode);
};

const getMusicJsonNode = (obj) => {
  /*
  아래와 같은 구조의 DOM 생성

  <div class="track">
    <img class="thumbnail" src="./assets/thumbnail.jpg" />
        <div class="track-info-wrapper">
            <div class="name">제목 : Kill this Love!</div>
            <div class="artist">아티스트 : 블랙핑크</div>
            <div class="mood">분위기 : 격앙</div>
          </div>
   </div>
   
  */

  // 노드들 attribute 설정
  let trackNode = document.createElement("div");
  trackNode.setAttribute("class", "track");

  let thumbNailNode = document.createElement("img");
  thumbNailNode.setAttribute("class", "thumbnail");
  thumbNailNode.setAttribute("src", obj.artwork);

  let trackInfoWrapperNode = document.createElement("div");
  trackInfoWrapperNode.setAttribute("class", "track-info-wrapper");

  let nameNode = document.createElement("div");
  nameNode.setAttribute("class", "name");
  let nameText = document.createTextNode(`제목 : ${obj.title}`);
  nameNode.appendChild(nameText);

  let artistNode = document.createElement("div");
  artistNode.setAttribute("class", "artist");
  let artistText = document.createTextNode(`아티스트 : ${obj.artist}`);
  artistNode.appendChild(artistText);

  let moodNode = document.createElement("div");
  moodNode.setAttribute("class", "mood");
  let moodText = document.createTextNode(`분위기 : ${obj.mood}`);
  moodNode.appendChild(moodText);

  // 노드들 부모, 자식 관계 설정
  trackNode.appendChild(thumbNailNode);
  trackNode.appendChild(trackInfoWrapperNode);
  trackInfoWrapperNode.appendChild(nameNode);
  trackInfoWrapperNode.appendChild(artistNode);
  trackInfoWrapperNode.appendChild(moodNode);

  return trackNode;
};
