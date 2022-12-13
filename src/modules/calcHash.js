import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

export const calcHash = async (pathToFile) => {
  try {
    const hash = createHash("sha256");
    const input = createReadStream(pathToFile);

    await pipelineAsync(input, hash.setEncoding("hex"), process.stdout);
  } catch {
    throw new Error("Operation failed");
  }
};

await calcHash("./files/cat.js");
