const axios = require("axios");

async function create(
  xasid,
  XASSESSIONID,
  entity,
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
    Cookie: `DeviceType=Desktop; Profile=Responsive; SessionTimeZoneOffset=-480; originURI=/login.html; XASSESSIONID=${XASSESSIONID}; xasid=${xasid}`,
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
      action: "instantiate",
      params: { objecttype: entity },
      changes: {},
      objects: [],
      profiledata,
    },
    {
      headers: headers,
      referrer: "http://localhost:8080/index.html?profile=Responsive",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "cors",
      withCredentials: true,
    }
  );

  return response.data.objects[0];
}

module.exports = { create };