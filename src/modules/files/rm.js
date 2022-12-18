import path from "path";
import { rm } from "fs/promises";

export const remove = async (pathToFile) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(process.cwd(), pathToFile);

    await rm(pathToFile);
  } catch {
    throw new Error("Operation failed");
  }
};
