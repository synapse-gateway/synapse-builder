const { Command } = require("@oclif/command");
const { spawn } = require("child_process");

class DeleteCommand extends Command {
  async run() {
    const rootDirectory = `${__dirname.split("/").slice(0, -3).join("/")}`;

    const appName = "synapse";

    const deleteSynapse = spawn(
      "copilot",
      ["app", "delete", "--name", appName, "--yes"],
      {
        cwd: rootDirectory,
      }
    );

    deleteSynapse.stdout.on("data", (s) => {
      if (s.toString().includes("[[8;79R"))
        process.stdout.write(s.split("[[8;79R")[0]);
      else process.stdout.write(s);
    });

    deleteSynapse.stderr.on("data", (s) => {
      process.stdout.write(s);
    });
  }
}

DeleteCommand.description = `Delete your deployed Synapse Gateway instance from AWS infrastructure`;

module.exports = DeleteCommand;
