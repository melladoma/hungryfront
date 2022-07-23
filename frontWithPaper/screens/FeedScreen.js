import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { View, ScrollView } from "react-native";
import { Button } from "react-native-paper";

import { MaterialCommunityIcons } from "react-native-vector-icons";
/* import {
	hamburger,
	book,
} from "react-native-vector-icons/MaterialCommunityIcons"; */

import AsyncStorage from '@react-native-async-storage/async-storage';

function FeedScreen(props) {

	
	return (
		<View style={{ flex: 1, backgroundColor: "blue" }}>
		</View>
	);
}

/* function mapStateToProps(state) {
	return { listPOIFromState: state.listPOI };
}

function mapDispatchToProps(dispatch) {
	return {
		deletePOI: function (i) {
			dispatch({ type: "deletePOI", index: i });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen); */

export default FeedScreen
