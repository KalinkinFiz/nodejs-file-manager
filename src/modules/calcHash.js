import path from "path";
import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

export const calcHash = async (pathToFile) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(process.cwd(), pathToFile);

    const hash = createHash("sha256");
    const input = createReadStream(pathToFile);

    await pipelineAsync(input, hash);

    console.log(hash.digest("hex"));
  } catch {
    throw new Error("Operation failed");
  }
};
