import { writeFile } from "fs/promises";

export const add = async (newFileName) => {
  try {
    await writeFile(newFileName, "");
  } catch {
    throw new Error("Operation failed.");
  }
};

await add("ad.txt");
