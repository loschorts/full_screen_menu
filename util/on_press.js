// Only records a single cb for each key. This provides the simplest API but
// could be expanded later to trigger multiple cbs.

const cbs = {};

document.addEventListener("keydown", e => {
	if (cbs[e.key]) cbs[e.key](e);
});

const onPress = (key, cb) => {
	cbs[key] = cb;
};

export default onPress;