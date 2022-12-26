import os from "os";

export const castomOS = async (param) => {
  const isCommandWrong = param.startsWith("--");

  if (!isCommandWrong) {
    throw new Error("Invalid input");
  }

  const command = param.replace("--", "");

  switch (command) {
    case "EOL": {
      console.log(`${param}: ${JSON.stringify(os.EOL)}`);
      break;
    }
    case "cpus": {
      const cpus = os.cpus();

      const result = cpus.map(({ speed, model }) => {
        const speedGHz = (speed / 1000).toFixed(2);
        return { model, speed: `${speedGHz} GHz` };
      });

      console.table(result);
      break;
    }
    case "homedir": {
      console.log(`${param}: ${os.homedir()}`);
      break;
    }
    case "username": {
      console.log(`${param}: ${os.userInfo().username}`);
      break;
    }
    case "architecture": {
      console.log(`${param}: ${os.arch()}`);
      break;
    }
    default: {
      console.log("Invalid input");
    }
  }
};
