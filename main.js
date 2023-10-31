const { login } = require("./login");

let seq = 0,
  profiledata = {};
function nextMxReqToken() {
  return `${new Date().getTime()}-${seq++}`;
}

async function main() {
  const start = Date.now();
  const promises = [];

  for (let i = 0; i < 100; i++) {
    promises.push(login("MxAdmin", "root@1234"));
  }

  const results = await Promise.all(promises);

  results.forEach(({ xasid, XASSESSIONID }, i) => {
    console.log(i, xasid, XASSESSIONID);
  });

  const end = Date.now();

  const hour = (3600 * 1000) / ((end - start) / 100);
  console.log(`One hour can execute ${hour} times`);
}

main();
