import fs from "fs/promises";
import path from "path";

const TYPES = {
  DIRECTORY: "directory",
  FILE: "file",
};

export const ls = async (dir) => {
  const files = await fs.readdir(path.join(dir), { withFileTypes: true });

  const preparedFiles = files.map((file) => ({
    name: file.name,
    type: file.isDirectory() ? TYPES.DIRECTORY : TYPES.FILE,
  }));

  const result = preparedFiles.sort((file1, file2) => {
    if (file1.type === file2.type) {
      return file1.name.localeCompare(file2.name);
    }
    return file1.type.localeCompare(file2.type);
  });

  console.log(`Files in directory "${dir}":`);
  console.table(result);
};
