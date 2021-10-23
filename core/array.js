const bind = (func, thisArg) => thisArg ? func.bind(thisArg) : func;

Array.prototype.at = function(i) {
	if(i < 0) return this[this.length + i];
	return this[i];
};

Array.prototype.partition = function(callback, thisArg) {
	callback = bind(callback, thisArg);
	const ifTrue = [];
	const ifFalse = [];
	for(let i = 0; i < this.length; i++) {
		if(callback(this[i], i, this)) {
			ifTrue.push(this[i]);	
		} else {
			ifFalse.push(this[i]);	
		}
	}
	return [ifTrue, ifFalse];
};
