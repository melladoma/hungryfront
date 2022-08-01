import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

function SearchScreen(props) {
	const navigation = useNavigation();

	const [searchInput, setSearchInput] = useState(props.searchInput);
	const [DATA, setDATA] = useState([]);

	/* useEffect(() => {
		async function fetchByInput() {
			var rawResponse = await fetch(
				"http://192.168.1.24:3000/search/search-input",
				{
					method: "post",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `tags=${JSON.stringify(selectedFiltersArray)}`,
				}
			);

			var response = await rawResponse.json();
			setDATA(response.recipes);
		}
		fetchByTags();
	}, [selectedFiltersArray]); */
	
	//----------------------------- ------------------------------------Début StatusBar
	const MyStatusBar = ({ backgroundColor, ...props }) => (
		<View style={[styles.statusBar, { backgroundColor }]}>
			<SafeAreaView>
				<StatusBar
					translucent
					backgroundColor={backgroundColor}
					barStyle="dark-content"
					{...props}
				/>
			</SafeAreaView>
		</View>
	);
	//----------------------------- ------------------------------------Fin de StatusBar



	return (
		<View style={styles.container}>
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" />
			<View style={styles.appBar}>
				<View style={styles.searchSection}>
					<TextInput
						style={styles.searchInput}
						onChangeText={(value) => setSearchInput(value)}
						value={searchInput}
						placeholder="Chercher une recette"
						underlineColorAndroid="transparent"
					/>
					<TouchableOpacity
						onPress={() => setIsOverlayVisible(!isOverlayVisible)}
					>
						<MaterialCommunityIcons
							style={styles.searchIcon}
							name="magnify"
							size={28}
							color="#2f3542"
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ flex: 1 }}>
				<View style={styles.content}>
					<Text style={{ fontSize: 20 }}>SearchScreen</Text>
				</View>
				<View style={styles.bottomTab}>
					<View
						style={{
							height: props.bottomTabHeight,
							backgroundColor: "#f5f6fa",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							style={{}}
							onPress={() => navigation.goBack()}
						>
							<MaterialCommunityIcons
								name="arrow-left"
								size={28}
								color="#2f3542"
								style={{
									paddingLeft: 20,
									paddingRight: 20,
									paddingTop: 10,
									paddingBottom: 10,
									zIndex: 1,
								}}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return { bottomTabHeight: state.bottomTabHeight, searchInput: state.searchInput };
}

/*function mapDispatchToProps(dispatch) {
	return {
		onSubmitBottomTabHeight: function (bottomTabHeight) {
			dispatch({ type: "initializeBottomTabHeight", bottomTabHeight: bottomTabHeight });
		},
	};
}*/

export default connect(mapStateToProps, null)(SearchScreen);



const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56;
// https://stackoverflow.com/a/39300715

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
	appBar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#dfe4ea",
		height: APPBAR_HEIGHT,
		width: "100%",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f6fa",
	},
	searchSection: {
		flex: 1,
		height: 40,
		margin: 12,
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	searchIcon: {
		padding: 5,
	},
	searchInput: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		backgroundColor: "#fff",
		color: "#424242",
	},
});
