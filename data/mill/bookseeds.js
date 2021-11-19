const tools = require("./tools.js");
const pigments= {
	black: "#191918",
	white: "#fcfbe3",
	blue: "#006699",
	red: "#9a0000",
	yellow: "#ffcc00",
	gray: "#898988",
	darkgray: "#4b4b44"
};
const prefix = "seed-";
module.exports = [
{
	id: prefix + "1637255740", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,6, "black"], [pigments.white,12,"white"], [pigments.blue, 0,"blue"], [pigments.yellow, 0,"yellow"], [pigments.red, 2,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258317", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.blue, 0,"blue"], [pigments.yellow, 0,"yellow"], [pigments.red, 4,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258480", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.blue, 0,"blue"], [pigments.yellow, 1,"yellow"], [pigments.red, 4,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258562", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.blue, 4,"blue"], [pigments.yellow, 0,"yellow"], [pigments.red, 0,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258575", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.blue, 3,"blue"], [pigments.yellow, 0,"yellow"], [pigments.red, 0,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258598", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.blue, 0,"blue"], [pigments.yellow, 2,"yellow"], [pigments.red, 0,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258630", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.gray, 2,"gray"], [pigments.blue, 0,"blue"], [pigments.yellow, 1,"yellow"], [pigments.red, 0,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258785", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.gray, 2,"gray"], [pigments.blue, 0,"blue"], [pigments.yellow, 1,"yellow"], [pigments.red, 1,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258762", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.gray, 2,"gray"], [pigments.blue, 0,"blue"], [pigments.yellow, 0,"yellow"], [pigments.red, 1,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637290773", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.gray, 2,"gray"], [pigments.blue, 1,"blue"], [pigments.yellow, 0,"yellow"], [pigments.red, 0,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
{
	id: prefix + "1637258771", //date +%s
	dimensions: {width: 16*300, height: 9*300, name: "AR16x9"},
	npages: 48,
	pigments: [ [pigments.black,8, "black"], [pigments.white,12,"white"], [pigments.gray, 0,"gray"], [pigments.blue, 1,"blue"], [pigments.yellow, 1,"yellow"], [pigments.red, 1,"red"]],
	mixer: tools.reifyWeightedArray,
	colors: (pigments, mixer) => {
		return mixer(pigments);
	}
},
]