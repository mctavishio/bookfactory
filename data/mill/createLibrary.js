const fs = require("fs");
const books = require("./librarybooks.js");
// const algorithms = require("./algorithms.js");
const ejs = require("ejs");
let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();
let librarymatrix = {};

let algorithms = books.reduce( (acc,book,j) => {
	if(!acc.hasOwnProperty(book.algorithmid)) { acc[book.algorithmid] = [ book ] } 
	else { acc[book.algorithmid].push(book) }
	return acc;
}, {});
librarymatrix["algorithms"] = algorithms;

let seeds = books.reduce( (acc,book,j) => {
	if(!acc.hasOwnProperty(book.seedid)) { acc[book.seedid] = [ book.id ] } 
	else { acc[book.seedid].push(book.id) }
	return acc;
}, {});
librarymatrix["seeds"] = seeds;

let printruns = books.reduce( (acc,book,j) => {
	if(!acc.hasOwnProperty(book.timestamp)) { acc[book.timestamp] = [ book.id ] } 
	else { acc[book.timestamp].push(book.id) }
	return acc;
}, {});
librarymatrix["printruns"] = printruns;

let pigments = books.reduce( (acc,book,j) => {
	book.pigments.forEach(pigment => {
		if(!acc.hasOwnProperty(pigment)) { acc[pigment] = [ book.id ]  } 
		else { acc[pigment].push(book.id) }
	});
	return acc;
}, {});
librarymatrix["pigments"] = pigments;

let pigmentsets = books.reduce( (acc,book,j) => {
	let set = book.pigments.sort().join(",");
	if(!acc.hasOwnProperty(set)) { acc[set] = [ book.id ]  } 
	else { acc[set].push(book.id) }
	return acc;
}, {});
librarymatrix["pigmentsets"] = pigmentsets;

let dimensions = books.reduce( (acc,book,j) => {
	let dimension = book.dimensions.width + "x" + book.dimensions.height + "_"+book.dimensions.name;
	if(!acc.hasOwnProperty(dimension)) { acc[dimension] = [ book.id ]  } 
	else { acc[dimension].push(book.id) }
	return acc;
}, {});
librarymatrix["dimensions"] = dimensions;

// console.log("librarymatrix = " + "librarymatrix = " + JSON.stringify(librarymatrix,null,"\t"));
let librarymatrixfile = "librarymatrix_"+timestamp+".js";
fs.writeFileSync(librarymatrixfile, "librarymatrix = " + JSON.stringify(librarymatrix,null,"\t"), (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
  }
});

books.forEach( (book, j, bookarr) => {
	ejs.renderFile("book.ejs", {p:book}, (err, result) => {
	    if (err) {
	        console.log('info', 'error encountered: ' + err);
	        // throw err;
	    }
	    else {
	        try {
	        	 console.log("./"+ (book.directory).substring(1)+"/index.html");
	            fs.writeFileSync("./"+(book.directory).substring(1)+"/index.html", result, 'utf8');
	            // fs.writeFileSync("./index_"+book.id+".html", result, 'utf8');
	        } catch(err) {
	            if (err) {
	                throw err;
	            }
	        }
	    }
	});
});

// algorithms.forEach( a => {
// 	let bookssubset = books.filter( book => book.algorithmid===a ).sort( (a,b)=>{ return b.timestamp - a.timestamp});
// 	let p = {
// 		timestamp: timestamp,
// 		datetime: datetime,
// 		algorithmid: a,
// 		books: bookssubset
// 	}
// 	console.log('books subset = ' + bookssubset.map(b=>b.timestamp));
// 	ejs.renderFile("algorithm.ejs", {p:p}, (err, result) => {
// 	    if (err) {
// 	        console.log('info', 'error encountered: ' + err);
// 	    }
// 	    else {
// 	        try {
// 	            fs.writeFileSync("../../index_algorithm-"+a+".html", result, 'utf8');
// 	        } catch(err) {
// 	            if (err) {
// 	                throw err;
// 	            }
// 	        }

// 	    }
// 	});

// 	bookssubset.forEach( (book, j, bookarr) => {
// 		// console.log("book = " + JSON.stringify(book));
// 		// console.log("books = " + JSON.stringify(bookarr));
// 		p.printrun = book.printrun;
// 		ejs.renderFile("book.ejs", {p:p}, (err, result) => {
// 		    if (err) {
// 		        console.log('info', 'error encountered: ' + err);
// 		        // throw err;
// 		    }
// 		    else {
// 		        try {
// 		            fs.writeFileSync("../../books/algorithm-"+a+"_printrun-"+book.printrun+"_book/index.html", result, 'utf8');
// 		        } catch(err) {
// 		            if (err) {
// 		                throw err;
// 		            }
// 		        }

// 		    }
// 		});

// 	});
// });

// (()=>{
// let catalogue = algorithms.map( a => {
// 	let bookssubset = books.filter( book => book.algorithm===a );
// 	return { algorithm: a, printrun: bookssubset[0].printrun } 
// });
// let p = {
// 	datetime: datetime,
// 	algorithms: catalogue,
// 	library: books
// }
// ejs.renderFile("library.ejs", {p:p}, (err, result) => {
//     if (err) {
//         console.log('info', 'error encountered: ' + err);
//         // throw err;
//     }
//     else {
//         try {
//             fs.writeFileSync("../../index.html", result, 'utf8');
//         } catch(err) {
//             if (err) {
//                 throw err;
//             }
//         }

//     }
// });
// })();
