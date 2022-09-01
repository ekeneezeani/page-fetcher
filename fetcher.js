const request = require("request");
const fs = require("fs");

const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

const cmdImput = process.argv.splice(2);
const url = cmdImput[0];
const fileName = cmdImput[1];

const read = () => {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      fetcher();
      return;
    }

    const rl = readline.createInterface({ input, output });

    rl.question(
      "File already exists, do you want to proceed? type Y to continue   ",
      (answer) => {
        console.log(answer)
        const answerIsYes = answer === "y" || answer === "Y";
        if (!answerIsYes) {
          rl.close();
          return;
        }
        fetcher();
        rl.close();
      }
    );
  });
};

const write = (body) => {
  fs.writeFile(fileName, body, (err) => {
    // console.log('Write');
    if (err) {
      //console.log(err);
    }
  });
};

const fetcher = () => {
  request(url, (error, response, body) => {
    //console.log(body);
    write(body);
  });
};

read();
