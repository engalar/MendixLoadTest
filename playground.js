let o = 0,
  r = {};
async function profilingMiddleware(e, t) {
  const n = new Date().getTime(),
    a = `${n}-${o++}`,
    s = {
      url: e.url,
      init: {
        ...e.init,
        headers: new Headers(e.init.headers),
      },
      body: e.body,
    };
  s.init.headers.append("X-Mx-ReqToken", a);
  isJson(s.body) &&
    Object.keys(r).length > 0 &&
    ((s.body = { ...s.body, profiledata: r }), (r = {}));

  const c = await t(s);
  r[a] = new Date().getTime() - n;
  return c;
}

async function csrfMiddleware(e, t) {
  const n = {
    url: e.url,
    init: {
      ...e.init,
      headers: new Headers(e.init.headers),
    },
    body: e.body,
  };
  return n.init.headers.append("X-Csrf-Token", o()), t(n);
}

profilingMiddleware(
  {
    url: "http://localhost:8080/xas/",
    init: {
      credentials: "include",
      headers: {},
      method: "post",
      redirect: "error",
    },
    body: {
      action: "get_session_data",
      params: {
        hybrid: false,
        offline: true,
        referrer: null,
        profile: "Responsive",
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
    },
  },
  doFetch
);

function isJson(e) {
  return null != e && "object" == typeof e && e.constructor === {}.constructor;
}

async function doFetch(e) {
  e.init.body = isJson(e.body) ? JSON.stringify(e.body) : e.body;
  const t = await window.fetch(e.url, e.init);
  console.dir(t);
  debugger;
}

doFetch({
  url: "http://localhost:8080/xas/",
  init: {
    credentials: "include",
    headers: {},
    method: "post",
    redirect: "error",
  },
  body: {
    action: "login",
    params: {
      username: "MxAdmin",
      password: "root@1234",
      shouldgeneratetoken: true,
    },
  },
});


mx.data.create({
  entity: "ECIS_DataModel.LkTaskType",
  callback: (e) => {
    e.set("Name", "hello " + new Date().getTime());
    mx.data.commit({
      mxobj: e,
      callback: function () {
        console.log(arguments);
      },
    });
  },
});