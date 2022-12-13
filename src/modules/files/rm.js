import { rm } from "fs/promises";

export const remove = async (pathToFile) => {
  try {
    await rm(pathToFile);
  } catch {
    throw new Error("Operation failed");
  }
};

await remove("./ad.txt");
