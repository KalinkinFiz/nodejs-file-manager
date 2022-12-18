import path from "path";

export const cd = async (pathToDirectory) => {
  try {
    pathToDirectory = path.isAbsolute(pathToDirectory)
      ? pathToDirectory
      : path.join(process.cwd(), pathToDirectory);

    process.chdir(pathToDirectory);
  } catch {
    throw new Error("Operation failed");
  }
};
