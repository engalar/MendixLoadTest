const { create, commit } = require("./domain");
const { getSessionData } = require("./get_session_data");
const { login } = require("./login");
const cookie = require("cookie");

let seq = 0,
  profiledata = {};
function nextMxReqToken() {
  return `${new Date().getTime()}-${seq++}`;
}

async function main() {
  const start = Date.now();
  const promises = [];

  for (let i = 0; i < 1000; i++) {
    promises.push(oneLoop(i));
  }

  await Promise.all(promises);

  const end = Date.now();

  const hour = (3600 * 1000) / ((end - start) / 100);
  console.log(`One hour can execute ${hour} times`);
}

async function oneLoop(index) {
  const res = await getSessionData(null, null, nextMxReqToken());
  // 解析所有的"Set-Cookie"头部
  const setCookies = res.headers["set-cookie"];

  // 解析每个cookie
  if (setCookies) {
    // 用于存储和管理cookie的对象
    const cookieJar = {};
    setCookies.forEach((cookieString) => {
      const parsedCookie = cookie.parse(cookieString);
      Object.assign(cookieJar, parsedCookie);
    });

    const xasid = cookieJar.xasid,
      XASSESSIONID = cookieJar["__Host-XASSESSIONID"],
      csrftoken = res.data.csrftoken;

    const obj = await create(
      xasid,
      XASSESSIONID,
      "ECIS_DataModel.LkTaskType",
      nextMxReqToken(),
      csrftoken
    );

    await commit(
      xasid,
      XASSESSIONID,
      nextMxReqToken(),
      csrftoken,
      obj,
      `from loadTest 1129 [${index
        .toString()
        .padStart(8, "0")}] ${new Date().toLocaleString()}`
    );
  }
}

main();
