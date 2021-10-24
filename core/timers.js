const {setTimeout, setInterval, clearTimeout, clearInterval, queueMicrotask} = globalThis;

class Timeout{
	constructor(callback, ms, ...args){
		this.id = setTimeout(callback, ms, ...args);
	}
	
	clear(){
		clearTimeout(this.id);
	}
	
	cancel(){
		this.clear();
	}
}

class Interval{
	constructor(callback, ms, ...args){
		this.id = setInterval(callback, ms, ...args);
	}
	
	clear(){
		clearInterval(this.id);
	}
	
	cancel(){
		this.clear();
	}
}

class Microtask{
	constructor(callback){
		this.callback = callback;
		queueMicrotask(() => this.callback());
	}
	
	clear(){
		this.callback = () => {};
	}
	
	cancel(){
		this.clear();
	}
}

class Macrotask{
	constructor(callback){
		this.id = setTimeout(callback);
	}
	
	clear(){
		clearTimeout(this.id);
	}
	
	cancel(){
		this.clear();
	}
}

Object.assign(globalThis, {
	setTimeout(...args){
		return new Timeout(...args)
	},
	clearTimeout(timeout){
		if(timeout instanceof Timeout) itimeout.clear();
		clearInterval(timeout);
	},
	
	setInterval(...args){
		return new Interval(...args);
	},
	clearInterval(interval){
		if(interval instanceof Interval) interval.clear();
		clearInterval(interval);
	},
	
	queueMicrotask(cb){
		return new Microtask(cb);
	},
	clearMicrotask(task){
		if(!(task instanceof Microtask)) return;
		task.clear();
	},
	
	queueMacrotask(cb){
		return new Macrotask(cb);
	},
	clearMacrotask(task){
		if(!(task instanceof Macrotask)) return;
		task.clear();
	}
});