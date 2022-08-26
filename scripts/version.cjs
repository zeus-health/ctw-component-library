const process = require("process");
const childprocess = require("child_process");
const { exit } = require("process");

const SEMVAR_INCREMENET_ARG = "semvar-increment";
const SUMMARY_ARG = "summary";
const ALLOWED_SEMVAR_VALUE = ["patch", "minor", "major"];

console.log("...starting");

const argv = (key) => {
  // Return true if the key exists and a value is defined
  if (process.argv.includes(`--${key}`)) return true;

  const value = process.argv.find((element) => element.startsWith(`--${key}=`));

  // Return null if the key does not exist and a value is not defined
  if (!value) return null;

  return value.replace(`--${key}=`, "");
};

const semvarVal = argv(SEMVAR_INCREMENET_ARG);
if (!semvarVal || !ALLOWED_SEMVAR_VALUE.includes(semvarVal)) {
  // TODO: Improve messaging here
  console.log("...exiting --semvar-increment is a required");
  exit();
}

const summaryVal = argv(SUMMARY_ARG);
if (!summaryVal) {
  // TODO: Improve messaging here
  console.log("...exiting --summary is a required");
  exit();
}

const questionAnswerMap = Object.entries({
  "What kind of change is this for ctw-component-library?": semvarVal,
  "Please enter a summary for this change": summaryVal,
  "Is this your desired changeset?": "Y",
});

const runRelease = childprocess.spawn("npx", ["changeset"]);
runRelease.stdout.setEncoding("utf8");

console.log("...child process started");
console.log(`Using --${SEMVAR_INCREMENET_ARG}: ${semvarVal}`);
console.log(`Using --${SUMMARY_ARG}: ${summaryVal}`);

let current = "";
let currentQuestionIdx = 0;
runRelease.stdout.on("data", (data) => {
  console.log("entering", data);
  current += data;
  const [question, answer] = questionAnswerMap[currentQuestionIdx];
  if (current.includes(question)) {
    runRelease.stdin.write(`${answer}\n`);
    currentQuestionIdx += 1;
    current = "";
    if (questionAnswerMap.length === currentQuestionIdx) {
      console.log("...finished");
      exit();
    }
  }
});
