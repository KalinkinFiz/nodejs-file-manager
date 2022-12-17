import { writeFile } from "fs/promises";

export const add = async (fileName) => {
  try {
    await writeFile(fileName, "");
  } catch {
    throw new Error("Operation failed");
  }
};
