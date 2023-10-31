const axios = require("axios");

axios
  .post(
    "http://127.0.0.1:8080/xas/",
    {
      action: "get_session_data",
      params: {
        hybrid: false,
        offline: true,
        referrer: "/login",
        profile: "",
        timezoneoffset: -480,
        preferredLanguages: [
          "zh-CN",
          "zh",
          "en",
          "pt",
          "zh-TW",
          "ja",
          "fr",
          "ru",
        ],
        version: 1,
      },
      profiledata: {
        "1698719978206-0": 16,
      },
    },
    {
      headers: {
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
        "x-mx-reqtoken": "1698719978230-1",
      },
      referrer: "http://localhost:8080/",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "cors",
      withCredentials: true,
    }
  )
  .then((response) => {
    console.log(response.data.csrftoken);
  })
  .catch((error) => {
    console.error(error);
  });
