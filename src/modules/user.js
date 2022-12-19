const args = process.argv[2];

export const getUserName = () => {
  const param = args.slice(2).split("=");
  const [key, username] = param;

  if (key === "username") {
    return username;
  } else {
    return "";
  }
};
