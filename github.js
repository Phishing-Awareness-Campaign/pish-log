const simpleGit = require("simple-git")();
const simpleGitPromise = require("simple-git/promise")();
const gitHubUrl = `https://${process.env.GITHUB_USER}:${process.env.GITHUB_PASSWORD}@github.com/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`;

module.exports.uploadToGithub = function(foldername, cb) {
  simpleGitPromise.add(process.env.TEMP_DOWNLOAD_PATH + foldername).then(
    addSuccess => {
      console.log(addSuccess);
    },
    failedAdd => {
      console.log(failedAdd);
      console.log("adding files failed");
    }
  );
  // Commit files as Initial Commit
  simpleGitPromise.commit(foldername).then(
    successCommit => {
      console.log(successCommit);
    },
    failed => {
      console.log("failed commmit");
    }
  );
  // Finally push to online repository
  simpleGitPromise.push(gitHubUrl, "master").then(
    success => {
      console.log("repo successfully pushed");
      cb(success);
    },
    failed => {
      console.log("repo push failed");
    }
  );
};
