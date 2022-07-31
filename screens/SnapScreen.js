import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Text,
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

function SnapScreen(props) {
	const navigation = useNavigation();

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
			<View style={{ flex: 1 }}>
				<View style={styles.content}>
					<Text style={{ fontSize: 20 }}>SnapScreen</Text>
				</View>
				<View style={styles.bottomTab}>
					<View
						style={{
							height: 150,
							flexDirection: "row",
							backgroundColor: "#2F3542",
							display: "flex",
							justifyContent: "space-around",
							padding: 20,
						}}
					>
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() => navigation.goBack()}
						>
							<MaterialCommunityIcons
								name="arrow-left"
								size={28}
								color="white"
								style={{
									paddingLeft: 20,
									paddingRight: 20,
									paddingTop: 10,
									paddingBottom: 10,
									zIndex: 1,
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{}}
							onPress={() => navigation.navigate("FormScreen")}
						>
							<View
								style={{
									display: "flex",
									width: 80,
									height: 80,
									borderWidth: 2,
									borderRadius: 100,
									backgroundColor: "white",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<MaterialCommunityIcons
									name="camera"
									size={28}
									color="#2F3542"
									style={{
										zIndex: 1,
									}}
								/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() => navigation.navigate("FormScreen")}
						>
							<MaterialCommunityIcons
								name="image"
								size={28}
								color="white"
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
	return { bottomTabHeight: state.bottomTabHeight };
}

/*function mapDispatchToProps(dispatch) {
	return {
		onSubmitBottomTabHeight: function (bottomTabHeight) {
			dispatch({ type: "initializeBottomTabHeight", bottomTabHeight: bottomTabHeight });
		},
	};
}*/

export default connect(mapStateToProps, null)(SnapScreen);

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44;
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
	},
});
