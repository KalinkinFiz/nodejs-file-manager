import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const SEPARATOR = path.sep;

export const compress = async (pathToFile, pathToDestination) => {
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

  const stats = await stat(pathToFile);

  if (!stats.isFile()) {
    throw new Error("No file");
  }

  const input = createReadStream(pathToFile);
  const zip = createBrotliCompress();
  const output = createWriteStream(
    path.join(pathToDestination, `${fileName}.br`),
    { flags: "w" }
  );

  try {
    await pipelineAsync(input, zip, output);
  } catch {
    throw new Error("Operation failed");
  }
};
