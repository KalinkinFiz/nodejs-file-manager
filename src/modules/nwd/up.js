import path from "path";
import { homedir } from "os";

export const up = async (currentPath) => {
  return currentPath === path.parse(homedir()).root
    ? currentPath
    : path.join(currentPath, "../");
};

await up("c:\\Users\\kalin");
