const exec = require('child_process').execSync;
function test() {
    const py = exec('cd /root/relay_01/week3/Emotion-detection/src && python3 emotions.py --mode picture');
    return py.toString("utf8");
}
const a = test().trim();
console.log(a);
console.log("프로그램 종료");
