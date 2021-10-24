const Generator = (function*(){})().constructor;

Generator.prototype._next = Generator.prototype.next;
Generator.prototype._index = 0;
Generator.prototype._done = false;
Generator.prototype._values = [];

Generator.prototype.done = function() {
	return this._done;
}

Generator.prototype.next = function(...args) {
	const got = this._values[this._index] ?? this._next.call(this, ...args);
	
	this._done = got.done;
	if(!this._values[this._index]) this._values.push(got);
	this._index++;
	
	return got;
};

Generator.prototype.value = function(...args) {
	return this.next(...args).value;
}

Generator.prototype.peek = function() {
	if(!this._values[this._index]) {
		this.next();
		this._done = false;
		this._index--;
	}
	return this._values[this._index];
}

Generator.prototype.prev = function prev(){
	this._done = false;
	return this._values[--this._index - 1];
}

Generator.prototype.forEach = function forEach(callback, thisArg) {
	if(thisArg) callback = callback.bind(thisArg);
	while(true) {
		if(this._done) break;
		const got = this.next();
		callback(got.value, got.done);
	}
};

