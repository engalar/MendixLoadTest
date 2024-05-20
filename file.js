const Client = require("./utils/client");
const tasks = require("./task");

const client = new Client({
  username: "MxAdmin",
  password: "1",
  apiUrl: "http://127.0.0.1:8081",
});

const baseDir = "D:/迅雷下载/restore/mpr/deployment/data/files";

async function main() {
  await client.login();

  let index = 0;
  while (tasks.length > index) {
    const filename = tasks[index].name,
      filePath = `${baseDir}/${filename.slice(0, 2)}/${filename.slice(
        2,
        4
      )}/${filename}`;
    console.log(`task ${index + 1}: Uploading ${filename}...`);
    await client.uploadFile(filePath, filename, tasks[index].id);
    index++;
  }
}

main();