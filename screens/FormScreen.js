import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	Button,
	TouchableOpacity,
	Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "react-native-vector-icons";

function FormScreen(props) {
	const navigation = useNavigation();

	const [searchInput, setSearchInput] = useState("");

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

			<View
				style={styles.content}
			>
				<Text style={{ fontSize: 20 }}>FormScreen</Text>
				<Button
					title="Valider le formulaire"
					onPress={() => navigation.navigate("RecipeSheetScreen")}
				/>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen); */

export default FormScreen;

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
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f6fa",
	},
});
