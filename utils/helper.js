import { execFile } from "child_process";

function Bash(cmd, args) {
  return new Promise((resolve, reject) => {
    let output = {};
    const child = execFile(cmd, args, (err, stdout, stderr) => {
      if (stdout) {
        output.stdout = stdout;
      }
      if (err) {
        if (stderr) {
          output.stderr = stderr;
          return;
        }
        output.err = err;
      }
    });
    child.on("close", () => {
      resolve(output);
    });
  });
}
// Bash("git clone git@github.com:/suhailroushan13/Suhail-Test.git");
// Bash("mkdir", ["Suhail-Test"]);
Bash("push");
