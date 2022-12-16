import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

const pipelineAsync = promisify(pipeline);

export const decompress = async (pathToFile, pathToDestination) => {
  try {
    let fileName = pathToFile.split(path.sep).pop();

    if (!fileName.endsWith(".br")) throw new Error("No br file");

    fileName = fileName.slice(0, -3);

    const input = createReadStream(pathToFile);
    const zip = createBrotliDecompress();
    const output = createWriteStream(path.join(pathToDestination, fileName), {
      flags: "wx",
    });

    await pipelineAsync(input, zip, output);
  } catch (err) {
    console.log(err.stack);
    //throw new Error("Operation failed");
  }
};

await decompress("../../calcHash.js.br", "./");
