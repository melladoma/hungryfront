import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

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

import { MaterialCommunityIcons } from "react-native-vector-icons";

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44; //permet de faire varier la taille de la status bar selon le téléphone
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56; //permet de faire varier la taille de l'AppBar selon le téléphone
// https://stackoverflow.com/a/39300715

function HomeScreen(props) {
	const [alert, setAlert] = useState(false);
	const [DATA, setDATA] = useState([]);
	const tabBarHeight = useBottomTabBarHeight();
	useEffect(() => {
		props.onSubmitBottomTabHeight(tabBarHeight);
	}, []);

	const navigation = useNavigation(); //nécessaire pour la navigation par boutons/drawer/tab

	var tags = [
		"entrée",
		"plat",
		"dessert",
		"amuse-bouche",
		"boisson",
		"asiatique",
		"américain",
		"italien",
		"diététique",
		"végétarien",
		"rapide",
		"gastronomique",
		"recette de fête",
		"brunch",
	]; //peut etre pas besoin d'en faire un useState si on ne les modifie pas ?
	const [selectedFiltersArray, setSelectedFiltersArray] = useState([]); //contient tous les filtres(ou chips) qui ont été selectionnées, pour les griser ou les colorer en orange grâce à un filter

	const [isOverlayVisible, setIsOverlayVisible] = useState(false); //sert à afficher l'overlay "filtres"

	const [typeAffichage, setTypeAffichage] = useState("icones"); //dans l'overlay filtre, gère le type d'affichage

	const [searchInput, setSearchInput] = useState(""); //value du TextInput de la barre de recherche

	const handleSearch = (input) => {
		if (input.length !== 0) {
			props.onSubmitSearchInput(input);
			navigation.navigate("SearchScreen");
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

	//-----------------------------------------------------------------Début Chips

	const handlePressedChip = async (name) => {
		if (selectedFiltersArray.includes(name.toLowerCase())) {
			let tempArray = selectedFiltersArray.filter(
				(x) => x !== name.toLowerCase()
			);
			setSelectedFiltersArray(tempArray);
		} else {
			setSelectedFiltersArray([
				...selectedFiltersArray,
				name.toLowerCase(),
			]);
		}
	};

	useEffect(() => {
		async function fetchByTags() {
			var rawResponse = await fetch(
				"http://192.168.1.24:3000/search/search-tags",
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
	}, [selectedFiltersArray]);

	const Chips = tags.map((x, i) => (
		<Pressable key={i} onPress={() => handlePressedChip(x)}>
			<View
				style={[
					styles.filterContainer,
					{
						backgroundColor: selectedFiltersArray.includes(
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

	//Chips de l'overlay
	const overlayChips = tags.map((x, i) => (
		<TouchableOpacity
			key={i}
			onPress={() => {
				handlePressedChip(x);
				
			}}
		>
			<View
				style={[
					styles.filterContainer,
					{
						backgroundColor: selectedFiltersArray.includes(
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
	//-----------------------------------------------------------------Fin Chips

	//----Début Overlay qui contient les filtres
	/* var overlay;
	if (isOverlayVisible) {
		overlay = (
			
			<View style={[styles.overlay, { height: 360 }]}>
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
									setIsOverlayVisible(!isOverlayVisible);
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
									setIsOverlayVisible(!isOverlayVisible);
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
					{overlayChips}
				</View>
			</View>
		);
	} */

	var overlayShadow;
	if (isOverlayVisible) {
		overlayShadow = (
			<View style={[styles.overlayShadow, { height: "100%" }]} />
		);
	}

	//-----------------------------------------------------------------fin Overlay qui contient les filtres

	//MOdal qui remplacera l'overlay ?-----
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
							{overlayChips}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</TouchableOpacity>
		</Modal>
	);
	//-----------------fin modal

	//  -----------------------------------------------------Début FlatList affichant les Cards
	//En React Native, il y a plusieurs étapes pour afficher des cards dans une FlatList:
	// DATA : ce sont les données de chaque card, là c'est en dur, mais après il faudra que ce soit dynamique
	// ITEM : c'est le composant Card, comme si on l'écrivait dans le render
	// Render Item : Création d'un composant "Item" à partir de ITEM que pourra lire la FlatList
	// FlatList : C'est le conteneur de toutes les cards. FlatList permet de scroller, scroll infini, disposition des cards en flex, etc... Il faut intégrer dans ses props DATA et Render Item. Puis c'est la FlatList qu'on intègre dans le render.

	var Item;
	var flatlist;
	if (typeAffichage === "icones") {
		//-----------------------------affichage en "icones"
		Item = ({ image, name }) => (
			<TouchableOpacity
				onPress={() => navigation.navigate("RecipeSheetScreen")}
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
					<Text style={{ height: "15%", padding: 5 }}>{name}</Text>
					<Image
						style={{
							height: "85%",
							width: "100%",
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
							borderTopLeftRadius: 0,
							borderTopRightRadius: 0,
						}}
						source={{ uri: image }} //Android ne prend pas en charge "defaultSource"
					/>
				</View>
			</TouchableOpacity>
		);

		const renderItem = ({ item }) => (
			<Item image={item.image} name={item.name} />
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

		Item = ({ image, name }) => (
			<TouchableOpacity
				onPress={() => navigation.navigate("RecipeSheetScreen")}
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
						source={{ uri: image }}
					/>
					<View style={{ margin: 10 }}>
						<Text style={{ fontSize: 20 }}>{name}</Text>
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

		const renderItem = ({ item }) => (
			<Item image={item.image} name={item.name} />
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
					<TouchableOpacity onPress={() => handleSearch(searchInput)}>
						<MaterialCommunityIcons
							style={styles.searchIcon}
							name="magnify"
							size={28}
							color="#2f3542"
						/>
					</TouchableOpacity>
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
						{Chips}
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

/* function mapStateToProps(state) {
	return { listPOIFromState: state.listPOI };
}*/

function mapDispatchToProps(dispatch) {
	return {
		onSubmitBottomTabHeight: function (bottomTabHeight) {
			dispatch({
				type: "initializeBottomTabHeight",
				bottomTabHeight: bottomTabHeight,
			});
		},
		onSubmitSearchInput: function (searchInput) {
			dispatch({
				type: "copyInputFromHome",
				searchInput: searchInput,
			});
		},
	};
}

export default connect(null, mapDispatchToProps)(HomeScreen);

//---------------------------------------------------------------début feuille de style

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
