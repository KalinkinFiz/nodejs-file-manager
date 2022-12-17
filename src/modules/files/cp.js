import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

const pipelineAsync = promisify(pipeline);

export const copy = async (pathToFile, pathToNewDirectory) => {
  try {
    const fileName = pathToFile.slice(pathToFile.lastIndexOf(path.sep) + 1);

    await pipelineAsync(
      createReadStream(pathToFile),
      createWriteStream(path.join(pathToNewDirectory, fileName))
    );
  } catch {
    throw new Error("Operation failed");
  }
};
