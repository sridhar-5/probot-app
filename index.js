/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const fs = require("fs");

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    console.log(context.payload.issue.body);

    fs.writeFile("sample.txt", context.payload.issue.body, (err) => {
      if (err) throw err;
      console.log("Completed!");
    });

    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });

    return context.octokit.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
