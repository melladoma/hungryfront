import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import { SafeAreaView } from "react-native-safe-area-context";
import {
	StatusBar,
	View,
	ScrollView,
	Platform,
	Image,
	FlatList,
	StyleSheet,
	Button,
	Pressable,
	TouchableOpacity,
	Text,
	TextInput,
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

function HomeScreen(props) {
	const tabBarHeight = useBottomTabBarHeight(); 
	props.onSubmitBottomTabHeight(tabBarHeight)

	const navigation = useNavigation(); //nécessaire pour la navigation par boutons/drawer/tab

	const [filtersArray, setFiltersArray] = useState([
		"Dessert",
		"Sans Gluten",
		"Rapide",
		"Végétarien",
		"Flexitarien",
		"Etc",
	]); //peut etre pas besoin d'en faire un useState si on ne les modifie pas ?
	const [selectedFiltersArray, setSelectedFiltersArray] = useState([]); //contient tous les filtres(ou chips) qui ont été selectionnées, pour les griser ou les colorer en orange grâce à un filter

	const [isOverlayVisible, setIsOverlayVisible] = useState(false); //sert à afficher l'overlay "filtres"
	const [typeAffichage, setTypeAffichage] = useState("icones"); //dans l'overlay filtre, gère le type d'affichage

	const [searchInput, setSearchInput] = useState(""); //value du TextInput de la barre de recherche

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

	//---------------------------------------------------------------Début Overlay qui contient les filtres
	var overlay;
	if (isOverlayVisible) {
		overlay = (
			<View style={[styles.overlay, { height: 360 }]}>
				<Text>Type d'affichage:</Text>
				<Button
					title="Icônes"
					onPress={() => {
						setTypeAffichage("icones");
						setIsOverlayVisible(!isOverlayVisible);
					}}
				></Button>
				<Text>ou</Text>
				<Button
					title="Liste"
					onPress={() => {
						setTypeAffichage("liste");
						setIsOverlayVisible(!isOverlayVisible);
					}}
				></Button>
			</View>
		);
	}
	var overlayShadow;
	if (isOverlayVisible) {
		overlayShadow = (
			<View style={[styles.overlayShadow, { height: "100%" }]} />
		);
	}
	//-----------------------------------------------------------------fin Overlay qui contient les filtres

	//-----------------------------------------------------------------Début Chips

	const handlePressedChip = (name) => {
		if (selectedFiltersArray.includes(name)) {
			let tempArray = selectedFiltersArray.filter((x) => x !== name);
			setSelectedFiltersArray(tempArray);
		} else {
			setSelectedFiltersArray([...selectedFiltersArray, name]);
		}
	};

	const Chips = filtersArray.map((x, i) => (
		<Pressable key={i} onPress={() => handlePressedChip(x)}>
			<View
				style={[
					styles.filterContainer,
					{
						backgroundColor: selectedFiltersArray.includes(x)
							? "#F19066"
							: "#dfe4ea",
					},
				]}
			>
				<Text>{x}</Text>
			</View>
		</Pressable>
	));
	//-----------------------------------------------------------------Fin Chips

	//  -----------------------------------------------------Début FlatList affichant les Cards
	//En React Native, il y a plusieurs étapes pour afficher des cards dans une FlatList:
	// DATA : ce sont les données de chaque card, là c'est en dur, mais après il faudra que ce soit dynamique
	// ITEM : c'est le composant Card, comme si on l'écrivait dans le render
	// Render Item : Création d'un composant "Item" à partir de ITEM que pourra lire la FlatList
	// FlatList : C'est le conteneur de toutes les cards. FlatList permet de scroller, scroll infini, disposition des cards en flex, etc... Il faut intégrer dans ses props DATA et Render Item. Puis c'est la FlatList qu'on intègre dans le render.

	const DATA = [
		//Contient toutes les infos de la recette qu'on veut afficher dans la card, après ce sera en dynamique dans un useState ou redux
		{
			id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28b",
			title: "Pain perdu",
			source: require("../assets/painperdu.jpeg"),
		},
		{
			id: "3ac68afc-c605-48d3-a4f8-fbd91a97f63",
			title: "Haricots",
			source: require("../assets/haricots.png"),
		},
		{
			id: "58694a0f-3da1-471f-bd96-14571e29d72",
			title: "Trou normand",
			source: require("../assets/image_noire.jpeg"),
		},
		{
			id: "58694a0f-3da1-471f-bd9145571e29d72",
			title: "Pain retrouvé",
			source: require("../assets/painperdu.jpeg"),
		},
		{
			id: "58694a0f-3da1-471f-bd9645571e29d72",
			title: "Flageolets",
			source: require("../assets/haricots.png"),
		},
		{
			id: "58694a0f-da1-471f-bd96-145571e29d72",
			title: "Pain perdu",
			source: require("../assets/adaptive-icon.png"),
		},
		{
			id: "58694a0f-3da1471f-bd96-145571e29d72",
			title: "Pain perdu",
			source: require("../assets/adaptive-icon.png"),
		},
		{
			id: "5864a0f-3da1-471f-bd96-145571e29d72",
			title: "Pain perdu",
			source: require("../assets/adaptive-icon.png"),
		},
		{
			id: "b7acbea-c1b1-46c2-aed5-3ad53abb28ba",
			title: "Pain perdu",
			source: require("../assets/painperdu.jpeg"),
		},
		{
			id: "3ac68afc-c605-48d3-a4f8-fbd91aa9f63",
			title: "Pain perdu",
			source: require("../assets/favicon.png"),
		},
		{
			id: "58694a0f-3da-471f-bd96-1451e29d72",
			title: "Pain perdu",
			source: require("../assets/image_noire.jpeg"),
		},
	];

	var Item;
	var flatlist;
	if (typeAffichage === "icones") {
		//-----------------------------affichage en "icones"
		if (Platform.OS === "ios") {
			//pour corriger clignotement iOS, voir les 2 commentaires plus bas
			Item = ({ source, title }) => (
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
						<Text style={{ height: "15%", padding: 5 }}>
							{title}
						</Text>
						<Image
							style={{
								height: "85%",
								width: "100%",
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
							}}
							defaultSource={source} //"defaultSource" à la place de "source" corrige le probleme de clignotement sur iOS
						/>
					</View>
				</TouchableOpacity>
			);
		} else {
			Item = ({ source, title }) => (
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
						<Text style={{ height: "15%", padding: 5 }}>
							{title}
						</Text>
						<Image
							style={{
								height: "85%",
								width: "100%",
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
							}}
							source={source} //Android ne prend pas en charge "defaultSource"
						/>
					</View>
				</TouchableOpacity>
			);
		}

		const renderItem = ({ item }) => (
			<Item source={item.source} title={item.title} />
		);

		flatlist = (
			<FlatList
				key={"icones"}
				showsVerticalScrollIndicator={false}
				columnWrapperStyle={{ justifyContent: "space-evenly" }}
				numColumns={2}
				data={DATA}
				renderItem={renderItem}
			/>
		);
	} else if (typeAffichage === "liste") {
		//--------------------------------affichage en "liste"
		if (Platform.OS === "ios") {
			Item = ({ source, title }) => (
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
							defaultSource={source}
						/>
						<View style={{ margin: 10 }}>
							<Text style={{ fontSize: 20 }}>{title}</Text>
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
		} else {
			Item = ({ source, title }) => (
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
							source={source}
						/>
						<View style={{ margin: 10 }}>
							<Text style={{ fontSize: 20 }}>{title}</Text>
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
		}

		const renderItem = (
			{ item } //étape nécessaire en react native pour
		) => <Item source={item.source} title={item.title} />;

		flatlist = (
			<FlatList //composant qu'on met dans le return
				showsVerticalScrollIndicator={false}
				key={"liste"}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		);
	}
	//----------------------------- ------------------------------------Fin de la flatList

	//-----------------------------------RENDER-----------------------------------
	return (
		<View style={{flex: 1}}>
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
					<TouchableOpacity
						onPress={() => navigation.navigate("SearchScreen")}
					>
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
					onPress={() => setIsOverlayVisible(!isOverlayVisible)}
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
				{overlay}
			</View>
		</View>
	);
}

/* function mapStateToProps(state) {
	return { listPOIFromState: state.listPOI };
}*/

function mapDispatchToProps(dispatch) {
	return {
		onSubmitBottomTabHeight: function (bottomTabHeight) {
			dispatch({ type: "initializeBottomTabHeight", bottomTabHeight: bottomTabHeight });
		},
	};
}

export default connect(null, mapDispatchToProps)(HomeScreen); 



//---------------------------------------------------------------début feuille de style

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44; //permet de faire varier la taille de la status bar selon le téléphone
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56; //permet de faire varier la taille de l'AppBar selon le téléphone
// https://stackoverflow.com/a/39300715

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
		position: "absolute",
		left: 0,
		top: 0,
		opacity: 0.97,
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		backgroundColor: "white",
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
