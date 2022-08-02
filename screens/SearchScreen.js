import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
	ScrollView,
	Image,
	FlatList,
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

	const [listAuthor, setListAuthor] = useState([]);
	const [dataByAuthor, setDataByAuthor] = useState([]);
	const [dataByName, setDataByName] = useState([]);
	const [dataByIngredients, setDataByIngredients] = useState([]);
	const [dataByDirections, setDataByDirections] = useState([]);

	const listAuthorComponent = listAuthor.map((x, i) => {
		return (
			<View
				style={{
					alignSelf: "center",
					paddingVertical: 5,
					paddingHorizontal: 10,
					margin: 5,
					borderWidth: 1,
					borderRadius: 100,
				}}
				key={i}
			>
				<Text style={{ height: 20 }} key={i}>
					{`#${x}`}
				</Text>
			</View>
		);
	});

	useEffect(() => {
		async function fetchByInput() {
			var rawResponse = await fetch(
				"http://192.168.1.24:3000/search/search-input",
				{
					method: "post",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `input=${searchInput}`,
				}
			);

			var response = await rawResponse.json();
			console.log(JSON.parse(response.listAuthor));
			setListAuthor(JSON.parse(response.listAuthor));
			setDataByName(response.recipesByName);
		}
		fetchByInput();
	}, [searchInput]);

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

	//Début flatlist-----------------------
	var Item;

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
					<Text style={{ fontSize: 15 }}>Hum tres bonne tarte</Text>
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

	//by author
	var authorFlatlist;
	authorFlatlist = (
		<FlatList //composant qu'on met dans le return
			showsVerticalScrollIndicator={false}
			key={"liste"}
			data={dataByAuthor}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
		/>
	);
	//by name&ingredients&directions
	let datas = [...dataByName, ...dataByIngredients, ...dataByDirections];
	var nameFlatlist;
	nameFlatlist = (
		<FlatList //composant qu'on met dans le return
			showsVerticalScrollIndicator={false}
			key={"liste"}
			data={datas}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
		/>
	);

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
			<View style={{ flex: 1, borderWidth: 1 }}>
				<View style={styles.content}>
					{listAuthor.length > 0 ? ( <>
						<Text style={{ alignSelf: "flex-start" }}>
						Nous avons trouvé des auteurs qui correspondent:
					</Text>
						<View style={{ height: 50, marginBottom: 10 }}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{}}
						>
							{listAuthorComponent}
						</ScrollView>
					</View></>
						
					) : null}
					<Text style={{ alignSelf: "flex-start" }}>
						Titres ou contenus qui correspondent:
					</Text>
					<View style={{ borderWidth: 1 }}>
						{dataByName.length > 0 ? (
							nameFlatlist
						) : (
							<Text>Aucune recette ne correspond</Text>
						)}
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
		searchInput: state.searchInput,
	};
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
		borderWidth: 0,

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
