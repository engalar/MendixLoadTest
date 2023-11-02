const { create } = require("./domain");
const { getSessionData } = require("./get_session_data");
const { login } = require("./login");

let seq = 0,
  profiledata = {};
function nextMxReqToken() {
  return `${new Date().getTime()}-${seq++}`;
}

async function main() {
  const start = Date.now();
  const promises = [];

  for (let i = 0; i < 1; i++) {
    promises.push(oneLoop());
  }

  await Promise.all(promises);

  const end = Date.now();

  const hour = (3600 * 1000) / ((end - start) / 100);
  console.log(`One hour can execute ${hour} times`);
}

async function oneLoop() {
  const { xasid, XASSESSIONID } = await login("MxAdmin", "1");

  const { csrftoken } = await getSessionData(
    xasid,
    XASSESSIONID,
    nextMxReqToken()
  );
  const obj = await create(
    xasid,
    XASSESSIONID,
    "ECIS_DataModel.LkTaskType",
    nextMxReqToken(),
    csrftoken
  );

  console.log(obj);
}

main();
