import fs from "fs/promises";
import path from "path";

export const ls = async (dir) => {
  const files = await fs.readdir(path.join(dir), { withFileTypes: true });

  const preparedFiles = files.map((file) => ({
    Name: file.name,
    Type: file.isDirectory() ? "directory" : "file",
  }));
  const sortedFiles = preparedFiles.sort((firstFile, secondFile) => {
    if (firstFile.Type === secondFile.Type) {
      return firstFile.Name > secondFile.Name ? 1 : -1;
    } else {
      return firstFile.Type > secondFile.Type ? 1 : -1;
    }
  });

  console.log(`Files in directory ${dir}:`);
  console.table(sortedFiles);
};

await ls("../../");
