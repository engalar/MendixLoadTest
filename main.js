const { login } = require("./login");

let seq = 0,
  profiledata = {};
function nextMxReqToken() {
  return `${new Date().getTime()}-${seq++}`;
}

(async function main() {
  // how long take
  const start = Date.now();
  for (let i = 0; i < 100; i++) {
    const { xasid, XASSESSIONID } = await login();
    //print
    console.log(i, xasid, XASSESSIONID);
  }
  const end = Date.now();
  console.log(end - start);
  //so a hour can execute how many times
  const hour = (3600 * 1000) / ((end - start) / 100);
  console.log(`One hour can execute ${hour} times`);
})();
