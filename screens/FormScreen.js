import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	Button,
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "react-native-vector-icons";


function FormScreen(props) {
	const navigation = useNavigation();
	var handleSubmitForm = () => {
		navigation.navigate("RecipeSheetScreen")
	}


	//comment gerer multiple inputs in react native?
	const [recipeTags, setRecipeTags] = useState("");
	const [recipeIngredients, setRecipeIngredients] = useState("");

	const [recipe, setRecipe] = useState({ name: "", image: "", prepTime: "", cookTime: "", author: "", direction: "", privateStatus: "", tags: [], ingredients: [] })

	// const [ingredientsFormInputs, setIngredientsFormInputs] = React.useState([
	// 	{ key: "", name: "", quantity: "" },
	// 	{ key: "", name: "", quantity: "" },
	// ]);

	// //Add more inputs rows
	// const handleAddMoreLine = () => {
	// 	const _inputs = [...ingredientsFormInputs];
	// 	_inputs.push({ key: "", name: "", quantity: "" });
	// 	setIngredientsFormInputs(_inputs);
	// }
	// const inputHandleName = (text, key) => {
	// 	const _formNameInputs = [...ingredientsFormInputs];
	// 	_formNameInputs[key].key = key;
	// 	_formNameInputs[key].name = value;
	// 	setIngredientsFormInputs(_formNameInputs);
	// }

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
	//-----------------------------------------------------------------Fin de StatusBar

	return (
		<View style={styles.container}>
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" />
			{/* ------------------------------------Debut du formulaire */}
			<ScrollView style={{ flex: 1 }}>
				<Text style={styles.label}>Nom de la recette</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setRecipeName(value)}
					value={recipe.name}
				/>

				<Text style={styles.label}>Image</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setRecipeImage(value)}
					value={recipe.image}
				/>
				<Text style={styles.label}>Temps de préparation</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setPrepTime(value)}
					value={recipe.prepTime}
				/>

				<Text style={styles.label}>Temps de cuisson</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setCookTime(value)}
					value={recipe.cookTime}
				/>

				<Text style={styles.label}>Auteur</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setAuthor(value)}
					value={recipe.author}
				/>

				<Text style={styles.label}>Ingrédients</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setRecipeIngredients(value)}
					value={recipe.ingredients[0]}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setRecipeIngredients(value)}
					value={recipe.ingredients[0]}
				/>
				<Text style={styles.label}>Instructions</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setDirection(value)}
					value={recipe.direction}
				/>

				<Text style={styles.label}>Tags</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setRecipeTags(value)}
					value={recipe.tags[0]}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setRecipeTags(value)}
					value={recipe.tags[1]}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setRecipeTags(value)}
					value={recipe.tags[2]}
				/>

				<Text style={styles.label}>Publication</Text>
				{/* inserer toggle */}

				<TouchableOpacity
					style={styles.button}
					title="Valider le formulaire"
					onPress={() => handleSubmitForm()}
				><Text style={styles.text}>Valider le formulaire</Text></TouchableOpacity>
			</ScrollView>


			<View
				style={{
					height: props.bottomTabHeight,
					backgroundColor: "#f5f6fa",
					display: "flex",
					justifyContent: "center",
				}}
			>
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
					{/* ------------------------------------Fin du formulaire */}
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

export default connect(mapStateToProps, null)(FormScreen);



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
	content: {
		backgroundColor: "#f5f6fa",
		flex: 1,
		justifyContent: "space-between",
	},
	button: {
		backgroundColor: "#2F3542",
		alignItems: "center",
		padding: 10,
	},
	text: {
		color: "#f5f6fa",
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	label: {

	}
});
