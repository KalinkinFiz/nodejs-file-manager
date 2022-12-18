import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const SEPARATOR = path.sep;

export const decompress = async (pathToFile, pathToDestination) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(process.cwd(), pathToFile);

    pathToDestination = path.isAbsolute(pathToDestination)
      ? pathToDestination
      : path.join(process.cwd(), pathToDestination);

    const fileNames = pathToFile.split(SEPARATOR);

    let fileName = "";
    if (Array.isArray(fileNames)) fileName = fileNames.pop();
    else throw new Error("No file");

    if (!fileName.endsWith(".br")) throw new Error("No br file");

    const stats = await stat(fileName);

    if (!stats.isFile()) {
      throw new Error("No file");
    }

    fileName = fileName.slice(0, -3);

    const input = createReadStream(pathToFile);
    const zip = createBrotliDecompress();
    const output = createWriteStream(path.join(pathToDestination, fileName), {
      flags: "w",
    });

    await pipelineAsync(input, zip, output);
  } catch {
    throw new Error("Operation failed");
  }
};
