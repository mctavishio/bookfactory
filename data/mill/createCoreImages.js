const fs = require('fs');
const path = require('path');

console.log(process.argv);
let args = process.argv.slice(2);
console.log("my args: ", args);
console.log("first arg: ", args[0]);

// let dirname = args[0].includes("dir=") ? args[0].substr(4) : __dirname;
let dirname =  args[0]!==null ? args[0] : __dirname;

// fs.readdir(dirname, (err, files) => {
// 	if (err)
// 		console.log(err);
// 	else {
// 		console.log("\nCurrent directory filenames:");
// 		files.filter(file => file.includes(".png")).forEach( (file,j) => {
// 			fs.renameSync( dirname+"/"+file, dirname+"/"+file.replace("-0", "") );
// 		})
// 	}
// })
console.log("\nCurrent directory  " + dirname);
fs.readdir(dirname, (err, files) => {
	if (err)
		console.log(err);
	else {
		console.log("\nCurrent directory filenames: " + files.join("\n"));
		console.log("\nCurrent directory filenames filtered: " + files.filter(file => file.includes(".png")).join("\n"));
		files.filter(file => file.includes(".png")).forEach( (file,j) => {
			console.log("copy: " + dirname+"/"+file);
			console.log("corefilename = " + path.parse(file).name);
			console.log("to: " + "image" + (j+1).toString().padStart(6, "0")+".png");
			fs.copyFileSync(dirname+"/"+file, dirname + "/coreimage-" + (j+1).toString().padStart(6, "0")+".png");
		  	// console.log(file);
		})
	}
})