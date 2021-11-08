const PDFDocument = require("pdfkit");
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

const algorithmtimestamp = "1635998398";
const runtimestamp = Date.now().toString();
const seed = {
	dimensions: [ 
		{width: (8.5)*72, height: (8.5)*72, name: "8.5x8.5"},
		{width: (16)*72, height: (9)*72, name: "16x9"}
	],
	margins: { top: Math.floor(.8*72),bottom:Math.floor(.8*72),left:Math.floor(.9*72),right:Math.floor(.9*72) },
	titleprefix: "algorithm-" + algorithmtimestamp + "_" + "run-" + Date.now().toString(),
	npages: 48,
}


seed.dimensions.forEach( dimension => {

	let title = seed.titleprefix +  "_size-" + dimension.name;
	let info = { doctitle: title, Title: title, Author: "mctavish", Subject: "generative drawing series", Keywords: "net.art, webs, networks" };

	let doc = new PDFDocument(
	{ 
		size: [dimension.width, dimension.height],
		margins: seed.margins,
		info: info,
		// bufferPages: true
	});

	doc.font('Courier-Bold');
	doc.pipe(fs.createWriteStream(info.doctitle + '.pdf'));
	doc.fontSize(18);

	//pages:
	let width = dimension.width, height = dimension.height, min = Math.min(width,height), max = Math.max(width,height);
	let matrix = [...Array(seed.npages).keys()].reduce( (pagematrix, pagej) => {

		let colors = tools.reifyWeightedArray([ [tools.pigments.black,8], [tools.pigments.white,12], [tools.pigments.blue,0], [tools.pigments.yellow,0], [tools.pigments.red,4]]);

		// let cx = tools.randominteger(0.2*width,0.8*width);
		// let cy = tools.randominteger(0.2*height,0.8*height);
		let cx = width;
		let cy = height/2;

		let layersmill = [0,1,2,3,4];
		let layers = layersmill.reduce( (layermatrix, layerj) => {
				let mill = [0,1,2,3,4];
				let lineWidth = mill.map(n=>tools.randominteger(0.1*min,max)).sort( (a,b) => b-a );
				let dash = mill.map(n=>tools.randominteger(0.05*min,0.4*min)).sort( (a,b) => b-a );
				let space = mill.map(n=>tools.randominteger(0.1*min,0.8*min));
				let lines = mill.reduce( (linematrix,j,mill) => {
					// if(layerj<layersmill.length-2) {
						console.log(layerj,JSON.stringify(linematrix));
						let color1 = colors[tools.randominteger(0,colors.length)];
						let notcolor1 = colors.filter(color => color!==color1);
						let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
						linematrix.push({x1:width/2,x2:width/2,y1:0,y2:height,lineWidth:width,dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						linematrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:height,dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});
						linematrix.push({x1:cx,x2:cx,y1:0,y2:height,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						linematrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:dash[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
					// }
					return linematrix;
				}, []);
				mill = [0,1,2,3,4];
				lineWidth = mill.map(n=>tools.randominteger(0.05*min,0.3*min)).sort( (a,b) => a-b );
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,min));
				// space = dash;
				let r = mill.map(n=>tools.randominteger(0.2*min,0.5*max)).sort( (a,b) => b-a );
				// let r = mill.map(n=>(n+1)*2/((mill.length+1)*2)*min).sort( (a,b) => b-a );
				r[mill.length-1] = 0.1*min;
				console.log("r=" + JSON.stringify(r));
				let circles = mill.reduce( (circlematrix,j) => {
					let color1 = colors[tools.randominteger(0,colors.length)];
					let notcolor1 = colors.filter(color => color!==color1);
					let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
					
					// let fillOpacity = (layerj===layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 0;
					let fillOpacity = (layerj<layersmill.length-1 && j < mill.length-1) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 0;
					fillOpacity = 1;
					// let fillOpacity = j === mill.length-1 || j === 0 ? 1 : 0;
					circlematrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					circlematrix.push({cx:0,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return circlematrix;
				}, []);
				return layermatrix.concat( { lines, circles, rects: [] } );
			}, []);
		colors = tools.reifyWeightedArray([ [tools.pigments.black,4],  [tools.pigments.white,8], [tools.pigments.blue,0], [tools.pigments.yellow,0], [tools.pigments.red,4]]);
		// layer 0 ::: background canvas
		let color1 = colors[tools.randominteger(0,colors.length)];
		let notcolor1 = colors.filter(color => color!==color1);
		let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
		let lineWidth = tools.randominteger(0.1*min,0.6*min);
		let dash = tools.randominteger(0.05*min,0.2*min);
		let space = tools.randominteger(0.1*min,0.3*min);
		let x=0, y=0;
		let rects = [
			{x,y,width,height,lineWidth:lineWidth,dash:dash,space:space,strokeOpacity:0,fillOpacity:1,strokeColor:color1,fillColor:color1},
			{x,y,width,height,lineWidth:lineWidth,dash:dash,space:space,strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color2},
			{x,y,width,height,lineWidth:lineWidth*0.4,dash:space,space:dash,strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2}
		];
		layers.unshift( { lines: [], circles: [], rects: rects });
		// color1 = colors[tools.randominteger(0,colors.length)];
		// notcolor1 = colors.filter(color => color!==color1);
		// color2 = notcolor1[tools.randominteger(0,notcolor1.length)];

		x = (-0.2)*width;
		y = [-0.05*height,0,0.05*height][tools.randominteger(0,3)];
		// y = height/2;
		rects = [
			{x,y,width:1.4*width,height,lineWidth:lineWidth*0.8,dash:space*0.8,space:dash*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color2},
			{x,y,width:1.4*width,height,lineWidth:lineWidth*0.5,dash:dash*0.8,space:space*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2}
		];
		layers.push( { lines: [], circles: [], rects: rects });
		let circs = [
			{cx:0,cy:height/2,r:0.1*min,lineWidth:lineWidth,dash:dash,space:space,strokeOpacity:1,fillOpacity:1,strokeColor:color1,fillColor:color2},
			{cx:width,cy:height/2,r:0.1*min,lineWidth:lineWidth,dash:dash,space:space,strokeOpacity:1,fillOpacity:1,strokeColor:color1,fillColor:color2},
		];
		layers.push( { lines: [], circles: circs, rects: [] });
		mill = [0,1,2,3,4];
				lineWidth = mill.map(n=>tools.randominteger(0.05*min,0.2*min)).sort( (a,b) => a-b );
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,min));
				// space = dash;
				let r = mill.map(n=>tools.randominteger(0.2*min,0.24*max)).sort( (a,b) => b-a );
				// let r = mill.map(n=>(n+1)*2/((mill.length+1)*2)*min).sort( (a,b) => b-a );
				r[mill.length-1] = 0.1*min;
		cx=width/2;cy=height/2;
		colors = tools.reifyWeightedArray([ [tools.pigments.black,3],  [tools.pigments.white,8], [tools.pigments.blue,0], [tools.pigments.yellow,0], [tools.pigments.red,3]]);

		circs = mill.reduce( (circlematrix,j) => {
					let color1 = colors[tools.randominteger(0,colors.length)];
					let notcolor1 = colors.filter(color => color!==color1);
					let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
					fillOpacity=1;
					circlematrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return circlematrix;
				}, []);
		layers.push( { lines: [], circles: circs, rects: [] });
		return  pagematrix.concat({layers});
	}, []);

	matrix.forEach( (page,p) => {
		
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
		
		p < seed.npages-1 ? doc.addPage() : "done";
	});
	// # Finalize PDF file
	doc.end();
	fs.writeFile(info.doctitle + "_parameters.js", JSON.stringify(matrix,null,"\t"), (err) => {
	  if (err)
	    console.log(err);
	  else {
	    console.log("File written successfully\n");
	    // console.log("The written has the following contents:");
	    // console.log(fs.readFileSync(info.doctitle + "_parameters.js", "utf8"));
	  }
	});
});