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

  // Deploy Apollo
  console.log("  Redeploying GraphQL container...");
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
      myEmitter.emit("END_TASK", `  GraphQL container successfully redeployed`);
      myEmitter.emit("APOLLO_DEPLOYED");
    }
  });

  deployApollo.stdout.on("data", (s) => {
    process.stdout.write(s);
  });

  deployApollo.stderr.on("data", (s) => {
    process.stdout.write(s);
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
