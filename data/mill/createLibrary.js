const fs = require("fs");
const books = require("./books");
const ejs = require("ejs");
let datetime = new Date();

let algorithms = books.reduce( (acc,book,j) => {
	if(!acc.includes(book.algorithm)) { acc.push(book.algorithm) } 
	return acc;
}, []).sort( (a,b) => { return b - a });

console.log("algorithms = " + algorithms);
algorithms.forEach( a => {
	let bookssubset = books.filter( book => book.algorithm===a ).sort( (a,b)=>{ return b.printrun - a.printrun});
	let p = {
		datetime: datetime,
		algorithm: a,
		books: bookssubset,
		library: books
	}
	console.log('books subset = ' + bookssubset.map(b=>b.printrun));
	ejs.renderFile("algorithm.ejs", {p:p}, (err, result) => {
	    if (err) {
	        console.log('info', 'error encountered: ' + err);
	    }
	    else {
	        try {
	            fs.writeFileSync("../../index_algorithm-"+a+".html", result, 'utf8');
	        } catch(err) {
	            if (err) {
	                throw err;
	            }
	        }

	    }
	});

	bookssubset.forEach( (book, j, bookarr) => {
		// console.log("book = " + JSON.stringify(book));
		// console.log("books = " + JSON.stringify(bookarr));
		p.printrun = book.printrun;
		ejs.renderFile("book.ejs", {p:p}, (err, result) => {
		    if (err) {
		        console.log('info', 'error encountered: ' + err);
		        // throw err;
		    }
		    else {
		        try {
		            fs.writeFileSync("../../books/algorithm-"+a+"_printrun-"+book.printrun+"_size-AR16x9_book/index.html", result, 'utf8');
		        } catch(err) {
		            if (err) {
		                throw err;
		            }
		        }

		    }
		});

	});
});

(()=>{
let catalogue = algorithms.map( a => {
	let bookssubset = books.filter( book => book.algorithm===a );
	return { algorithm: a, printrun: bookssubset[0].printrun } 
});
let p = {
	datetime: datetime,
	algorithms: catalogue,
	library: books
}
ejs.renderFile("library.ejs", {p:p}, (err, result) => {
    if (err) {
        console.log('info', 'error encountered: ' + err);
        // throw err;
    }
    else {
        try {
            fs.writeFileSync("../../index.html", result, 'utf8');
        } catch(err) {
            if (err) {
                throw err;
            }
        }

    }
});
})();
