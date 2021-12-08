const { Command } = require("@oclif/command");

class DeployCommand extends Command {
  async run() {
    await import("../../../deploy/falseDeploy.js");
  }
}

// HelloCommand.description = `Describe the command here
// ...
// Extra documentation goes here
// `

// HelloCommand.flags = {
//   name: flags.string({char: 'n', description: 'name to print'}),
// }

module.exports = DeployCommand;
