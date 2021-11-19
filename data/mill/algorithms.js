const tools = require("./tools.js");
const prefix = "algorithm-";

module.exports = [

	{ 
		id: prefix + "1636425448",
		draw: p => {	
			let width = p.width;
			let height = p.height;
			let min = p.min, max = p.max;
			let colors = p.colors;

			let cx = tools.randominteger(0.2*width,0.8*width);
			let cy = tools.randominteger(0.2*height,0.8*height);
			// let cx = width/2;
			// let cy = height/2;

			let layersmill = [0,1,2,3,4];
			let layers = layersmill.reduce( (layermatrix, layerj) => {
					let mill = [0,1,2,3,4,5];
					let lineWidth = mill.map(n=>tools.randominteger(0.1*min,min)).sort( (a,b) => b-a );
					let dash = mill.map(n=>tools.randominteger(0.05*min,0.3*min)).sort( (a,b) => b-a );
					let space = mill.map(n=>tools.randominteger(0.05*min,0.4*min)).sort( (a,b) => b-a );
					let lines = mill.reduce( (linematrix,j,mill) => {
						if(layerj<layersmill.length-2) {
							// console.log(layerj,JSON.stringify(linematrix));
							let color1 = colors[tools.randominteger(0,colors.length)];
							let notcolor1 = colors.filter(color => color!==color1);
							let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
							linematrix.push({x1:cx,x2:cx,y1:0,y2:height,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
							linematrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
						}
						return linematrix;
					}, []);
					mill = [0,1,2,3,4];
					lineWidth = mill.map(n=>tools.randominteger(0.05*min,0.2*min)).sort( (a,b) => a-b );
					dash = mill.map(n=>tools.randominteger(0.05*min,0.15*min)).sort( (a,b) => b-a);
					space = mill.map(n=>tools.randominteger(0.05*min,0.2*min));
					// space = dash;
					let r = mill.map(n=>tools.randominteger(0.14*min,0.45*min)).sort( (a,b) => b-a );
					// let r = mill.map(n=>(n+1)*2/((mill.length+1)*2)*min).sort( (a,b) => b-a );
					r[mill.length-1] = 0.1*min;
					// console.log("r=" + JSON.stringify(r));
					// cx = width/2;
					// cy = height/2;
					let circles = mill.reduce( (circlematrix,j) => {
						let color1 = colors[tools.randominteger(0,colors.length)];
						let notcolor1 = colors.filter(color => color!==color1);
						let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
						
						// let fillOpacity = (layerj===layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 0;
						let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 1;
						// let fillOpacity = j === mill.length-1 || j === 0 ? 1 : 0;
						circlematrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:0,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
						return circlematrix;
					}, []);
					return layermatrix.concat( { lines, circles, rects: [] } );
				}, []);
			
			let color1 = colors[tools.randominteger(0,colors.length)];
			let notcolor1 = colors.filter(color => color!==color1);
			let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
			let lineWidth = tools.randominteger(0.1*min,2*min);
			let dash = tools.randominteger(0.05*min,0.18*min);
			let space = tools.randominteger(0.05*min,0.2*min);
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
			lineWidth = tools.randominteger(0.1*min,0.6*min);
			dash = tools.randominteger(0.05*min,0.18*min);
			space = tools.randominteger(0.5*min,0.4*min);

			x = [-0.1*width,0.1*width][tools.randominteger(0,2)];
			y = [-0.3*height,-0.2*height][tools.randominteger(0,2)];
			rects = [
				{x,y,width:0.9*width,height:1.4*height,lineWidth:lineWidth*0.8,dash:dash*0.8,space:space*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color2},
				{x,y,width:0.95*width,height:1.4*height,lineWidth:lineWidth*0.6,dash:dash*0.8,space:space*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2}
			];
			layers.push( { lines: [], circles: [], rects: rects });
			return layers;
		},
	},
	{ 
		id: prefix + "1635969788", //date +%s
		draw: p => {	
			let width = p.width;
			let height = p.height;
			let min = p.min, max = p.max;
			let colors = p.colors;
				
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
							// console.log(layerj,JSON.stringify(linematrix));
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
					// console.log("r=" + JSON.stringify(r));
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
			return layers;
		},
	},
	{ 
		id: prefix + "1636347815", //date +%s
		draw: p => {	
			let width = p.width;
			let height = p.height;
			let min = p.min, max = p.max;
			let colors = p.colors;

			let cx = tools.randominteger(0.2*width,0.8*width);
			let cy = tools.randominteger(0.2*height,0.8*height);
			// let cx = width/2;
			// let cy = height/2;

			let layersmill = [0,1,2,3,4];
			let layers = layersmill.reduce( (layermatrix, layerj) => {
					let mill = [0,1,2,3,4,5];
					let lineWidth = mill.map(n=>tools.randominteger(0.1*min,min)).sort( (a,b) => b-a );
					let dash = mill.map(n=>tools.randominteger(0.05*min,0.3*min)).sort( (a,b) => b-a );
					let space = mill.map(n=>tools.randominteger(0.05*min,0.4*min)).sort( (a,b) => b-a );
					let lines = mill.reduce( (linematrix,j,mill) => {
						if(layerj<layersmill.length-2) {
							// console.log(layerj,JSON.stringify(linematrix));
							let color1 = colors[tools.randominteger(0,colors.length)];
							let notcolor1 = colors.filter(color => color!==color1);
							let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
							linematrix.push({x1:cx,x2:cx,y1:0,y2:height,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
							linematrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
						}
						return linematrix;
					}, []);
					mill = [0,1,2,3,4];
					lineWidth = mill.map(n=>tools.randominteger(0.05*min,0.4*min)).sort( (a,b) => a-b );
					dash = mill.map(n=>tools.randominteger(0.05*min,0.15*min)).sort( (a,b) => b-a);
					space = mill.map(n=>tools.randominteger(0.05*min,0.2*min));
					// space = dash;
					let r = mill.map(n=>tools.randominteger(0.14*min,0.45*min)).sort( (a,b) => b-a );
					// let r = mill.map(n=>(n+1)*2/((mill.length+1)*2)*min).sort( (a,b) => b-a );
					r[mill.length-1] = 0.1*min;
					// console.log("r=" + JSON.stringify(r));
					cx = width/2;
					cy = height/2;
					let circles = mill.reduce( (circlematrix,j) => {
						let color1 = colors[tools.randominteger(0,colors.length)];
						let notcolor1 = colors.filter(color => color!==color1);
						let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
						
						// let fillOpacity = (layerj===layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 0;
						let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 1 : 1;
						// let fillOpacity = j === mill.length-1 || j === 0 ? 1 : 0;
						circlematrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:0,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
						return circlematrix;
					}, []);
					return layermatrix.concat( { lines, circles, rects: [] } );
				}, []);
			// colors = tools.reifyWeightedArray([ [tools.pigments.black,4],  [tools.pigments.white,8], [tools.pigments.blue,0], [tools.pigments.yellow,0], [tools.pigments.red,4]]);
			// layer 0 ::: background canvas
			let color1 = colors[tools.randominteger(0,colors.length)];
			let notcolor1 = colors.filter(color => color!==color1);
			let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
			let lineWidth = tools.randominteger(0.1*min,2*min);
			let dash = tools.randominteger(0.05*min,0.18*min);
			let space = tools.randominteger(0.05*min,0.2*min);
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
			lineWidth = tools.randominteger(0.1*min,0.6*min);
			dash = tools.randominteger(0.05*min,0.18*min);
			space = tools.randominteger(0.5*min,0.4*min);

			x = [-0.1*width,0.1*width][tools.randominteger(0,2)];
			y = [-0.3*height,-0.2*height][tools.randominteger(0,2)];
			rects = [
				{x,y,width:0.9*width,height:1.4*height,lineWidth:lineWidth*0.8,dash:dash*0.8,space:space*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color2},
				{x,y,width:0.95*width,height:1.4*height,lineWidth:lineWidth*0.6,dash:dash*0.8,space:space*0.8,strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2}
			];
			layers.push( { lines: [], circles: [], rects: rects });
			return layers;
		},
	},
	{ 
		id: prefix + "1635998398", //date +%s
		draw: p => {	
			let width = p.width;
			let height = p.height;
			let min = p.min, max = p.max;
			let colors = p.colors;
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
			// colors = tools.reifyWeightedArray([ [tools.pigments.black,4],  [tools.pigments.white,8], [tools.pigments.blue,0], [tools.pigments.yellow,0], [tools.pigments.red,4]]);
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
			// colors = tools.reifyWeightedArray([ [tools.pigments.black,3],  [tools.pigments.white,8], [tools.pigments.blue,0], [tools.pigments.yellow,0], [tools.pigments.red,3]]);

			circs = mill.reduce( (circlematrix,j) => {
						let color1 = colors[tools.randominteger(0,colors.length)];
						let notcolor1 = colors.filter(color => color!==color1);
						let color2 = notcolor1[tools.randominteger(0,notcolor1.length)];
						fillOpacity=1;
						circlematrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
						return circlematrix;
					}, []);
			layers.push( { lines: [], circles: circs, rects: [] });
			return layers;
		},
	},
];
