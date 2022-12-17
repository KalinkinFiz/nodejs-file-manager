import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

export const mv = async (pathToFile, pathToNewDirectory) => {
  try {
    const fileName = pathToFile.slice(pathToFile.lastIndexOf(path.sep) + 1);

    await pipelineAsync(
      createReadStream(pathToFile),
      createWriteStream(path.join(pathToNewDirectory, fileName))
    );

    await rm(pathToFile);
  } catch {
    throw new Error("Operation failed");
  }
};
