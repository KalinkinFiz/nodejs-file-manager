export const up = async () => {
  try {
    process.chdir("..");
  } catch {
    throw new Error("Operation failed");
  }
};
