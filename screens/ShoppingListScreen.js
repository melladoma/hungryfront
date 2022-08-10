import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { privateIP } from "../env.js";

import {
	StatusBar,
	View,
	Platform,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
} from "react-native";
import {
	useNavigation,
	DrawerActions,
	useIsFocused,
} from "@react-navigation/native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
function ShoppingListScreen(props) {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const [shoppingListData, setShoppingListData] = useState([]);

	const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

	const handlePressedCheckbox = async (id) => {
		if (selectedCheckboxes.includes(id)) {
			let tempArray = selectedCheckboxes.filter((x) => x !== id);
			setSelectedCheckboxes(tempArray);
		} else {
			setSelectedCheckboxes([...selectedCheckboxes, id]);
		}
	};

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

	useEffect(() => {
		if (isFocused) {
			async function initialFetch() {
				var rawResponse = await fetch(
					`http://${privateIP}:3000/recipesheet/initial-fetch-shoppingList`,
					{
						method: "post",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						body: `token=${props.token}`,
					}
				);

				var response = await rawResponse.json();
				setShoppingListData(response.shoppingList);
			}
			initialFetch();
		}
	}, [isFocused]);

	var item = ({ item }) => {
		return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					borderBottomWidth: 0.75,

					// texteAlign:"center",
					marginTop: "2%",
					marginBottom: "5%",
				}}
			>
				<View style={styles.list}>
					<TouchableOpacity
						style={{}}
						onPress={() => handlePressedCheckbox(item._id)}
					>
						<MaterialCommunityIcons
							name={
								selectedCheckboxes.includes(item._id)
									? "checkbox-marked-outline"
									: "checkbox-blank-outline"
							}
							size={28}
							color="#2f3542"
							style={{
								paddingLeft: 20,
								paddingRight: 20,
								// paddingTop: 10,
								// paddingBottom: 10,
								zIndex: 1,

								// width:50,
							}}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.list}>
					<Text
						style={{
							// textAlign: "center",
							fontSize: 20,
							width: 150,
							textDecorationLine: selectedCheckboxes.includes(
								item._id
							)
								? "line-through"
								: "none",
						}}
					>
						{item.name}
					</Text>
				</View>
				<View style={styles.list}>
					<Text
						style={{
							textAlign: "center",
							fontSize: 20,
							width: 120,
							textDecorationLine: selectedCheckboxes.includes(
								item._id
							)
								? "line-through"
								: "none",
						}}
					>
						{item.quantity}
					</Text>
				</View>
			</View>
		);
	};

	const handleDeleteSelected = (arrayOfSelected) => {
		async function deleteSelected() {
			var rawResponse = await fetch(
				`http://${privateIP}:3000/recipesheet/delete-selected-shoppingList`,
				{
					method: "post",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `token=${props.token}&selection=${JSON.stringify(
						arrayOfSelected
					)}`,
				}
			);

			var response = await rawResponse.json();
			setShoppingListData(response.shoppingList);
		}
		deleteSelected();
	};

	const handleDeleteAll = () => {
		async function deleteAll() {
			var rawResponse = await fetch(
				`http://${privateIP}:3000/recipesheet/delete-all-shoppingList`,
				{
					method: "post",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `token=${props.token}`,
				}
			);

			var response = await rawResponse.json();
			setShoppingListData(response.shoppingList);
		}
		deleteAll();
	};

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
				{/* <TouchableOpacity
						style={{}}
						onPress={() => handleDeleteSelected(selectedCheckboxes)}
					>
						<MaterialCommunityIcons
							name="delete-sweep"
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
					</TouchableOpacity> */}
				<TouchableOpacity style={{}} onPress={() => handleDeleteAll()}>
					<MaterialCommunityIcons
						name="delete"
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
			<View style={{ flex: 1 }}>
				<View style={styles.content}>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							marginTop: "5%",
						}}
					>
						<View
							style={{
								flexDirection: "row",
								margin: 3,
								justifyContent: "space-between",
								marginBottom: "5%",
							}}
						>
							<View
								style={{
									width: "30%",
									// backgroundColor: "#F19066",
								}}
							></View>
							<View
								style={{
									width: "30%",
									// backgroundColor: "#F19066",
								}}
							>
								<Text
									style={{
										// textAlign: "center",
										fontSize: 20,
										fontWeight: "bold",
										color: "#F19066",
									}}
								>
									Produits
								</Text>
							</View>
							<View
								style={{
									width: "30%",
									// backgroundColor: "#F19066",
								}}
							>
								<Text
									style={{
										// textAlign: "center",
										fontSize: 20,
										fontWeight: "bold",
										color: "#F19066",
									}}
								>
									Quantités
								</Text>
							</View>
						</View>
						<FlatList
							data={shoppingListData}
							renderItem={item}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
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
	return {
		bottomTabHeight: state.bottomTabHeight,
		recipe: state.recipe,
		token: state.token,
	};
}

/*function mapDispatchToProps(dispatch) {
	return {
	};
}*/

export default connect(mapStateToProps, null)(ShoppingListScreen);

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56;
// https://stackoverflow.com/a/39300715

const styles = StyleSheet.create({
	appBar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#dfe4ea",
		height: APPBAR_HEIGHT,
		width: "100%",
	},
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f6fa",
	},
	list: {
		width: "35%",
	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
});
