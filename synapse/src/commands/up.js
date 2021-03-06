const { Command } = require("@oclif/command");
const { spawn } = require("child_process");

class UpCommand extends Command {
  async run() {
    const rootDirectory = `${__dirname
      .split("/")
      .slice(0, -3)
      .join("/")}/server`;

    const synapseInstance = spawn("sudo", ["docker-compose", "up"], {
      cwd: rootDirectory,
    });

    synapseInstance.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    synapseInstance.stderr.on("data", (s) => {
      process.stdout.write(s);
    });

    process.stdin.pipe(synapseInstance.stdin);

    const killWorker = () => {
      console.log("\nExiting Synapse...");
      synapseInstance.kill();
      spawn("sudo", ["docker-compose", "down"], {
        cwd: rootDirectory,
      });
    };

    process.on("uncaughtException", killWorker);
    process.on("SIGINT", killWorker);
    process.on("SIGTERM", killWorker);
  }
}

UpCommand.description = `Spin up your local Synapse Gateway instance`;

module.exports = UpCommand;
