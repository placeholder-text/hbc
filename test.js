const { deepEqual } = require("assert");
require("./index.js");

const map = new Map().set("foo", 1).set("bar", 2);
const set = new Set().add("foo").add("bar");

deepEqual(map.map(i => i + 1), new Map().set("foo", 2).set("bar", 3));
deepEqual(map.filter(i => i === 1), new Map().set("foo", 1));
deepEqual(set.map(i => i.toUpperCase()), new Set().add("FOO").add("BAR"));
deepEqual(set.filter(i => i === "foo"), new Set().add("foo"));

