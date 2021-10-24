const { setTimeout, setInterval, clearTimeout, clearInterval, queueMicrotask } = globalThis;

class Timer {
	constructor() {
		if(this.constructor.name === "Timer")
			throw "cannot init abstract class";
	}
}

class Timeout extends Timer{
	constructor(callback, ms, ...args) {
		super();
		this.id = setTimeout(callback, ms, ...args);
	}
	
	cancel() {
		clearTimeout(this.id);
	}
}

class Interval extends Timer {
	constructor(callback, ms, ...args){
		super();
		this.id = setInterval(callback, ms, ...args);
	}
	
	cancel() {
		clearInterval(this.id);
	}
}

class Microtask extends Timer {
	constructor(callback) {
		super();
		this.callback = callback;
		queueMicrotask(() => this.callback());
	}
	
	cancel() {
		this.callback = () => {};
	}
}

class Macrotask extends Timer {
	constructor(callback) {
		super();
		this.id = setTimeout(callback);
	}
	
	cancel() {
		clearTimeout(this.id);
	}
}

const cancel = manual => timeout => {
	if(timeout instanceof Timeout) {
		timeout.cancel();
	} else {
		manual(timeout);
	}
}

Object.assign(globalThis, {
	setTimeout: (...args) => new Timeout(...args),
	setInterval: (...args) => new Interval(...args),
	queueMicrotask: (cb) => new Microtask(cb),
	queueMacrotask: (cb) => new Macrotask(cb),
	clearTimeout: cancel(clearTimeout),
	clearInterval: cancel(clearInterval),
	clearMicrotask: cancel(() => 0),
	clearMacrotask: cancel(() => 0),
});

