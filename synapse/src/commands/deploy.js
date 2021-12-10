const { Command } = require("@oclif/command");

class DeployCommand extends Command {
  async run() {
    await import("../../../deploy/deploy.js");
  }
}

DeployCommand.description = `Deploy your Synapse Gateway onto AWS`;

module.exports = DeployCommand;
