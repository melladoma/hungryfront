export default function (bottomTabHeight = 0, action) {
	if (action.type == "initializeBottomTabHeight") {
		return action.bottomTabHeight;
	} else {
		return bottomTabHeight;
	}
}
