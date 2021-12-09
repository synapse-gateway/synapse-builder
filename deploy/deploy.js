import chalk from "chalk";
import clear from "clear";
import util from "util";
import { exec } from "child_process";
import { spawn } from "child_process";
import events from "events";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const myEmitter = new events.EventEmitter();

let appName = "synapse";

const cwd = __dirname.split("/").slice(0, -1).join("/");

const completedTasks = [];

const promisifiedExec = util.promisify(exec);

const getInstallationCommand = () => {
  let os = process.platform;
  if (os === "linux") os = process.arch;

  switch (os) {
    case "x64":
      return "sudo curl -Lo /usr/local/bin/copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-linux \
      && sudo chmod +x /usr/local/bin/copilot \
      && copilot --help";
    case "arm":
    case "arm64":
      return "sudo curl -Lo /usr/local/bin/copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-linux-arm64 \
      && sudo chmod +x /usr/local/bin/copilot \
      && copilot --help";
    case "win32": //might not work
      return `PS C:\> New-Item -Path 'C:\copilot' -ItemType directory;
      Invoke-WebRequest -OutFile 'C:\copilot\copilot.exe' https://github.com/aws/copilot-cli/releases/latest/download/copilot-windows.exe`;
    case "darwin":
      return "sudo curl -Lo /usr/local/bin/copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-darwin \
      && sudo chmod +x /usr/local/bin/copilot \
      && copilot --help";
    default:
      return null;
  }
};

const isCopilotInstalled = async () => {
  console.log("  Checking if Copilot is installed...");
  try {
    let { stdout } = await promisifiedExec("copilot -v");
    myEmitter.emit(
      "END_TASK",
      `  Copilot ${stdout.trim().split(": ")[1]} detected`
    );
    return true;
  } catch (e) {
    return false;
  }
};

const installCopilot = async () => {
  let installCmd = getInstallationCommand();

  if (!installCmd) {
    console.log("  Operating system not supported.  Aborting...");
    return;
  }

  console.log(`  Installing AWS Copilot...`);

  try {
    await promisifiedExec(installCmd);
  } catch (e) {
    console.error(`error: ${e.message}`);
    return;
  }
  myEmitter.emit("END_TASK", "  AWS Copilot installation complete");
  myEmitter.emit("COPILOT_INSTALLED");
};

const nameAndLogo = `
                 ;+**=;
             :=+++- .-+#*-.
         .-+#+-..-*#+-  :=*#=:
      :=##=:  :--:  :=#*=.  -+#+:
   :+#*-. .=*#+--+%*-. .-*#+:  =%:==
  -%-  :+#*=. .-+#+==*#=:  =%: .%-.*#
  :=-*#+-  :=##=:      -+#*=%= .%- -%.
  :#+.  -+#%-.            :*%= .%- -%.
  +#  -%+:%+                %= .%- -%.   .d8888b  888  888 88888b.   8888b.  88888b.  .d8888b   .d88b.
  +#  **  %+                %= .%- -%.   88K      888  888 888 "88b     "88b 888 "88b 88K      d8P  Y8b
  +#  #*  %+                %= .%: -%.   "Y8888b. 888  888 888  888 .d888888 888  888 "Y8888b. 88888888
  +#  #*  %+                %= .%- -%.        X88 Y88b 888 888  888 888  888 888 d88P      X88 Y8b.
  +#  #*  %%-.            :+#. .%- -%.    88888P'  "Y88888 888  888 "Y888888 88888P"   88888P'  "Y8888
  +#  #*  %*=##=:      -+#*-  .*#. -%.                 888                   888
  -%- #*  +#: .-*#+==*#=:  :+#*=   **             Y8b d88P                   888
   :+:+#.  -*#+:  '''' .-*#+-  :=*#=               "Y88P"                    888
       =##=:  -+#*-::=#*=.  -+#*-.
         .-+#+-  .=*%#-.:=*#=:           ==============================================================
             :=#*=: .++++-.                        Welcome to Synapse's AWS Deployment Tool!
                .-+*+=                   ==============================================================
`;

const display = () => {
  clear();
  console.log(chalk.magenta(nameAndLogo) + "\n");
  completedTasks.forEach((task) =>
    console.log(`${chalk.greenBright("  ✔")} ${task}`)
  );
  if (completedTasks.length) console.log("");
  // console.log(cwd);
};

const run = async () => {
  display();

  myEmitter.on("END_TASK", (task) => {
    completedTasks.push(task);
    display();
  });

  myEmitter.on("COPILOT_INSTALLED", async () => {
    try {
      console.log(`  Initializing Copilot app '${appName}'...`);
      await promisifiedExec(`copilot app init ${appName}`, {
        cwd,
      });
      myEmitter.emit("END_TASK", `  '${appName}' stack created on AWS`);
      myEmitter.emit("APP_INITIALIZED");
    } catch (e) {
      console.error(e);
      return;
    }
  });

  // Install copilot (if necessary)
  if (!(await isCopilotInstalled())) {
    installCopilot();
  } else myEmitter.emit("COPILOT_INSTALLED");

  // // Init copilot environment
  // // TODO: AWS CLI profile configuration
  myEmitter.on("APP_INITIALIZED", () => {
    console.log("Initializing copilot environemnt...");
    const initCopilot = spawn(
      "copilot",
      ["env", "init", "-n", "prod", "--profile", "default", "--default-config"],
      { cwd }
    );

    initCopilot.on("exit", (code) => {
      if (parseInt(code) !== 0)
        console.error(
          `  Error Code ${code}: Failed to initialize copilot environment.`
        );
      myEmitter.emit("END_TASK", `  Environment successfully initialized`);
      myEmitter.emit("COPILOT_INITIALIZED");
    });

    initCopilot.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    initCopilot.stderr.on("data", (s) => {
      process.stdout.write(s);
    });
  });

  // Initialize Mongo
  myEmitter.on("COPILOT_INITIALIZED", async () => {
    console.log("  Initializing mongodb service...");
    try {
      let { stdout, stderr } = await promisifiedExec(
        `copilot svc init --name mongo --svc-type "Backend Service" --dockerfile ./mongo/Dockerfile.mongo`,
        {
          cwd,
        }
      );
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      myEmitter.emit("END_TASK", `  Mongo service successfully initialized`);
      myEmitter.emit("MONGO_INITIALIZED");
    } catch (e) {
      console.error(e);
      return;
    }
  });

  // Deploy mongodb container
  myEmitter.on("MONGO_INITIALIZED", () => {
    console.log("  Deploying mongodb container...");
    const mongoDeploy = spawn(
      "copilot",
      ["svc", "deploy", "--name", "mongo", "--env", "prod", "--force"],
      { cwd }
    );

    mongoDeploy.on("exit", (code) => {
      if (parseInt(code) !== 0)
        console.error(
          `  Error Code ${code}: Failed to deploy mongo container.`
        );
      myEmitter.emit("END_TASK", `  Mongo container successfully deployed`);
      myEmitter.emit("MONGO_DEPLOYED");
    });

    mongoDeploy.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    mongoDeploy.stderr.on("data", (s) => {
      process.stdout.write(s);
    });
  });

  // Initialize GUI
  myEmitter.on("MONGO_DEPLOYED", async () => {
    console.log("  Initializing GUI service...");
    try {
      let { stdout, stderr } = await promisifiedExec(
        `copilot svc init --name gui --svc-type "Load Balanced Web Service" --dockerfile ./server/Dockerfile.gui`,
        {
          cwd,
        }
      );
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      myEmitter.emit("END_TASK", `  GUI service successfully initialized`);
      myEmitter.emit("GUI_INITIALIZED");
    } catch (e) {
      console.error(e);
      return;
    }
  });

  // Deploy GUI
  // TODO: Gonna have to get GraphQL URL Endpoint
  myEmitter.on("GUI_INITIALIZED", () => {
    console.log("  Deploying GUI container...");
    const deployGUI = spawn(
      "copilot",
      ["svc", "deploy", "--name", "gui", "--env", "prod", "--force"],
      { cwd }
    );

    deployGUI.on("exit", (code) => {
      if (parseInt(code) !== 0) {
        console.error(`  Error Code ${code}: Failed to deploy GUI container.`);
      } else {
        myEmitter.emit("END_TASK", `  GUI container successfully deployed`);
        myEmitter.emit("GUI_DEPLOYED");
      }
    });

    deployGUI.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    deployGUI.stderr.on("data", (s) => {
      process.stdout.write(s);
    });
  });

  // Initialize Apollo
  myEmitter.on("GUI_DEPLOYED", async () => {
    console.log("  Initializing GraphQL service...");

    try {
      let { stdout, stderr } = await promisifiedExec(
        `copilot svc init --name apollo --svc-type "Load Balanced Web Service" --dockerfile ./server/Dockerfile.apollo`,
        {
          cwd,
        }
      );
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      myEmitter.emit("END_TASK", `  GraphQL service successfully initialized`);
      myEmitter.emit("APOLLO_INITIALIZED");
    } catch (e) {
      console.error(e);
      return;
    }
  });

  // Deploy Apollo
  myEmitter.on("APOLLO_INITIALIZED", () => {
    console.log("  Deploying GraphQL container...");
    const deployApollo = spawn(
      "copilot",
      ["svc", "deploy", "--name", "apollo", "--env", "prod", "--force"],
      { cwd }
    );

    deployApollo.on("exit", (code) => {
      if (parseInt(code) !== 0) {
        console.error(
          `  Error Code ${code}: Failed to deploy GraphQL container.`
        );
      } else {
        myEmitter.emit("END_TASK", `  GraphQL container successfully deployed`);
        myEmitter.emit("APOLLO_DEPLOYED");
      }
    });

    deployApollo.stdout.on("data", (s) => {
      process.stdout.write(s);
    });

    deployApollo.stderr.on("data", (s) => {
      process.stdout.write(s);
    });
  });

  myEmitter.on("APOLLO_DEPLOYED", async () => {
    try {
      let { stdout, stderr } = await promisifiedExec(
        `copilot svc show --name gui`,
        {
          cwd,
        }
      );

      let synapseURL;
      let stdoutLookup = stdout.match(/http\:\/\/.+\.com/);
      let stderrLookup = stderr.match(/http\:\/\/.+\.com/);

      if (stdoutLookup) synapseURL = stdoutLookup[0];
      if (stderrLookup) synapseURL = stderrLookup[0];

      if (!synapseURL)
        synapseURL =
          "  AWS isn't ready to provide a URL.  Try running 'copilot svc show --name gui' to see if your Synapse URL is ready";
      else
        synapseURL = `  Your Synapse Dashboard is available at: ${synapseURL}`;
      console.log(synapseURL);
    } catch (e) {
      console.error(
        `Error ${e}: Command to search for Synapse URL caused an error`
      );
      return;
    }
  });
};

run();
