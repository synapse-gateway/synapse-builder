const { Command } = require("@oclif/command");
const { spawn } = require("child_process");

class UpCommand extends Command {
  async run() {
    const rootDirectory = `${__dirname
      .split("/")
      .slice(0, -3)
      .join("/")}/server`;

    const synapseInstance = spawn("sudo", ["docker-compose", "up", "-d"], {
      cwd: rootDirectory,
    });

    synapseInstance.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    synapseInstance.stderr.on("data", (s) => {
      process.stdout.write(s);
    });

    process.stdin.pipe(synapseInstance.stdin);
  }
}

UpCommand.description = `Spin up your local Synapse Gateway instance`;

module.exports = UpCommand;
