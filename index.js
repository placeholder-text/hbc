Map.prototype.map = function(callback, thisArg) {
	if(thisArg) callback = callback.bind(thisArg);
	const map = new Map();
	for(let [k, v] of this) {
		map.set(k, callback(v, k, this));
	}
	return map;
}

Map.prototype.filter = function(callback, thisArg) {
	if(thisArg) callback = callback.bind(thisArg);
	const map = new Map();
	for(let [k, v] of this) {
		if(callback(v, k, this)) map.set(k, v);
	}
	return map;
}

Set.prototype.map = function(callback, thisArg) {
	if(thisArg) callback = callback.bind(thisArg);
	const set = new Set();
	for(let i of this) {
		set.add(callback(i, this));
	}
	return set;
}

Set.prototype.filter = function(callback, thisArg) {
	if(thisArg) callback = callback.bind(thisArg);
	const set = new Set();
	for(let i of this) {
		if(callback(i, this)) set.add(i);
	}
	return set;
}


