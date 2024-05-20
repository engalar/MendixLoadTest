const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

class Client {
  constructor(options) {
    this.options = options;
  }
  async login() {
    const response = await axios.post(
      this.options.apiUrl + "/xas/",
      {
        action: "login",
        params: {
          username: this.options.username,
          password: this.options.password,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
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
    this.csrftoken = response.data.csrftoken;
    this.xassessionid = cookieObject.XASSESSIONID;
  }

  async uploadFile(filePath, name, fileId) {
    const form = new FormData();
    form.append("data", JSON.stringify({ changes: {}, objects: [] }));
    form.append("blob", fs.createReadStream(filePath), {
      filename: name,
      contentType: "application/octet-stream",
    });

    const response = await axios.post(
      `${this.options.apiUrl}/file?guid=${fileId}`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-csrf-token": this.csrftoken,
          Cookie: `DeviceType=Desktop; Profile=Responsive; XASSESSIONID=${this.xassessionid}`,
        },
      }
    );
    return response;
  }
}

module.exports = Client;