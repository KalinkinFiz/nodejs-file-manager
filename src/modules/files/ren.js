import fs from "fs/promises";

export const rename = async (pathToFile, newFileName) => {
  try {
    await fs.rename(pathToFile, newFileName);
  } catch {
    throw new Error("Operation failed");
  }
};
