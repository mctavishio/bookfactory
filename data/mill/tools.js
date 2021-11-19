module.exports = {
	randominteger: (min, max) => {
		return Math.floor( min + Math.random()*(max-min));
	},
	reifyWeightedArray: arr => {
		return arr.reduce( (acc, item, j) => {
			Array.prototype.push.apply(acc,[...Array(item[1]).keys()].reduce( (acc2,k) => { acc2.push(item[0]); return acc2 },[]) );
			return acc;
		}, []);
	}
};