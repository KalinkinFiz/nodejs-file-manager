import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

export const copy = async (pathToFile, pathToNewDirectory) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(process.cwd(), pathToFile);

    pathToNewDirectory = path.isAbsolute(pathToNewDirectory)
      ? pathToNewDirectory
      : path.join(process.cwd(), pathToNewDirectory);

    const fileName = pathToFile.slice(pathToFile.lastIndexOf(path.sep) + 1);

    await pipelineAsync(
      createReadStream(pathToFile),
      createWriteStream(path.join(pathToNewDirectory, fileName))
    );
  } catch {
    throw new Error("Operation failed");
  }
};
