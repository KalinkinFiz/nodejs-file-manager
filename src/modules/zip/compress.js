import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

const pipelineAsync = promisify(pipeline);

export const compress = async (pathToFile, pathToDestination) => {
  let fileName = pathToFile.split(path.sep).pop();

  const input = createReadStream(pathToFile);
  const zip = createBrotliCompress();
  const output = createWriteStream(
    path.join(pathToDestination, `${fileName}.br`),
    {
      flags: "wx",
    }
  );

  try {
    await pipelineAsync(input, zip, output);
  } catch (err) {
    console.log(err.stack);
    //throw new Error("Operation failed");
  }
};

await compress("../calcHash.js", "../");
