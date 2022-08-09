import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation, DrawerActions, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	Button
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import { privateIP } from "../env.js";


function PlannerScreen(props) {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const [recipeData, setRecipeData] = useState(props.recipe);
	const [isThisRecipeMine, setIsThisRecipeMine] = useState(false);
	const [weeklyPlanRecipes, setWeeklyPlanRecipes] = useState([]);

	useEffect(() => {
		if (isFocused) {
			async function initialFetch() {
				var rawResponse = await fetch(
					`http://${privateIP}:3000/initial-fetch-calendar`,
					{
						method: "post",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						body: `token=${props.token}`,
					}
				);

				var response = await rawResponse.json();
				if (response) {
					setWeeklyPlanRecipes(response.weeklyPlan)
				}
			}
			initialFetch();
		}
	}, [isFocused]);

	// const timeToString = (time) => {
	// 	const date = new Date(time);
	// 	return date.toISOString().split('T')[0];
	// }


	var today = new Date()
	// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	//getDay en 0 to 6

	var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
	// var weekDay = days[today.getDay()]
	// console.log(date, weekDay)

	var weekDays = weeklyPlanRecipes.map(item => {
		return (
			<View><Text>{item.date}</Text></View>
		)
	})




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
				<TouchableOpacity
					style={{}}
					onPress={() =>
						navigation.dispatch(DrawerActions.openDrawer())
					}
				>
					<MaterialCommunityIcons
						name="menu"
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

			<View style={styles.content}>
				{weekDays}


			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		bottomTabHeight: state.bottomTabHeight,
		recipe: state.recipe,
		token: state.token,
		likedRecipes: state.likedRecipes,
		fromWhichScreen: state.fromWhichScreen
	};
}

function mapDispatchToProps(dispatch) {
	return {
		sendBottomTabHeight: function (bottomTabHeight) {
			dispatch({
				type: "sendBottomTabHeight",
				bottomTabHeight: bottomTabHeight,
			});
		},
		sendPressedRecipeToStore: function (recipe) {
			console.log(recipe)
			dispatch({
				type: "setRecipe",
				recipe: recipe,
			});
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PlannerScreen);

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
		backgroundColor: "#f5f6fa",
		flex: 1,
		justifyContent: "space-between",
	},
});
