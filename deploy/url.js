import util from "util";
import { exec } from "child_process";
import events from "events";

const myEmitter = new events.EventEmitter();

const cwd = process.cwd().split("/").slice(0, -1).join("/");

const promisifiedExec = util.promisify(exec);

const run = async () => {
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

    console.log(synapseURL);

    myEmitter.emit("END_TASK");
  } catch (e) {
    console.error(`Error ${e}: Service info could not be displayed.`);
    return;
  }
};

run();
