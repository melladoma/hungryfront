import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { StatusBar } from "expo-status-bar";

import {
	View,
	ScrollView,
	Platform,
	Image,
	FlatList,
	StyleSheet,
	Button,
	Pressable,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	TextInput,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";


import { MaterialCommunityIcons } from "react-native-vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen( props) {
	const navigation = useNavigation()

	const [isDessertFilterSelected, setIsDessertFilterSelected] =
		useState(false);
	const [isTradionnelFilterSelected, setIsTraditionnelFilterSelected] =
		useState(true);
	const [isExampleFilterSelected, setIsExampleFilterSelected] =
		useState(false);

	const [isOverlayVisible, setIsOverlayVisible] = useState(false);

	const [typeAffichage, setTypeAffichage] = useState('icones');

	var dessertColor = "white";
	if (isDessertFilterSelected) {
		dessertColor = "grey";
	}

	const [searchInput, setSearchInput] = useState("");

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

	var Item
	var flatlist
	if (typeAffichage === 'icones') {
	Item = ({ source, title }) => (
		<TouchableOpacity onPress={() => navigation.navigate('RecipeSheetScreen')}>
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
			<Text style={{ height: "15%", padding: 5 }}>{title}</Text>
			<Image
				style={{
					height: "85%",
					width: "100%",
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
				}}
				source={source}
			/>
		</View></TouchableOpacity>
	);

	const renderItem = ({ item }) => (
		<Item source={item.source} title={item.title} />
	);

	flatlist = <FlatList
	key={'icones'}
	showsVerticalScrollIndicator={false}
	columnWrapperStyle={{ justifyContent: "space-evenly" }}
	numColumns={2}
	data={DATA}
	renderItem={renderItem}
	keyExtractor={(item) => item.id}
/>
} else if (typeAffichage === 'liste') {
	Item = ({ source, title }) => (
	<TouchableOpacity onPress={() => navigation.navigate('RecipeSheetScreen')}>
		<View
			style={{
				display:'flex',
				flexDirection:'row',
				height: 150,
				width: '90%',
				alignSelf:'center',
				
				marginTop: 10,
				borderRadius: 10,
				borderWidth: 1,
			}}
		>
			<Image
				style={{
					height:'100%',
					width: "40%",
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 0,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 0,
					
				}}
				source={source}
			/>
			<View style={{margin:10}}>
				<Text style={{ fontSize:20}}>{title}</Text>
				<Text style={{ fontSize:15}}>Hum tres bonne tarte</Text>
				<Text style={{ fontSize:15, fontWeight:'bold' }}>#Dylan</Text>
				<Text style={{ fontSize:15 }}>58 Likes</Text>
			</View>
			
			
		</View></TouchableOpacity>
	);

	const renderItem = ({ item }) => (
		<Item source={item.source} title={item.title} />
	);

	flatlist = <FlatList
	showsVerticalScrollIndicator={false}
	key={'liste'}
	data={DATA}
	renderItem={renderItem}
	keyExtractor={(item) => item.id}
/>
}

	
	//----------------------------- ------------------------------------Fin de la flatList

	//----------------------------- ------------------------------------Début StatusBar
	const MyStatusBar = ({ backgroundColor, ...props }) => (
		<View style={[styles.statusBar, { backgroundColor }]}>
			<SafeAreaView>
				<StatusBar
					translucent
					backgroundColor={backgroundColor}
					{...props}
				/>
			</SafeAreaView>
		</View>
	);
	//----------------------------- ------------------------------------Fin de StatusBar

	var overlay;
	if (isOverlayVisible) {
		overlay = <View style={[styles.overlay, { height: 360 }]} ><Text>Type d'affichage:</Text><Button title='Icônes' onPress={()=> {setTypeAffichage('icones'); setIsOverlayVisible(!isOverlayVisible)} }></Button><Text>ou</Text><Button title='Liste' onPress={()=> {setTypeAffichage('liste'); setIsOverlayVisible(!isOverlayVisible)} }></Button></View>;
	}
	var overlayShadow;
	if (isOverlayVisible) {
		overlayShadow = (
			<View style={[styles.overlayShadow, { height: "100%" }]} />
		);
	}
	//-----------------------------------RENDER-----------------------------------
	return (
		<View style={styles.container}>
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="light-content" />
			<View style={styles.appBar}>
				<TouchableOpacity
					style={{ }}
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
					<TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}><MaterialCommunityIcons
						style={styles.searchIcon}
						name="magnify"
						size={28}
						color="#2f3542"
						
					/></TouchableOpacity>
					
				</View>
				<TouchableOpacity
					style={{ }}
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
						<Pressable
							onPress={() =>
								setIsDessertFilterSelected(
									!isDessertFilterSelected
								)
							}
						>
							<View
								style={[
									styles.filterContainer,
									{ backgroundColor: dessertColor },
								]}
							>
								<Text>Dessert</Text>
							</View>
						</Pressable>
						<Pressable
							onPress={() =>
								setIsDessertFilterSelected(
									!isDessertFilterSelected
								)
							}
						>
							<View
								style={[
									styles.filterContainer,
									{ backgroundColor: dessertColor },
								]}
							>
								<Text>Dessert</Text>
							</View>
						</Pressable>
						<Pressable
							onPress={() =>
								setIsDessertFilterSelected(
									!isDessertFilterSelected
								)
							}
						>
							<View
								style={[
									styles.filterContainer,
									{ backgroundColor: dessertColor },
								]}
							>
								<Text>Dessert</Text>
							</View>
						</Pressable>
						<Pressable
							onPress={() =>
								setIsDessertFilterSelected(
									!isDessertFilterSelected
								)
							}
						>
							<View
								style={[
									styles.filterContainer,
									{ backgroundColor: dessertColor },
								]}
							>
								<Text>Dessert</Text>
							</View>
						</Pressable>
						<Pressable
							onPress={() =>
								setIsDessertFilterSelected(
									!isDessertFilterSelected
								)
							}
						>
							<View
								style={[
									styles.filterContainer,
									{ backgroundColor: dessertColor },
								]}
							>
								<Text>Dessert</Text>
							</View>
						</Pressable>
						<Pressable
							onPress={() =>
								setIsDessertFilterSelected(
									!isDessertFilterSelected
								)
							}
						>
							<View
								style={[
									styles.filterContainer,
									{ backgroundColor: dessertColor },
								]}
							>
								<Text>Dessert</Text>
							</View>
						</Pressable>
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
}

function mapDispatchToProps(dispatch) {
	return {
		deletePOI: function (i) {
			dispatch({ type: "deletePOI", index: i });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen); */

export default HomeScreen;

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

/* Anciennes cards en 2 par 2:
const Item = ({ source, title }) => (
		<View
			style={{
				
				height: 200,
				width: 170,
				marginBottom: 10,
				marginTop: 10,
				borderRadius: 10,
				borderWidth: 1
			}}
		
		>
			<Text style={{ height: '15%', padding: 5 }}>
				{title}
			</Text>
			<Image
				style={{
					height: '85%',
					width: '100%',
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
				}}
				source={source}
			/>
		</View>
	);

	
<FlatList
				columnWrapperStyle={{ justifyContent: "space-evenly" }}
				numColumns={2}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
 */

/* façon de faire varier tout et n'importe quoi selon l'OS du téléphone : "ios" ou "android":
 Il faut importer Platform depuis react-native, ce qui est déjà fait ici :

const BiduleQueJeVeuxFaireVarierSelonOS = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
*/
