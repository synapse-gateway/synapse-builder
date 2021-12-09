const { Command } = require("@oclif/command");
const { spawn } = require("child_process");

class UpCommand extends Command {
  async run() {
    const rootDirectory = `${__dirname
      .split("/")
      .slice(0, -3)
      .join("/")}/server`;

    spawn("sudo", ["docker-compose", "down"], {
      cwd: rootDirectory,
    });
  }
}

UpCommand.description = `Tear down your local Synapse Gateway instance (if required)`;

module.exports = UpCommand;
