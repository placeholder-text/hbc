const Generator = (function*(){})().constructor;

// always return a boolean, not undefined
Generator.prototype._done = false;
Generator.prototype.done = function done(){
	return this._done;
}

const next = Generator.prototype.next;
Generator.prototype.next = function next(...args) {
	const got = this._values.length - 1 > this._index ?
		this._values[this._index + 1] :
		next.call(this, ...args);
	
	this._done = got.done;
	this._current = got.value;
	
	this._values.push(got);
	this._index++;
	
	return got;
};

Generator.prototype.nextValue = function nextValue(...args){
	return this.next(...args).value;
}

Generator.prototype.peek = function peek(){
	return this._values[this._values.length - 1];
}

Generator.prototype._values = [];
Generator.prototype._index = 0;
Generator.prototype.prev = function prev(){
	this._done = false;
	return this._values[--this._index];
}

Generator.prototype.forEach = function forEach(callback, thisArg) {
	if(thisArg) callback = callback.bind(thisArg);
	for(let i of (this._done ? this._values : this)){
		this._values.push(i);
		this._index++;
		
		callback(i.value, i.done);
	}
};
