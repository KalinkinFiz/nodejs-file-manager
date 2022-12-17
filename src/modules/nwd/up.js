import path from "path";
import { homedir } from "os";

export const up = async (currentPath) => {
  const { root } = path.parse(homedir());
  return currentPath === root ? currentPath : path.join(currentPath, "../");
};
