import path from "path";
import { createReadStream } from "fs";

const createReadStreamAsync = (pathToFile, options = {}) =>
  new Promise((resolve, reject) => {
    let data = "";

    createReadStream(pathToFile, options)
      .on("data", (chunk) => (data += chunk))
      .on("error", (error) => reject(error))
      .on("end", () => resolve(data));
  });

export const cat = async (pathToFile) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(process.cwd(), pathToFile);

    const data = await createReadStreamAsync(pathToFile);
    console.log(data);
  } catch {
    throw new Error("Operation failed");
  }
};
