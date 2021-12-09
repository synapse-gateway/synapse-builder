const { Command } = require("@oclif/command");

class RedeployCommand extends Command {
  async run() {
    await import("../../../deploy/redeploy.js");
  }
}

RedeployCommand.description = `Redeploy your Synapse Gateway with your updated Gateway`;

module.exports = RedeployCommand;
