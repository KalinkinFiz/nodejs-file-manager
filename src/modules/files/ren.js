import { rename } from "fs/promises";
import path from "path";

export const ren = async (pathToFile, newFileName) => {
  try {
    pathToFile = path.isAbsolute(pathToFile)
      ? pathToFile
      : path.join(process.cwd(), pathToFile);

    const pathToDirectory = pathToFile.slice(
      0,
      pathToFile.lastIndexOf(path.sep)
    );

    await rename(pathToFile, path.join(pathToDirectory, newFileName));
  } catch {
    throw new Error("Operation failed");
  }
};
