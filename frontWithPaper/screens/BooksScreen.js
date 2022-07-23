import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { StatusBar } from "expo-status-bar";
import { View, ScrollView, Platform, Image, FlatList } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
	Appbar,
	Searchbar,
	Chip,
	Avatar,
	Button,
	Card,
	Title,
	Paragraph,
	Surface,
	Text,
} from "react-native-paper";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

/* façon de faire varier les icones selon l'OS du téléphone, "ios" ou "android", il faut aussi importer Platform depuis react-native :
On peut aussi faire varier tout et n'importe quoi, dans un OS aficher un composant et dans l'autre non.
const nomIconeSelonOS = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
*/

function BookScreen({ navigation }, props) {
	const [isDessertChipSelected, setIsDessertChipSelected] = useState(false);
	const [isTradionnelChipSelected, setIsTraditionnelChipSelected] =
		useState(true);
	const [isExampleChipChipSelected, setIsExampleChipChipSelected] =
		useState(false);

	// -------------------------------------------------------------- Début SearchBar
	const [searchQuery, setSearchQuery] = useState("");
	const onChangeSearch = (query) => setSearchQuery(query);
	const [searchBarIsVisible, setSearchBarIsVisible] = useState(false);

	var searchBar;
	if (searchBarIsVisible) {
		searchBar = (
			<Searchbar
				placeholder="Search"
				onChangeText={onChangeSearch}
				value={searchQuery}
			/>
		);
	}
	// ---------------------------------------------------------------- Fin SearchBar

	//  -----------------------------------------------------Début FlatList affichant les Cards
	const DATA = [
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

	//autre technique pour faire des cards avec ombres pour n'importe quoi
	//(on englobe le composant(Image, texte, etc), auquel on veut créer un effet,
	//avec le composant Surface)
	/* const Item = ({ source }) => (
		<Surface
			style={{
				maxHeight: 170,
				width: 170,
				marginBottom: 10,
				marginTop: 10,
				borderRadius: 10,
			}}
			elevation={5}
		>
			<Image
				style={{
					height: 170,
					width: 170,
					borderRadius: 10,
				}}
				source={source}
			/>
		</Surface>
	); */

	const Item = ({ source, title }) => (
		<Card
			style={{
				height: 200,
				width: 170,
				marginBottom: 10,
				marginTop: 10,
				borderRadius: 10,
			}}
			elevation={5} //modifier pour changer la profondeur (effet d'ombre aoutour de la card)
		>
			<Card.Content style={{ height: 30, paddingTop: 0 }}>
				<Title style={{ fontSize: 15 }}>{title}</Title>
			</Card.Content>
			<Card.Cover
				style={{
					height: 170,
					width: 170,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
				}}
				source={source}
			/>
		</Card>
	);

	const renderItem = ({ item }) => (
		<Item source={item.source} title={item.title} />
	);
	//----------------------------- ------------------------------------Fin de la flatList

	//-----------------------------------RENDER-----------------------------------
	return (
		<View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
			<Appbar.Header
				style={{
					backgroundColor: "white",
				}}
			>
				<Appbar.Action
					icon='menu'
					onPress={() =>
						navigation.dispatch(DrawerActions.openDrawer())
					}
				/>
				<Appbar.Content
					titleStyle={{ fontWeight: "bold" }}
					title="Recettes de Noël"
				/>
				<Appbar.Action
					icon="magnify"
					onPress={() => setSearchBarIsVisible(!searchBarIsVisible)}
				/>
				<Appbar.Action
					icon="plus"
					onPress={() => console.log("Pressed mail")}
				/>
			</Appbar.Header>

			{searchBar}
			<View style={{ height: 50, marginTop: 10, marginBottom: 10 }}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<Chip
						selected={isDessertChipSelected}
						style={{
							height: 40,
							marginTop: 5,
							marginBottom: 5,
							marginRight: 0,
							marginLeft: 10,
						}}
						mode="outlined"
						onPress={() =>
							setIsDessertChipSelected(!isDessertChipSelected)
						}
					>
						Dessert
					</Chip>
					<Chip
						selected={isTradionnelChipSelected}
						style={{
							height: 40,
							marginTop: 5,
							marginBottom: 5,
							marginRight: 0,
							marginLeft: 10,
						}}
						mode="outlined"
						onPress={() =>
							setIsTraditionnelChipSelected(
								!isTradionnelChipSelected
							)
						}
					>
						Traditionnel
					</Chip>
					<Chip
						selected={isExampleChipChipSelected}
						style={{
							height: 40,
							marginTop: 5,
							marginBottom: 5,
							marginRight: 0,
							marginLeft: 10,
						}}
						mode="outlined"
						onPress={() =>
							setIsExampleChipChipSelected(
								!isExampleChipChipSelected
							)
						}
					>
						Example Chip
					</Chip>
					<Chip
						style={{
							height: 40,
							marginTop: 5,
							marginBottom: 5,
							marginRight: 0,
							marginLeft: 10,
						}}
						mode="outlined"
						onPress={() => console.log("Pressed")}
					>
						Example Chip
					</Chip>
					<Chip
						style={{
							height: 40,
							marginTop: 5,
							marginBottom: 5,
							marginRight: 0,
							marginLeft: 10,
						}}
						mode="outlined"
						onPress={() => console.log("Pressed")}
					>
						Example Chip
					</Chip>
					<Chip
						style={{
							height: 40,
							marginTop: 5,
							marginBottom: 5,
							marginRight: 0,
							marginLeft: 10,
						}}
						mode="outlined"
						onPress={() => console.log("Pressed")}
					>
						Example Chip
					</Chip>
				</ScrollView>
			</View>
			<FlatList
				columnWrapperStyle={{ justifyContent: "space-evenly" }}
				numColumns={2}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
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

export default BookScreen;
