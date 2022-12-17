import * as modules from "./modules/index.js";

// files
await modules.add("ad.txt");
await modules.cat("./modules/os.js");
await modules.copy("./ad.txt", "../");
await modules.mv("./ad.txt", "../");
await modules.rename("../ad.txt", "ttt.md");
await modules.remove("../ad.txt");

// nwd
await modules.ls("../../");
await modules.up("c:\\Users\\kalin");

// zip
await modules.compress("./modules/calcHash.js", "./");
await modules.decompress("./modules/calcHash.js.br", "./");

// hash
await modules.calcHash("./modules/files/cat.js");

// os
modules.castomOS("cpus");

// clear testing data
await modules.remove("./ttt.md");
await modules.remove("./modules/calcHash.js.br");
