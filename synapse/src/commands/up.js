const { Command } = require("@oclif/command");
const { spawn } = require("child_process");

class UpCommand extends Command {
  async run() {
    const rootDirectory = __dirname.split("/").slice(0, -3).join("/");
    // const { flags } = this.parse(UpCommand);
    // const name = flags.name || "world";
    // this.log(`hello ${name} from ./src/commands/hello.js`);
    // this.log(__dirname.split("/").slice(0, -3).join("/"));
    const synapseInstance = spawn("sudo", ["docker-compose", "up"], {
      rootDirectory,
    });

    synapseInstance.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    synapseInstance.stderr.on("data", (s) => {
      process.stdout.write(s);
    });
  }
}

// UpCommand.description = `Describe the command here
// ...
// Extra documentation goes here
// `

// HelloCommand.flags = {
//   name: flags.string({char: 'n', description: 'name to print'}),
// }

module.exports = UpCommand;
