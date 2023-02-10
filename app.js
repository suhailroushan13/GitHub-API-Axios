import { Octokit } from "@octokit/core";
import axios from "axios";
import readline from "readline-sync";
import fs from "fs/promises";

let main = async () => {
  try {
    console.clear();
    console.log("+++++++++++++++++++++++++++++");
    console.log("GitHub Automation Using Axios");
    console.log("+++++++++++++++++++++++++++++\n");

    let instructor = readline.question("Enter Instructor GitHub UserName : ");
    let gitHubToken = readline.question("Enter Your GitHub Token : ");
    const octokit = new Octokit({
      auth: gitHubToken,
    });

    let repoName = readline.question("Enter GitHub Repository Name : ");
    let description = readline.question("Enter Repository Description : ");
    await octokit.request("POST /user/repos", {
      name: repoName,
      description: description,
      homepage: "https://github.com",
      private: true,
      is_template: false,
    });

    let count = readline.question("Enter The Number of Students : ");
    let start = 1;
    let userNames = [];
    while (start <= count) {
      let user = readline.question(`${start}.Enter The GitHub UserName : `);
      await octokit.request(
        "PUT /repos/{owner}/{repo}/collaborators/{username}",
        {
          owner: instructor,
          repo: repoName,
          username: user,
          permission: "push",
        }
      );
      userNames.push(user);
      start++;
    }
    let data = `instructor=${instructor}\nrepoName=${repoName}\ndescription=${description}\ntoken=${gitHubToken}`;

    let write = fs.writeFile("config", data);
  } catch (error) {
    console.log(error);
  }
};
main();
