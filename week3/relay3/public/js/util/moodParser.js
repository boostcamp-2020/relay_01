const moodParser = (obj) => {
  // 입력한 문장을 기반으로 받아온 JSON Object에서 감정만 받아온다.
  let returnObj = obj.return_object;
  return returnObj.Result[0][1];
};
