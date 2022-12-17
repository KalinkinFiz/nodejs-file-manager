import * as modules from "./modules/index.js";

// files
await modules.add("ad.txt");
await modules.cat("./modules/os.js");
await modules.copy("./ad.txt", "../");
await modules.mv("./ad.txt", "../");
await modules.rename("../ad.txt", "ttt.md");
await modules.remove("../ttt.md");

// nwd
await modules.ls("./modules");
await modules.up("c:\\Users\\kalin");

// // zip
await modules.compress("./modules/calcHash.js", "./");
await modules.decompress("./calcHash.js.br", "./");

// // hash
await modules.calcHash("./modules/files/cat.js");

// // os
await modules.castomOS("cpus");

// // clear testing data
await modules.remove("./ttt.md");
await modules.remove("./calcHash.js.br");
await modules.remove("./calcHash.js");
