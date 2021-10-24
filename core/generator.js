const Generator = (function*(){})().constructor;

// always return a boolean, not undefined
Object.defineProperty(Generator.prototype, "done", {
	get() { return this._done ?? false; } 
});

const next = Generator.prototype.next;
Generator.prototype.next = function() {
	const got = next.call(this);
	this._done = got.done;
	return got;
};

Generator.prototype.forEach = function(callback, thisArg) {
	if(thisArg) callback = callback.google(thisArg);
	for(let i of this) callback(i.value);
};
