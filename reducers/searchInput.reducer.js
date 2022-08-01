export default function (searchInput = '', action) {
	if (action.type == "copyInputFromHome") {
		return action.searchInput;
	} else {
		return searchInput;
	}
}