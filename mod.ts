async function require(filename: string){
	try{
		return eval(
			await Deno.emit(filename, {
				bundle: "classic",
				check: false,
				compilerOptions: {
					module: "commonjs",
					checkJs: false
				}
			}).then(e => e.files["deno:///bundle.js"])
		);
	}catch{
		return {};
	}
}

await Promise.all([
	require("./core/map.js"),
	require("./core/set.js"),
	require("./core/array.js")
]);