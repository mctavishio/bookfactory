const PDFDocument = require("pdfkit");
// const PDFImage = require("pdf-image").PDFImage;
const fs = require("fs");
const tools = require("./tools.js");
const algorithms = require("./algorithms.js");
const bookseeds = require("./bookseeds.js");
const prefix = "mct";
const datetime = new Date();
const timestamp = datetime.getTime();
const datetimestr = datetime.toDateString();
const datetimeISOstr = datetime.toISOString();
const librarybooksold = require("./librarybooks_old");
let newbooks = [];

let librarydir = "books_" + timestamp;
if (!fs.existsSync(librarydir)){
    fs.mkdirSync(librarydir);
}
bookseeds.forEach( seed => {
	algorithms.forEach( algo => {
		let id = prefix + "_" + algo.id + "_" + seed.id  + "_t-" + timestamp;

		let dir = id;
		if (!fs.existsSync(dir)){
		    fs.mkdirSync(dir);
		}

		// newbooks.push({dir:dir, algorithm:algo.id, timestamp:timestamp, size:seed.dimensions.name, seed:seed.id});
		console.log("algoid = " + algo.id);
		let book = {
			id,
			timestamp, datetimestr, datetimeISOstr,
			algorithmid: algo.id,
			seedid: seed.id,
			directory: "/" + librarydir + "/" + dir,
			npages: seed.npages,
			colors: seed.colors(seed.pigments, seed.mixer),
			dimensions: seed.dimensions,
			pigments: seed.pigments.filter(pigment=>pigment[1]>0).map(pigment=>pigment[2]),
			author: "mctavish",
		};
		// console.log("book = " + JSON.stringify(book));
		newbooks.push({...book});

		let drawings = [...Array(seed.npages).keys()].reduce( (pagematrix, pagej) => {
			let p = {
				width: seed.dimensions.width,
				height: seed.dimensions.height,
				min: Math.min(seed.dimensions.width, seed.dimensions.height),
				max: Math.max(seed.dimensions.width, seed.dimensions.height),
				colors: book.colors
			};
			let layers = algo.draw(p);
			return  pagematrix.concat({layers});
		}, []);
		book.drawings = drawings;
		book.drawings.forEach( (page,p) => {
			let pageid = book.id + "_" + (p+1).toString().padStart(3, "0");
			let file = "page" + (p+1).toString().padStart(3, "0") + ".pdf";
			let info = {id:pageid,timestamp:book.timestamp,datetimestr:book.datetimestr,algorithmid:book.algorithmid,seedid:book.seedid,directory:book.directory,npages:book.npages,Author:book.author,Subject:"generative drawing series",Keywords: "net.art, webs, networks, generative, algorithmic" };
			// console.log("*** " + JSON.stringify([book].map( b => { return {id:pageid,timestamp,datetimestr,datetimeISOstr,algorithmid,seedid,directory,npages,Author:book.author,Subject:"generative drawing series",Keywords: "net.art, webs, networks, generative, algorithmic" } } )[0]) );
			let doc = new PDFDocument(
			{ 
				size: [seed.dimensions.width,seed.dimensions.height],
				info: info,
				// bufferPages: true
			});

			doc.font("Courier-Bold");
			doc.pipe(fs.createWriteStream(dir+"/"+file));
			doc.fontSize(18);
			page.layers.forEach( (layer,l) => {
				layer.rects.forEach( (rect,j) => {
					let { x, y, width, height, lineWidth, dash, space, strokeOpacity, fillOpacity, strokeColor, fillColor } = rect;
					if(fillOpacity!==0) {
						doc.rect(x, y, width, height).fillColor(fillColor).fill();
					}
					if(strokeOpacity!==0) {
						doc.rect(x, y, width, height).strokeColor(strokeColor).dash(dash, {space:space}).lineWidth(lineWidth).stroke();
					}
				});
				layer.lines.forEach( (line,j) => {
					let { x1, x2, y1, y2, lineWidth, dash, space, strokeOpacity, fillOpacity, strokeColor, fillColor } = line;
					doc.moveTo(x1,y1).lineTo(x2,y2).strokeColor(strokeColor).dash(dash, {space:space}).lineWidth(lineWidth).stroke();
				});
				layer.circles.forEach( (circ,j) => {
					let { cx, cy, r, lineWidth, dash, space, strokeOpacity, fillOpacity, strokeColor, fillColor } = circ;
					if(fillOpacity!==0) {
						doc.circle(cx, cy, r).fillColor(fillColor).fillOpacity(1).fill();	}
					if(strokeOpacity!==0) {
						doc.circle(cx, cy, r).fillOpacity(0).strokeColor(strokeColor).dash(dash, {space:space}).lineWidth(lineWidth).stroke();
					}
				});
			});
			doc.end();
			p < seed.npages-1 ? doc.addPage() : "done";
		});
		fs.writeFileSync(dir+"/parameters.js", "let p = " + JSON.stringify(book,null,"\t"), (err) => {
		  if (err)
		    console.log(err);
		  else {
		    console.log("File written successfully\n");
		  }
		});
	});
});
let librarybookfile = "librarybooks_"+timestamp+".js";
fs.writeFileSync(librarybookfile, "module.exports = " + JSON.stringify(newbooks,null,"\t"), (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
  }
});
let newlibrary = librarybooksold.reduce( (acc,book,j) => {
	acc.push({...book});
	return acc;
},[]);
newbooks.forEach(book => {
	newlibrary.push({...book});
	});
fs.writeFileSync("librarybooks.js", "module.exports = " + JSON.stringify(newlibrary,null,"\t"), (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
  }
});

let nextSteps = "";
let nextstepsfile = "nextSteps_"+timestamp+".sh";
newbooks.map(b=>b.id).forEach( dir => {
	nextSteps = nextSteps + `
cd ${dir}
for file in *.pdf; do magick convert $file -resize 1920 $file.png; done;
for file in *pdf.png; do mv "$file" "$\{file/.pdf.png/.png\}"; done;
for file in *.png; do magick convert $file -resize 640 $file.small.png; done;
for file in *png.small.png; do mv "$file" "$\{file/.png.small.png/-small.png\}"; done;
pdfunite *.pdf book.pdf
ffmpeg -framerate 1 -i page%03d.png -c:v libx264 -r 24 -pix_fmt yuv420p book.mp4
cd ..
cp McTavishResume202011_extensive.pdf ${dir}
zip ${dir}.zip ${dir}
mv ${dir}.zip ${dir}/book.zip
mv ${dir} ${librarydir}
`;
});
nextSteps = nextSteps + `
cp ${nextstepsfile} ${librarydir}/nextSteps.sh
mv ${librarybookfile} ${librarydir}/library.js
mv librarybooks_old.js librarybooks_older.js
gsutil -m cp -r ${librarydir} gs://bookfactory/
`;

fs.writeFileSync(nextstepsfile, nextSteps, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
  }
});


