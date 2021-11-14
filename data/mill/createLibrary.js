const fs = require("fs");
const books = require("./books");
const ejs = require("ejs");

var ejs  = require('ejs');
var fs   = require('fs');
var data = {} // put your data here.  

var template = fs.readFileSync('./template.ejs', 'utf-8');
var html     = ejs.render ( template , data );

fs.writeFileSync("./html.html", html, 'utf8');

let booksinfo = books.reduce( (acc,book,j) => {
	fs.readdir(book, (err, files) => {
		if (err)
			console.log(err);
		else {
			console.log("\ncurrent directory filenames: " + files.join("\n"));
			// console.log("\nCurrent directory filenames filtered: " + files.filter(file => file.includes(".png")).join("\n"));
			let info = files.filter(file => { return file.includes("parameters") } );
			
			console.log("info = " + JSON.stringify(info));
			// fs.writeFileSync(dirname+"/" + "filmparameters.js", JSON.stringify(film,null,"\t"), (err) => {
			// 	if (err)
			// 		console.log(err);
			// 	else {
			// 		console.log("filmparameters written successfully\n");
			// 	}
			// });
			const html = await ejs
      .renderFile("page.ejs", { book: })
      .then((output) => output);
    //create file and write html
    await writeFile("dist/index.html", html, "utf8");
		}
	})
}, [] );

ejs.renderFile(path.join(__dirname, '../views/template.ejs'), data, (err, result) => {
    if (err) {
        logger.log('info', 'error encountered: ' + err);
        // throw err;
    }
    else {
        try {
            fs.writeFileSync('./html.html', result, 'utf8');
        } catch(err) {
            if (err) {
                throw err;
            }
        }

    }
});

