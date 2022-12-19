import { createInterface } from "readline/promises";
import { homedir } from "os";

import * as modules from "./modules/index.js";

const args = process.argv[2];

export const readline = async (args) => {
  if (!args) {
    console.log("Please enter user name (--username=your_name)");
    return;
  }

  const userName = modules.getUserName();

  if (userName.length) {
    console.log(`Welcome to the File Manager, ${userName}!`);
    process.chdir(homedir());
    console.log(`You are currently in ${process.cwd()}`);
  } else {
    console.log("Please enter user name (--username=your_name)");
    return;
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (line) => {
    const [command, argument, secArgument] = line.includes('"')
      ? line
          .split('"')
          .map((item) => item.trim())
          .filter((item) => item)
      : line.split(" ");
    try {
      switch (command) {
        case ".exit": {
          rl.close();
          return;
        }
        case "cat": {
          await modules.cat(argument);
          break;
        }
        case "add": {
          await modules.add(argument);
          break;
        }
        case "rn": {
          await modules.ren(argument, secArgument);
          break;
        }
        case "cp": {
          await modules.copy(argument, secArgument);
          break;
        }
        case "mv": {
          await modules.mv(argument, secArgument);
          break;
        }
        case "rm": {
          await modules.remove(argument);
          break;
        }
        case "up": {
          await modules.up();
          break;
        }
        case "ls": {
          await modules.ls();
          break;
        }
        case "cd": {
          await modules.cd(argument);
          break;
        }
        case "os": {
          await modules.castomOS(argument);
          break;
        }
        case "hash": {
          await modules.calcHash(argument);
          break;
        }
        case "compress": {
          await modules.compress(argument, secArgument);
          break;
        }
        case "decompress": {
          await modules.decompress(argument, secArgument);
          break;
        }
        default: {
          console.log("Invalid input");
        }
      }
      console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
      console.log(err.message);
    }
  });

  rl.on("close", () =>
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  );
};

await readline(args);
