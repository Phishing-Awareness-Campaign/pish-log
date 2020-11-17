const url = require("url");
const exec = require("child_process").exec;
const shortid = require("shortid");

module.exports.download = (url, cb) => {
  const SPACE = " ";
  const o = {
    output: dir => {
      return "-P " + dir + SPACE;
    },
    recursive: "-r" + SPACE,
    ignoreRobotsTxt: "-e robots=off" + SPACE,
    fakeUserAgent:
      '-U "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1"' +
      SPACE,
    waitBetweenFetches: (time = 20) => {
      return "--wait=" + time + SPACE;
    },
    limitRate: (rate = 20) => {
      return "--limit-rate=" + rate + "K" + SPACE;
    },
    noParent: "--no-parent" + SPACE,
    convertLinks: "--convert-links" + SPACE,
    downloadAssets: "--page-requisites" + SPACE,
    adjustExtensions: "--adjust-extension" + SPACE
  };
  const tempName = shortid.generate();
  const internFilepath = tempName;

  const options =
    o.output(internFilepath) +
    o.recursive +
    o.ignoreRobotsTxt +
    o.fakeUserAgent +
    o.noParent +
    o.convertLinks +
    o.downloadAssets +
    o.adjustExtensions;
  const cmd = "wget " + options + url;

  const child = exec(cmd, (err, stdout, stderr) => {
    if (err) throw err;
    else {
      cb({
        internFilepath,
        tempName
      });
    }
  });
};
