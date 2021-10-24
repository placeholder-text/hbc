const {setTimeout, setInterval, clearTimeout, clearInterval, queueMicrotask} = globalThis;

class Timer{
	constructor(){
		
	}
	
	cancel(){
		this.clear();
	}
}

class Timeout extends Timer{
	constructor(callback, ms, ...args){
		super();
		this.id = setTimeout(callback, ms, ...args);
	}
	
	clear(){
		clearTimeout(this.id);
	}
}

class Interval extends Timer{
	constructor(callback, ms, ...args){
		super();
		this.id = setInterval(callback, ms, ...args);
	}
	
	clear(){
		clearInterval(this.id);
	}
}

class Task{
	constructor(){
		
	}
	
	cancel(){
		this.clear();
	}
}

class Microtask extends Task{
	constructor(callback){
		super();
		this.callback = callback;
		queueMicrotask(() => this.callback());
	}
	
	clear(){
		this.callback = () => {};
	}
}

class Macrotask extends Task{
	constructor(callback){
		super();
		this.id = setTimeout(callback);
	}
	
	clear(){
		clearTimeout(this.id);
	}
}

Object.assign(globalThis, {
	setTimeout(...args){
		return new Timeout(...args)
	},
	clearTimeout(timeout){
		if(timeout instanceof Timeout) timeout.clear();
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
