import fs from "fs/promises";
import path from "path";

export const ls = async (dir) => {
  const files = await fs.readdir(path.join(dir));

  console.log(`Files in directory ${dir}:`);
  console.log(files);
};

await ls("./");
