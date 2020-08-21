const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const exec = require('child_process').execSync;
const { getMusicsByMood } = require('../dao/music-dao');

/** 
 * POST /api/upload
 */
router.post('/upload', (req, res) => {

  const form = formidable({
    multiples: true, //file 여러개
    uploadDir: "./public/img/capture/",
    keepExtensions: true //확장자 표시
  });

  let img_src = "";

  form.on('fileBegin', (name, file) => {
    img_src = "test.png";
    file.path = `${form.uploadDir}${img_src}`;
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.json({ message: "error" })
    }

    let emotion = exec('cd /root/relay_01/week3/Emotion-detection/src && python3 emotions.py --mode picture').toString("utf8");
    emotion = emotion.trim().toLowerCase();

    console.log("emotion****", emotion)
    res.json({ message: "success", emotion });
  });
});

router.get('/music/:mood', async (req, res) => {
  const moodString = req.params.mood;
  try {
    const musics = await getMusicsByMood(moodString);
    console.log(musics);
    res.json({ message: "success", musics });
  } catch (err) {
    console.error(err);
    return res.json({ message: "error" })
  }
});

module.exports = router;
