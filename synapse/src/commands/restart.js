const { Command } = require("@oclif/command");
const { spawn } = require("child_process");

class RestartCommand extends Command {
  async run() {
    const rootDirectory = `${__dirname
      .split("/")
      .slice(0, -3)
      .join("/")}/server`;

    const synapseInstance = spawn(
      "sudo",
      ["docker-compose", "restart", "apolloserver"],
      {
        cwd: rootDirectory,
      }
    );

    synapseInstance.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    synapseInstance.stderr.on("data", (s) => {
      process.stdout.write(s);
    });
  }
}

RestartCommand.description = `Apollo should restart manually.  Try this command if your mesh changes weren't immediately reflected in your Gateway.`;

module.exports = RestartCommand;
