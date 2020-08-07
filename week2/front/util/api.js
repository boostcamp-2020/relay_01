class API {
  constructor() {}

  getAdam(inputValue) {
    // inputValue 텍스트 값의 감정을 분석하는 api의 결과값을 받아오는 함수.
    let url = `http://api.adams.ai/datamixiApi/omAnalysis`;
    let myKey = "2495374428027227270"; //J039 개인 키입니다....
    let option = "1"; //0:감성분석 / 1:감정분석

    //감성 종류 : [부정, 중립, 긍정]
    //감정 종류 : [기쁨, 신뢰, 공포, 기대, 놀라움, 슬픔, 혐오, 분노]

    return axios({
      method: "get",
      url: url,
      params: {
        key: myKey,
        type: option,
        query: inputValue,
      },
    });
  }
}
