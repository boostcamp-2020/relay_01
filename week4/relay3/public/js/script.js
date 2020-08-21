window.onload = init();

const dumy = [
 
]


function init() {
  let inputValue = "";
  let input = document.getElementById("input-mood");
  let button = document.getElementById("search-mood");

  let api = new API();
  let api2 = new ShutterstockAPI();

  const handleClick = async () => {
    inputValue = input.value;
    const ret = await api.getAdam(inputValue);
    const json = await ret.json();

    let moodFromAdam = moodParser(json); // 입력한 문장을 기반으로 받아온 JSON Object에서 감정만 받아온다.
    let mood = moods[moodFromAdam];

    console.log("moodFromAdam::", moodFromAdam)
    console.log("mood::", mood)

    const audioResult = await api2.getAudio(mood);
    const audioJson = await audioResult.json();

    await removeMusic();

    let recommend = document.getElementById("recommend");
    recommend.innerHTML = `<h1>${dumy.length? '추천목록': '추천목록이 없습니다'}</h1>`

    let container = document.getElementById("card-container");
    
    container.innerHTML = dumy.reduce((acc, music) => {
        acc += createElement(music)
        return acc
      },'')

    audioJson.data
      .forEach(obj => {
        document
          .getElementById("track-list")
          .appendChild(getMusicJsonNode(obj, mood))

      });
  }

  button.addEventListener("click", handleClick);
  document.getElementById("input-mood").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleClick()
    }
  })
}

const createElement = (obj) => {
  const {title, url, mood} = obj
  const card = `<div class ='card'>`+
                  `<div class ='card-title' title = '${title}'> ${title}</div>` +
                  `<audio class='url' src = ${url} controls></audio>` +
                   `<div class = 'mood'>${mood}</div>` +
                `</div>`
 
  return card
}

const removeMusic = () => {
  let mainNode = document.getElementById("main");
  let trackListNode = document.getElementById("track-list");

  mainNode.removeChild(trackListNode);

  let newTrackListNode = document.createElement("div");
  newTrackListNode.setAttribute("id", "track-list");

  mainNode.appendChild(newTrackListNode);
};

const getMusicJsonNode = (obj, mood) => {
  /*
  아래와 같은 구조의 DOM 생성

  <div class="track">
    <img class="thumbnail" src="./assets/thumbnail.jpg" />
    <div class="track-info-wrapper">
        <div class="name">Title : With Hope</div>
        <div class="artist">Description : Warm and flowing, with production...</div>
        <div class="mood">Mood : Happy...</div>
        <audio class="preview_mp3" src="http://~" constrols=true />
    </div>
  </div>

  */

  // 노드들 attribute 설정
  let trackNode = document.createElement("div");
  trackNode.setAttribute("class", "track");

  let trackInfoWrapperNode = document.createElement("div");
  trackInfoWrapperNode.setAttribute("class", "track-info-wrapper");

  let titleNode = document.createElement("div");
  titleNode.setAttribute("class", "title");
  let titleText = document.createTextNode(`Title : ${obj.title}`);
  titleNode.appendChild(titleText);

  let desNode = document.createElement("div");
  desNode.setAttribute("class", "description");
  let desText = document.createTextNode(`Description : ${obj.description}`);
  desNode.appendChild(desText);

  let moodNode = document.createElement("div");
  moodNode.setAttribute("class", "mood");
  let moodText = document.createTextNode(`Mood : ${mood}`);
  moodNode.appendChild(moodText);

  let preMp3Node = document.createElement("audio");
  preMp3Node.setAttribute("class", "preview_mp3")
  preMp3Node.setAttribute("controls", true);
  preMp3Node.setAttribute("src", obj.assets.preview_mp3.url);

  // 노드들 부모, 자식 관계 설정
  trackNode.appendChild(trackInfoWrapperNode);
  trackInfoWrapperNode.appendChild(titleNode);
  trackInfoWrapperNode.appendChild(desNode);
  trackInfoWrapperNode.appendChild(moodNode);
  trackInfoWrapperNode.appendChild(preMp3Node);

  return trackNode;
};
