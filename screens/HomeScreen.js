import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	useNavigation,
	DrawerActions,
	useIsFocused,
} from "@react-navigation/native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { privateIP } from "../env.js";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import {
	TouchableWithoutFeedback,
	Modal,
	StatusBar,
	View,
	ScrollView,
	Platform,
	Image,
	FlatList,
	StyleSheet,
	Pressable,
	TouchableOpacity,
	Text,
	TextInput,
} from "react-native";

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44; //permet de faire varier la taille de la status bar selon le téléphone
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56; //permet de faire varier la taille de l'AppBar selon le téléphone
// https://stackoverflow.com/a/39300715

function HomeScreen(props) {
	const isFocused = useIsFocused();
	const navigation = useNavigation(); //nécessaire pour la navigation par boutons/drawer/tab

	const [alert, setAlert] = useState(false); //pour afficher la modal des filtres
	const [isOverlayVisible, setIsOverlayVisible] = useState(false); //sert à afficher l'ombre derrière la modal
	const [typeAffichage, setTypeAffichage] = useState("icones"); //filtre accessible dans la modal, gère le type d'affichage
	const [DATA, setDATA] = useState([]); //tableau d'objets contenant les données des recetes
	const [initialData, setInitialData] = useState([]); //sert pour filtrer recettes par nom et tags

	const [searchInput, setSearchInput] = useState(""); //value du TextInput de la barre de recherche
	//pour connaître la taille utilisée sur chaque téléphone par TabNavigator:
	const tabBarHeight = useBottomTabBarHeight();
	//pour envoyer cette taille dans le store et l'utiliser dans d'autres composants, notamment DrawerScreen:
	useEffect(() => {
		props.sendBottomTabHeight(tabBarHeight);
	}, []);

	//------------------------------------------------------------------

	//StatusBar à laisser dans chaque page, la backgroundColor et la couleur du texte ('barStyle') peuvent être changés dans chaque page si besoin d'accorder des couleurs, cf aussi la stylesheet tout en bas
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

	//Début Tags
	var tags = [
		"entrée",
		"plat",
		"dessert",
		"apéro",
		"boisson",
		"asiatique",
		"américain",
		"italien",
		"diététique",
		"végétarien",
		"rapide",
		"gastronomique",
		"festif",
		"brunch",
	];
	const [selectedTagsArray, setSelectedTagsArray] = useState([]);

	const handlePressedTag = async (name) => {
		if (selectedTagsArray.includes(name.toLowerCase())) {
			let tempArray = selectedTagsArray.filter(
				(x) => x !== name.toLowerCase()
			);
			setSelectedTagsArray(tempArray);
		} else {
			setSelectedTagsArray([...selectedTagsArray, name.toLowerCase()]);
		}
	};

	useEffect(() => {
		if (isFocused) {
			async function initialFetch() {
				var rawResponse = await fetch(
					`http://${privateIP}:3000/search/initial-fetch-myrecipes`,
					{
						method: "post",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						body: `token=${props.token}`,
					}
				);

				var response = await rawResponse.json();

				setDATA(response.addedRecipes);
				setInitialData(response.addedRecipes);
				// console.log(response.addedRecipes, "---------------------------------------")
			}
			initialFetch();
		}
	}, [isFocused]);

	useEffect(() => {
		if (selectedTagsArray.length > 0 && searchInput.length === 0) {
			let newDataSet = initialData;
			for (let i = 0; i < selectedTagsArray.length; i++) {
				newDataSet = newDataSet.filter((x) =>
					x.tags.includes(selectedTagsArray[i])
				);
			}
			setDATA(newDataSet);
		} else if (selectedTagsArray.length === 0 && searchInput.length > 0) {
			let tempDataSet = initialData;
			let newDataSet = [];

			for (let i = 0; i < tempDataSet.length; i++) {
				let regex = new RegExp(searchInput, "i");
				if (
					tempDataSet[i].name.match(regex) !== null ||
					tempDataSet[i].directions.match(regex) !== null
				) {
					newDataSet.push(tempDataSet[i]);
				}
			}
			setDATA(newDataSet);
		} else if (selectedTagsArray.length > 0 && searchInput.length > 0) {
			let tempDataSet = initialData;
			let newDataSet = [];

			for (let i = 0; i < tempDataSet.length; i++) {
				let regex = new RegExp(searchInput, "i");
				if (
					tempDataSet[i].name.match(regex) !== null ||
					tempDataSet[i].directions.match(regex) !== null
				) {
					newDataSet.push(tempDataSet[i]);
				}
			}
			for (let i = 0; i < selectedTagsArray.length; i++) {
				newDataSet = newDataSet.filter((x) =>
					x.tags.includes(selectedTagsArray[i])
				);
			}
			setDATA(newDataSet);
		} else if (selectedTagsArray.length === 0 && searchInput.length === 0) {
			setDATA(initialData);
		}
	}, [selectedTagsArray, searchInput]);

	//Tags sur la HomeScreen
	const TagsComponent = tags.map((x, i) => (
		<Pressable key={i} onPress={() => handlePressedTag(x)}>
			<View
				style={[
					styles.filterContainer,
					{
						backgroundColor: selectedTagsArray.includes(
							x.toLowerCase()
						)
							? "#F19066"
							: "#dfe4ea",
					},
				]}
			>
				<Text>{x}</Text>
			</View>
		</Pressable>
	));

	//Tags dans la modale
	const modalTagsComponent = tags.map((x, i) => (
		<TouchableOpacity
			key={i}
			onPress={() => {
				handlePressedTag(x);
			}}
		>
			<View
				style={[
					styles.filterContainer,
					{
						backgroundColor: selectedTagsArray.includes(
							x.toLowerCase()
						)
							? "#F19066"
							: "#dfe4ea",
					},
				]}
			>
				<Text>{x.toUpperCase()}</Text>
			</View>
		</TouchableOpacity>
	));
	//-----------------------------------------------------------------Fin TagsComponent

	//Modal qui contient tags + filtres
	var modal = (
		<Modal
			transparent={true}
			visible={alert}
			animationType="slide"
			onRequestClose={() => {
				setIsOverlayVisible(false);
				setAlert(false);
			}}
		>
			<TouchableOpacity
				style={{ flex: 1 }}
				activeOpacity={1}
				onPressOut={() => {
					setIsOverlayVisible(false);
					setAlert(false);
				}}
			>
				<TouchableWithoutFeedback>
					<View
						style={{
							alignItems: "center",

							borderBottomLeftRadius: 20,
							borderBottomRightRadius: 20,
							backgroundColor: "#f5f6fa",
							width: "100%",
							height: 360,
							marginTop: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
						}}
					>
						<View style={{ marginVertical: 10 }}>
							<Text style={{ alignSelf: "center" }}>
								Type d'affichage:
							</Text>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignContent: "center",
									marginVertical: 10,
								}}
							>
								<View
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderWidth: 1,
										borderRadius: 100,
										alignSelf: "flex-start",
										paddingVertical: 5,
										paddingHorizontal: 10,
										backgroundColor:
											typeAffichage === "liste"
												? "#F19066"
												: "#dfe4ea",
									}}
								>
									<TouchableOpacity
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}
										onPress={() => {
											setTypeAffichage("liste");
										}}
									>
										<MaterialCommunityIcons
											name="view-list"
											size={24}
											color="#2f3542"
										/>
										<Text
											style={{
												color: "black",
												fontSize: 18,
												marginLeft: 10,
											}}
										>
											Liste
										</Text>
									</TouchableOpacity>
								</View>
								<Text
									style={{
										alignSelf: "center",
										marginHorizontal: 10,
									}}
								>
									ou
								</Text>
								<View
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderWidth: 1,

										borderRadius: 100,
										alignSelf: "flex-start",
										paddingVertical: 5,
										paddingHorizontal: 10,
										backgroundColor:
											typeAffichage === "icones"
												? "#F19066"
												: "#dfe4ea",
									}}
								>
									<TouchableOpacity
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
										}}
										onPress={() => {
											setTypeAffichage("icones");
										}}
									>
										<MaterialCommunityIcons
											name="view-grid"
											size={24}
											color="#2f3542"
										/>
										<Text
											style={{
												color: "black",
												fontSize: 18,
												marginLeft: 10,
											}}
										>
											Icônes
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<Text>Filtrer par tags</Text>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								flexWrap: "wrap",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{modalTagsComponent}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</TouchableOpacity>
		</Modal>
	);

	//ombre derriere la modale
	var overlayShadow;
	if (isOverlayVisible) {
		overlayShadow = (
			<View style={[styles.overlayShadow, { height: "100%" }]} />
		);
	}

	//-------------------------------------------------------------------------fin modal

	//Début FlatList affichant les Cards de recettes

	var flatlist;
	if (typeAffichage === "icones") {
		//-----------------------------affichage en "icones"

		const renderItem = ({ item }) => (
			<TouchableOpacity
				onPress={() => handlePressOnCard(item)}
			>
				<View
					style={{
						height: 200,
						width: 170,
						marginBottom: 10,
						marginTop: 10,
						borderRadius: 10,
						borderWidth: 1,
					}}
				>
					<Text style={{ height: "15%", padding: 5 }}>{item.name}</Text>
					<Image
						style={{
							height: "85%",
							width: "100%",
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
						}}
						source={{ uri: item.image }}
					/>
				</View>
			</TouchableOpacity>
		);

		flatlist = (
			<FlatList
				key={"icones"}
				showsVerticalScrollIndicator={false}
				columnWrapperStyle={{ justifyContent: "space-evenly" }}
				numColumns={2}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
		);
	} else if (typeAffichage === "liste") {
		//--------------------------------affichage en "liste"

		const renderItem = ({ item }) => (
			<TouchableOpacity
				onPress={() => handlePressOnCard(item)}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						height: 150,
						width: "90%",
						alignSelf: "center",

						marginTop: 10,
						borderRadius: 10,
						borderWidth: 1,
					}}
				>
					<Image
						style={{
							height: "100%",
							width: "40%",
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 0,
							borderTopLeftRadius: 10,
							borderTopRightRadius: 0,
						}}
						source={{ uri: item.image }}
					/>
					<View style={{ margin: 10 }}>
						<Text style={{ fontSize: 20 }}>{item.name}</Text>
						<Text style={{ fontSize: 15 }}>
							Hum tres bonne tarte
						</Text>
						<Text style={{ fontSize: 15, fontWeight: "bold" }}>
							#Dylan
						</Text>
						<Text style={{ fontSize: 15 }}>58 Likes</Text>
					</View>
				</View>
			</TouchableOpacity>
		);

		flatlist = (
			<FlatList //composant qu'on met dans le return
				showsVerticalScrollIndicator={false}
				key={"liste"}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
		);
	}

	const handlePressOnCard = (recipe) => {
		props.sendPressedRecipeToStore(recipe);
		navigation.navigate("RecipeSheetScreen")
	}
	//----------------------------- ------------------------------------Fin de la flatList

	//-----------------------------------RENDER-----------------------------------
	return (
		<View style={{ flex: 1 }}>
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
				<View style={styles.searchSection}>
					<TextInput
						style={styles.searchInput}
						onChangeText={(value) => setSearchInput(value)}
						value={searchInput}
						placeholder="Chercher une recette"
						underlineColorAndroid="transparent"
					/>

					<MaterialCommunityIcons
						style={styles.searchIcon}
						name="magnify"
						size={28}
						color="#2f3542"
					/>
				</View>
				<TouchableOpacity
					style={{}}
					onPress={() => {
						setAlert(true);
						setIsOverlayVisible(true);
					}}
				>
					<MaterialCommunityIcons
						name="tune-vertical"
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
				<View style={{ height: 50, marginTop: 10, marginBottom: 10 }}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{}}
					>
						{TagsComponent}
					</ScrollView>
				</View>
				{flatlist}
				{overlayShadow}
				{/* {overlay} */}
			</View>

			{modal}
		</View>
	);
}

function mapStateToProps(state) {
	return { token: state.token };
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
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
		backgroundColor: "#f5f6fa",
	},

	searchSection: {
		flex: 1,
		height: 40,
		marginTop: 12,
		marginBottom: 12,

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
	filterContainer: {
		alignSelf: "center",
		paddingVertical: 5,
		paddingHorizontal: 10,
		margin: 5,
		borderWidth: 1,
		borderRadius: 100,
	},
	overlay: {
		flex: 1,
		alignItems: "center",
		position: "absolute",
		left: 0,
		top: 0,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: "#f5f6fa",
		width: "100%",
	},
	overlayShadow: {
		flex: 1,
		position: "absolute",
		left: 0,
		top: 0,
		opacity: 0.6,

		backgroundColor: "black",
		width: "100%",
	},
});
