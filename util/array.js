Array.prototype.rotate = function (n) {
	if (n > 0) {
		return this.slice(n).concat(this.slice(0, n))
	} else {
		return this.slice(this.length + n).concat(this.slice(0, this.length + n))
	}
}

console.log("hello mlbam team");
