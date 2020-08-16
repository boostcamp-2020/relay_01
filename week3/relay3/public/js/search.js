const player = document.getElementById('player');
const snapshotCanvas = document.getElementById('snapshot');
const captureButton = document.getElementById('capture');
let captureImage = null;
let selectedImage = null;

/* 캡처 버튼 이벤트 바인딩 */
captureButton.addEventListener('click', async () => {
  captureImage = snapshot.getContext('2d'); // 캡처된 이미지

  /* 사진 화면에 그리는 부분 */
  snapshotCanvas.style = "display:block;"
  captureImage.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

  document.getElementById("downloader").href = snapshotCanvas.toDataURL("image/png")

});

document.getElementById("download_btn").addEventListener('click', (e) => {
  if (!captureImage) {
    e.preventDefault();
    alert("이미지 캡처 후 저장 가능합니다!")
  }
})

/* 브라우저에 웹캠 출력 */
const startVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    player.srcObject = stream;
  } catch (err) {
    document.querySelector('.error_msg').style = "display : block;";
    player.style = "display : none;";
    document.querySelector(".capture_field").style = "display : none;";
  }
}


/* 파일 선택했을 때 */
document.getElementsByClassName("fileInput")[0].addEventListener('change', (e) => {
  selectedImage = e.target.files[0];
  console.log(selectedImage)
})


/* form에 submit 이벤트 바인딩 */
document.getElementById("imageForm").addEventListener('submit', async (e) => {
  e.preventDefault();

  if (selectedImage) {
    document.getElementById("loading").style = "display:block";

    const emotion = await getEmotionByImage(selectedImage);

    if (emotion === "none") {
      document.getElementById("loading").style = "display:none";
      alert("감정 분석에 실패했습니다. 사람이 있는 사진인지 확인해주세요!");
      return;
    }



    console.log("emotion", emotion)
    const musicList = await getMusicListByEmotion(emotion);

    console.log("music list", musicList)

    removeMusic();

    musicList.forEach(obj => {
      document.getElementById("track-list").appendChild(getMusicJsonNode(obj, emotion))
    });

    document.getElementById("loading").style = "display:none";

    const location = document.getElementById("track-list").offsetTop;
    console.log(location)
    window.scrollTo({ top: location, behavior: 'smooth' });



  } else {
    alert("이미지를 선택해주세요.");
  }
})


/* 사진 전송  */
const getEmotionByImage = async (selectedImage) => {

  const formData = new FormData();

  /* TODO :: body에 들어갈 정보들이 필요하면 추가 
  ex) formData.append('something', something); 
  */

  formData.append('file', selectedImage); // 이미지

  /* TODO :: 백엔드 api 주소로 수정*/
  const url = "/api/upload"

  const res = await fetch(url, {
    method: "POST",
    body: formData
  })
  console.log("here", res)

  const json = await res.json();
  const emotionType = json.emotion;

  if (emotionType === "none") {
    return emotionType;
  }

  console.log(emotionType)

  /* 위에서 파싱한 감정을 emotion 변수에 리턴 */
  let emotion = moods[emotionType];

  return emotion;
}


const getMusicListByEmotion = async (emotion) => {


  /* TOOD :: api를 호출할 url과 api key */
  const url = `https://api.shutterstock.com/v2/audio/search?moods=${emotion}`;
  const token = `v2/QTZreFZxR0ZRU3lpbHI2QkFETlFlSGhGTEczR3ZZUkMvMjc0NTAxOTIxL2N1c3RvbWVyLzMvMzBJVU9zVGdLTXpiY0F3UWNIdnNCRXJrMWt4MG5Bak5TVWtNSnpWc3BiNEJ6OUtZajZUaFdzSHZFUWNxOEJLcjc4NG05ZXNva3BHb2w0a2Q3dXdsWi12STV2dC16SnJERWVkN24yZXBsa3d5cm1QdnpWdnZQM2JsSFgzUEZHTkJQVWZZZG1KbjZvUElKLUhzQUI1VWQxQ041am9WZHNPOEVUckJnSUg5Yk1tNFhjRmMzMmgxcHRqM2cwNlVJcTI2enZhYjBvTjRfdThXYmtFa3pTVkh1QQ`;

  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` },
  })

  const json = await res.json();

  return json.data;
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


/* 웹캠 시작 */
startVideo();