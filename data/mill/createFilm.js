const fs = require('fs');
const path = require('path');

// console.log(process.argv);
let args = process.argv.slice(2);
// console.log("my args: ", args);
console.log("first arg: ", args[0]);

const tools = {
			randominteger: (min, max) => {
				return Math.floor( min + Math.random()*(max-min));
			}
		};

// let dirname = args[0].includes("dir=") ? args[0].substr(4) : __dirname;
let dirname =  args[0]!==null ? args[0] : __dirname;

console.log("dirname= " + dirname);
// let corefiles = [];
fs.readdir(dirname, (err, files) => {
	if (err)
		console.log(err);
	else {
		console.log("\nCurrent directory filenames: " + files.join("\n"));
		// console.log("\nCurrent directory filenames filtered: " + files.filter(file => file.includes(".png")).join("\n"));
		let corefiles = files.filter(file => { return file.includes("coreimage") && file.includes(".png") } );
		console.log("corefiles = " + corefiles);

		let film = corefiles.map( file => { return { file: file, n: tools.randominteger(1,1) } });
		film.push(...corefiles.map( file => { return { file: file, n: tools.randominteger(1,4) } }));
		film.push(...corefiles.map( file => { return { file: file, n: tools.randominteger(3,6) } }));
		console.log("film = " + JSON.stringify(film));
		let count = 0;
		film.forEach( (frame, j) => {
			let file = frame.file;
			[...Array(frame.n).keys()].forEach( k => {
				++count;
				console.log(dirname+"/"+file);
				fs.copyFileSync( dirname+"/"+file, dirname+"/"+"image-" + count.toString().padStart(6, "0") + ".png");
			});
		});
	}
})



// fs.writeFileSync(dirname+"/" + "filmparameters.js", JSON.stringify(film,null,"\t"), (err) => {
//   if (err)
//     console.log(err);
//   else {
//     console.log("File written successfully\n");
//   }
// });