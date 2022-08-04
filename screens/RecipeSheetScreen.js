import React, { useState, useEffect, Component } from "react";
import { connect } from "react-redux";
import {
	useNavigation,
	DrawerActions,
	useIsFocused,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { privateIP } from "../env.js";

import { SafeAreaView } from "react-native-safe-area-context";

import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	ScrollView,
	Modal,
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

function RecipeSheetScreen(props) {
	const navigation = useNavigation();
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteRecipe, setDeleteRecipe] = useState([]);
	const isFocused = useIsFocused();
	const [recipeData, setRecipeData] = useState(props.recipe);
	const [isThisRecipeMine, setIsThisRecipeMine] = useState(false);

	useEffect(() => {
		if (isFocused) {
			setRecipeData(props.recipe);

			props.recipe.author.token === props.token
				? setIsThisRecipeMine(true)
				: setIsThisRecipeMine(false);
		}
	}, [isFocused]);

	let modificationPencilIcon = null;
	let deletionTrashIcon = null;
	let likeHeartIcon = (
		<TouchableOpacity
			style={{}}
			onPress={() => {
				/* handlePressHeartIcon(props.recipe._id) */
			}}
		>
			<MaterialCommunityIcons
				name="heart"
				size={25}
				color="#ff4757"
				style={{}}
			/>

			<Text>{recipeData.likeCount}</Text>
		</TouchableOpacity>
	);

	if (isThisRecipeMine) {
		modificationPencilIcon = (
			<TouchableOpacity
				style={{}}
				onPress={() => navigation.navigate("FormScreen")}
			>
				<MaterialCommunityIcons
					name="pencil"
					size={25}
					color="#2f3542"
					style={{
						paddingLeft: 10,
						marginTop: 5,
					}}
				/>
			</TouchableOpacity>
		);

		deletionTrashIcon = (
			<TouchableOpacity
				style={{}}
				onPress={() => {
					handlePressTrashIcon(props.recipe._id);
				}}
			>
				<MaterialCommunityIcons
					name="delete"
					size={25}
					color="#2f3542"
					style={{
						paddingLeft: 10,
						marginTop: 5,
					}}
				/>
			</TouchableOpacity>
		);

		likeHeartIcon = (
			<View>
				<MaterialCommunityIcons
					name="heart"
					size={25}
					color="#ff4757"
					style={{}}
				/>

				<Text>{recipeData.likeCount}</Text>
			</View>
		);
	}

	//ce que je veux afficher ou pas:
	/*  -le crayon et la poubelle sont là, et coeur pas cliquable et déjà 1 like, si ça vient de HomeScreen et FormScreen car c'est donc ma recette
	-pas de crayon, ni poubelle si ça vient de FeedScreen, coeur cliquable (car a priori mes recettes s'affichent pas dans le feed)
	-si ça vient de l'agenda je sais pas*/

	/* if (props.provenanceDeLaRecette === "HomeScreen" || props.provenanceDeLaRecette === "FormScreen") {

	} else if (props.provenanceDeLaRecette === "FeedScreen") */

	if (recipeData.ingredients && recipeData.ingredients.length > 0) {
		var ingredientList = recipeData.ingredients.map((ingredient, i) => {
			return (
				<View key={i} style={styles.ligne}>
					<Text style={{ fontSize: 19, marginLeft: 25 }}>
						{ingredient.name}
					</Text>
					<View>
						<Text style={{ fontSize: 19, marginRight: 18 }}>
							{ingredient.quantity}
						</Text>
					</View>
				</View>
			);
		});
	}

	if (recipeData.tags && recipeData.tags.length > 0) {
		var tag = recipeData.tags.map((data, i) => {
			return (
				<View key={i} style={styles.tagAlign}>
					<Text style={styles.tag}>{data}</Text>
				</View>
			);
		});
	}

	const AppButton = ({ onPress, title }) => (
		<TouchableOpacity
			onPress={() => setModalOpen(true)}
			style={styles.appButtonContainer}
		>
			<Text style={styles.appButtonText}>{title}</Text>
			<MaterialCommunityIcons
				name="play"
				size={28}
				color="#ffffff"
				onPress={() => setModalOpen(true)}
			/>
		</TouchableOpacity>
	);

	const CloseModal = ({ onPress, title }) => (
		<TouchableOpacity
			onPress={() => setModalOpen(false)}
			style={styles.appButtonContainer}
		>
			<Text style={styles.appButtonText}>{title}</Text>
			<MaterialCommunityIcons
				name="close"
				size={28}
				color="#ffffff"
				onPress={() => setModalOpen(false)}
			/>
		</TouchableOpacity>
	);

	//----------------------------------------------------------- Fin Boutons--------------------------------------
	//---------------------------------------------------------- DELETE RECIPE -------------------------------------------
	var handlePressTrashIcon = async (id) => {
		var rawResponse = await fetch(
			`http://${privateIP}:3000/recipesheet/delete-recipe`,
			{
				method: "post",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `id=${id}`,
			}
		);

		var response = await rawResponse.json();
		response.result === true ? navigation.goBack() : navigation.goBack(); //REMPLACER PAR :faire apparaitre modal qui dit qu'il y a eu une erreur !!!!!!!!!!!
	};
	//---------------------------------------------------------- FIN DELETE RECIPE -------------------------------------------
	return (
		<View style={styles.container}>
			{/*-----------------------------------------------------Nom de recette + edit ---------------------------------------------------------  */}

			<ScrollView>
				<Text h1 style={styles.recipeName}>
					{recipeData.name}
					{modificationPencilIcon}
				</Text>

				{/*-----------------------------------------------------nom du créateur + semainier + ajout a la collection ---------------------------------------------------------  */}
				<View style={styles.ligne}>
					{/* <TouchableOpacity
						style={{}}
						onPress={() => navigation.navigate("HomeDrawer2")}
					>
						<MaterialCommunityIcons
							name="book-plus"
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

					{deletionTrashIcon}

					<Text style={styles.userName}>
						{recipeData.author.username}
					</Text>
					<TouchableOpacity
						style={{}}
						onPress={() => navigation.navigate("PlannerScreen")}
					>
						<MaterialCommunityIcons
							name="calendar"
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
				{/* ------------------------------------------------------------Image + tag------------------------------------------------- */}
				<View>
					<Image
						style={styles.recipePicture}
						source={{
							uri: recipeData.image,
						}}
					/>
				</View>

				<View style={styles.ligne}>
					{tag}

					<View style={styles.like}>{likeHeartIcon}</View>
				</View>

				{/*------------------------------------------------------------Temps de Préparation + bouton d'indentation ------------------------------------  */}
				<View style={styles.center}>
					<View style={styles.time}>
						<View style={{ marginLeft: 8 }}>
							<Text
								style={{
									textAlign: "center",
									color: "#F19066",
									fontSize: 24,
								}}
							>
								{recipeData.prepTime}
							</Text>
							<Text>Préparation</Text>
						</View>
						<View>
							<Text
								style={{
									textAlign: "center",
									color: "#F19066",
									fontSize: 24,
								}}
							>
								{recipeData.cookTime}
							</Text>
							<Text>Cuisson</Text>
						</View>
						<View style={{ marginRight: 8 }}>
							<Text
								style={{
									textAlign: "center",
									color: "#F19066",
									fontSize: 24,
								}}
							>
								{recipeData.servings}
							</Text>
							<Text>Personnes</Text>
						</View>
					</View>
				</View>

				{/*--------------------------------------------------------------List des ingrédients ---------------------------------------------------------*/}
				<View style={styles.ligne}>
					<Text
						h1
						style={{
							fontSize: 24,
							fontWeight: "bold",
							marginBottom: 8,
						}}
					>
						{" "}
						Ingrédients
					</Text>
					<TouchableOpacity
						style={{}}
						onPress={() =>
							navigation.navigate("ShoppingListScreen")
						}
					>
						<MaterialCommunityIcons
							name="cart"
							size={28}
							color="#2f3542"
							style={{
								paddingLeft: 20,
								paddingRight: 20,
								zIndex: 1,
							}}
						/>
					</TouchableOpacity>
				</View>
				<ScrollView style={{ height: 200 }}>
					{ingredientList}
				</ScrollView>

				{/*---------------------------------------------------------------------Modale recette pas a pas ----------------------------------------------------------  */}

				<View style={styles.screenContainer}>
					<AppButton title="Commencer à cuisiner" size="sm" />
				</View>
				<Modal visible={modalOpen}>
					<View style={styles.modal}>
						<ScrollView>
							<View>
								<Text h1 style={styles.recipeName}>
									{recipeData.name}
								</Text>

								<Text style={{ fontSize: 20 }}>
									{recipeData.directions}
								</Text>
							</View>
							<View style={styles.screenContainer}>
								<CloseModal
									title="Retour à la liste des ingédients"
									size="sm"
								/>
							</View>
						</ScrollView>
					</View>
				</Modal>

				{/* -----------------------------------------------------Commentaires----------------------------------------------------------------- */}

				<View style={styles.tagAlign}>
					<Text style={{ fontSize: 18 }}>Commentaires</Text>
					<MaterialCommunityIcons
						name="comment"
						size={25}
						color="#d35400"
						style={{}}
					/>
				</View>

				{/*--------------------------------------------------------------Bottom page / retour a la page d'avant ------------------------------------------  */}

				<TouchableOpacity
					style={{}}
					onPress={() => navigation.navigate("HomeDrawer2")}
				>
					<MaterialCommunityIcons
						name="arrow-left"
						size={28}
						color="#2f3542"
						style={{
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 10,
							zIndex: 1,
						}}
					/>
				</TouchableOpacity>
			</ScrollView>
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
		onSubmitBottomTabHeight: function (bottomTabHeight) {
			dispatch({ type: "initializeBottomTabHeight", bottomTabHeight: bottomTabHeight });
		},
	};
}*/

export default connect(mapStateToProps, null)(RecipeSheetScreen);

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56;
// https://stackoverflow.com/a/39300715

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f6fa",
		marginTop: 35,
	},
	recipeName: {
		textAlign: "center",
		fontSize: 25,
	},
	userName: {
		fontSize: 15,
		marginBottom: 5,
		marginTop: 2,
	},
	recipePicture: {
		width: 450,
		height: 170,
	},
	tag: {
		width: 75,
		backgroundColor: "#F19066",
		borderRadius: 10,
		marginLeft: 5,
		textAlign: "center",
	},
	ligne: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 5,
	},
	like: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginRight: 4,
	},
	tagAlign: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	time: {
		width: 350,
		height: 80,
		backgroundColor: "#dfe4ea",
		borderRadius: 15,
		marginLeft: 5,
		marginTop: 15,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		textAlign: "center",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	screenContainer: {
		//flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	appButtonContainer: {
		elevation: 8,
		backgroundColor: "#F19066",
		borderRadius: 25,
		paddingVertical: 10,
		paddingHorizontal: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
	},

	title: {
		fontSize: 25,
		marginTop: 15,
		textAlign: "center",
		color: "#F19066",
	},
	step: {
		fontSize: 18,
		textAlign: "justify",
	},
});
