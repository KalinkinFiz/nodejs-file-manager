import { createReadStream } from "fs";
import { stdout } from "process";
import { finished } from "stream/promises";

export const cat = async (pathToFile) => {
  try {
    const readableStream = createReadStream(pathToFile);

    readableStream.on("data", (chunk) => {
      stdout._write(chunk);
    });
    await finished(readableStream);
  } catch {
    throw new Error("Operation failed");
  }
};

cat("../os.js");
