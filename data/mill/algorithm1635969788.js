const PDFDocument = require("pdfkit");
const PDFImage = require("pdf-image").PDFImage;
const fs = require('fs');

const tools = ( () => {
	return {
			randominteger: (min, max) => {
				return Math.floor( min + Math.random()*(max-min));
			},
			pigments: {
				black: "#191918",
				white: "#fcfbe3",
				blue: "#006699",
				red: "#9a0000",
				yellow: "#ffcc00",
				gray: "#898988",
				darkgray: "#4b4b44"
			},
			reifyWeightedArray: arr => {
				return arr.reduce( (acc, item, j) => {
					Array.prototype.push.apply(acc,[...Array(item[1]).keys()].reduce( (acc2,k) => { acc2.push(item[0]); return acc2 },[]) );
					return acc;
				}, []);
			}
		}
})( );

const algorithmtimestamp = "1635969788";
const printruntimestamp = Date.now();
const printrundatetime = new Date(printruntimestamp).toString();
const seed = {
	dimensions: [ 
		// {width: (9)*72, height: (9)*72, name: "9x9"},
		// {width: (16)*72, height: (9)*72, name: "16x9"},
		// {width: 1920, height: 1080, name: "1920x1080"},
		// {width: 1920, height: 1080, name: "AR16x9"},
		{width: 16*300, height: 9*300, name: "AR16x9"}
	],
	margins: { top: Math.floor(.8*72),bottom:Math.floor(.8*72),left:Math.floor(.9*72),right:Math.floor(.9*72) },
	printrunid: printruntimestamp.toString(),
	algorithmid: algorithmtimestamp,
	titleprefix: "algorithm id : " + algorithmtimestamp + " " + "printrun id : " + printrundatetime,
	doctitleprefix: "algorithm-" + algorithmtimestamp + "_" + "printrun-" + printruntimestamp.toString(),
	npages: 48,
	pigments: [ [tools.pigments.black,6, "black"], [tools.pigments.white,10,"white"], [tools.pigments.blue, 1,"blue"], [tools.pigments.yellow, 0,"yellow"], [tools.pigments.red, 0,"red"]],
}

let colors = tools.reifyWeightedArray(seed.pigments);

seed.dimensions.forEach( dimension => {

	let title = seed.titleprefix +  " (size : " + dimension.name + ")";
	let doctitle = seed.doctitleprefix +  "_size-" + dimension.name;
	let foldername = "./" + doctitle + "_book";
	let dir = foldername;
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	let book = {
		id: doctitle,
		algorithmid: algorithmtimestamp,
		printrunid: printruntimestamp.toString(),
		timestamp: printruntimestamp.toString(),
		datetime: printrundatetime,
		title: title,
		foldername: foldername,
		npages: seed.npages,
		colors: seed.pigments,
		dimensions: dimension,
		pigments: seed.pigments.filter(pigment=>pigment[1]>0).map(pigment=>pigment[2]),
		author: "mctavish",
	};

	//pages:
	let width = dimension.width, height = dimension.height, min = Math.min(width,height), max = Math.max(width,height);
	let drawings = [...Array(seed.npages).keys()].reduce( (pagematrix, pagej) => {

		// let cx = tools.randominteger(0.2*width,0.8*width);
		// let cy = tools.randominteger(0.2*height,0.8*height);
		let cx = width/2;
		let cy = height/2;

		let layersmill = [0,1,2,3,4];
		let layers = layersmill.reduce( (layermatrix, layerj) => {
				let mill = [0,1,2,3,4];
				let lineWidth = mill.map(n=>tools.randominteger(0.1*min,min)).sort( (a,b) => b-a );
				let dash = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let space = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let lines = mill.reduce( (linematrix,j,mill) => {
					if(layerj<layersmill.length-2) {
						console.log(layerj,JSON.stringify(linematrix));
						let color1 = colors[tools.randominteger(0,colors.length)];
						let notcolor1 = colors.filter(color => color!==color1);
						let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
						// linematrix.push({x1:cx,x2:cx,y1:0,y2:height,lineWidth:width,dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						// linematrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:height,dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});
						linematrix.push({x1:cx,x2:cx,y1:0,y2:height,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						linematrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
					}
					return linematrix;
				}, []);
				mill = [0,1,2,3,4];
				lineWidth = mill.map(n=>tools.randominteger(0.05*min,0.4*min)).sort( (a,b) => a-b );
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,0.8*min));
				// space = dash;
				let r = mill.map(n=>tools.randominteger(0.2*min,0.45*min)).sort( (a,b) => b-a );
				// let r = mill.map(n=>(n+1)*2/((mill.length+1)*2)*min).sort( (a,b) => b-a );
				r[mill.length-1] = 0.1*min;
				console.log("r=" + JSON.stringify(r));
				let circles = mill.reduce( (circlematrix,j) => {
					let color1 = colors[tools.randominteger(0,colors.length)];
					let notcolor1 = colors.filter(color => color!==color1);
					let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
					
					// let fillOpacity = (layerj===layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 0;
					let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 0;
					// let fillOpacity = j === mill.length-1 || j === 0 ? 1 : 0;
					circlematrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return circlematrix;
				}, []);
				return layermatrix.concat( { lines, circles, rects: [] } );
			}, []);
		// colors = tools.reifyWeightedArray([ [tools.pigments.black,4],  [tools.pigments.white,8], [tools.pigments.blue,0], [tools.pigments.yellow,0], [tools.pigments.red,4]]);
		// layer 0 ::: background canvas
		let color1 = colors[tools.randominteger(0,colors.length)];
		let notcolor1 = colors.filter(color => color!==color1);
		let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
		let lineWidth = tools.randominteger(0.1*min,0.4*min);
		let dash = tools.randominteger(0.05*min,0.4*min);
		let space = tools.randominteger(0.1*min,0.4*min);
		let x=0, y=0;
		let rects = [
			{x,y,width,height,lineWidth:lineWidth,dash:dash,space:space,strokeOpacity:0,fillOpacity:1,strokeColor:color1,fillColor:color1},
			{x,y,width,height,lineWidth:lineWidth,dash:dash,space:space,strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color2},
			{x,y,width,height,lineWidth:lineWidth*0.4,dash:space,space:dash,strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2}
		];
		layers.unshift( { lines: [], circles: [], rects: rects });
		color1 = colors[tools.randominteger(0,colors.length)];
		notcolor1 = colors.filter(color => color!==color1);
		color2 = notcolor1[tools.randominteger(0,notcolor1.length)];

		x = [-0.05*width,0,0.05*width][tools.randominteger(0,3)];
		y = [-0.05*height,0,0.05*height][tools.randominteger(0,3)];
		rects = [
			{x,y,width,height,lineWidth:lineWidth*0.8,dash:space*0.8,space:dash*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color2},
			{x,y,width,height,lineWidth:lineWidth*0.5,dash:dash*0.8,space:space*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2}
		];
		layers.push( { lines: [], circles: [], rects: rects });
		return  pagematrix.concat({layers});
	}, []);

	book.drawings = drawings;

	drawings.forEach( (page,p) => {
		let pagetitle = doctitle + "_" + (p+1).toString().padStart(2, "0");
		let info = { doctitle: doctitle, pagetitle: pagetitle, Title: title, Author: "mctavish", Subject: "generative drawing series", Keywords: "net.art, webs, networks" };
		let pdffilename = pagetitle + ".pdf";

		let doc = new PDFDocument(
		{ 
			size: [dimension.width, dimension.height],
			margins: seed.margins,
			info: info,
			id: pagetitle,
			// bufferPages: true
		});

		doc.font("Courier-Bold");
		doc.pipe(fs.createWriteStream(foldername+"/"+pdffilename));
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
		// let pdfImage = new PDFImage(foldername+"/"+pdffilename,
		// 	{
		// 		// convertOptions: {
		// 		//     "-resize": width+"x"+height,
		// 		//     "-quality": "100"
		// 		//  } 
		// });
		// pdfImage.convertPage(0).then( imagePaths => { console.log("done png") });

		p < seed.npages-1 ? doc.addPage() : "done";
	});

	fs.writeFileSync(foldername+"/"+doctitle + "_parameters.js", JSON.stringify(book,null,"\t"), (err) => {
	  if (err)
	    console.log(err);
	  else {
	    console.log("File written successfully\n");
	  }
	});

	let nextSteps = `
for i in *.pdf; do magick convert $i -resize 1920 $i.png; done
for file in *pdf.png; do mv "$file" "$\{file/.pdf.png/.png\}"; done
for i in *.pdf; do magick convert $i $i.tif; done
for file in *pdf.tif; do mv "$file" "$\{file/.pdf.tif/.tif\}"; done
cd ..
node createCoreImages ${foldername}
node createFilm ${foldername}
cd ${foldername}
ffmpeg -r 24 -f image2  -s 1920x1080 -start_number 01 -i ${doctitle}_%02d.png ${doctitle}.webm
ffmpeg -r 24 -f image2  -s 1920x1080 -start_number 000001 -i image-%06d.png ${doctitle}_pulse.webm
rm coreimage*.png
for i in algorithm*.png; do magick convert $i -resize 640 $i.small.png; done;
for file in *png.small.png; do mv "$file" "$\{file/.png.small.png/-small.png\}"; done;
pdfunite *.pdf ${doctitle}.pdf
# quicktime: open an image sequence with image-* files and save as ${doctitle}_pulse.mov
# rm image-*.png
# quicktime: open an image sequence with ${doctitle} files order by date created and save as ${doctitle}.mov
	`;
	fs.writeFileSync(foldername+"/"+doctitle + "_processCommands.sh", nextSteps, (err) => {
	  if (err)
	    console.log(err);
	  else {
	    console.log("File written successfully\n");
	  }
	});
});