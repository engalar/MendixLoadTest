const axios = require("axios");

/**
 *
 * @param {*} mxReqToken
 * @param {*} csrfToken
 * @param {*} profiledata history mxReqToken consumer time
 */
async function login(
  username,
  password,
  mxReqToken,
  csrfToken,
  profiledata = {}
) {
  const headers = {
    accept: "application/json",
    "accept-language":
      "zh-CN,zh;q=0.9,en;q=0.8,pt;q=0.7,zh-TW;q=0.6,ja;q=0.5,fr;q=0.4,ru;q=0.3",
    "cache-control": "no-cache",
    "content-type": "application/json",
    pragma: "no-cache",
    "sec-ch-ua":
      '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
  };
  if (csrfToken) {
    headers["x-csrf-token"] = csrfToken;
  }
  if (mxReqToken) {
    headers["x-mx-reqtoken"] = mxReqToken;
  }
  const response = await axios.post(
    "http://127.0.0.1:8080/xas/",
    {
      action: "login",
      params: {
        username,
        password,
      },
      profiledata,
    },
    {
      headers: headers,
      referrer: "http://localhost:8080/p/login",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "cors",
      withCredentials: true,
    }
  );
  const cookies = response.headers["set-cookie"];
  const cookieObject = {};

  cookies.forEach((cookie) => {
    const cookieParts = cookie.split(";")[0].split("=");
    const cookieName = cookieParts[0];
    const cookieValue = cookieParts[1];
    cookieObject[cookieName] = cookieValue;
  });

  return cookieObject;
}

module.exports = { login };
