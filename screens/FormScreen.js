import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	Button,
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView,
	Pressable,
	Switch,
	KeyboardAvoidingView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function FormScreen(props) {
	const navigation = useNavigation();

	// ETAT OBJET RECIPE
	const [recipe, setRecipe] = useState({ name: "", image: "", prepTime: "", cookTime: "", author: "", direction: "", servings: "", privateStatus: "", tags: [], ingredients: [] })

	//-----------------------FONCTION DE SOUMISSION DU FORMULAIRE
	var handleSubmitForm = () => {
		let recipeObj = recipe;
		//------recup du multi champs ingredients et push dans l'objet recipe
		let recipeIngredientsCopy = [];
		for (let i = 0; i < numInputs; i++) {
			recipeIngredientsCopy.push({ name: refInputs.current[i], quantity: refInputsQuantity.current[i] })
		}
		let tagsCopy = [];
		// for (let i = 0; i < numInputsTags; i++) {
		// 	tagsCopy.push(refInputsTags.current[i])
		// }
		recipeObj.ingredients = recipeIngredientsCopy;
		recipeObj.tags = tagsCopy;
		recipeObj.privateStatus = !isEnabled;
		recipeObj.tags = selectedFiltersArray;
		console.log(recipeObj)

		//---------envoi recipeObj dans store
		// props.setRecipe(recipeObj)
		navigation.navigate("RecipeSheetScreen")
	}

	//-----------------------FIN FONCTION DE SOUMISSION DU FORMULAIRE

	//-------------FONCTION MISE A JOUR DES CHAMPS SUR LE STATE RECIPE
	const handleChange = (name, value) => {
		setRecipe({
			...recipe,
			[name]: value,
		});
	};
	//-------------FIN FONCTION MISE A JOUR DES CHAMPS SUR LE STATE RECIPE

	// ----------------------------------INPUTS INGREDIENTS
	const [textValue, setTextValue] = useState('');
	const [numInputs, setNumInputs] = useState(1);
	const refInputs = useRef([textValue]);
	const [numValue, setNumValue] = useState('');
	const refInputsQuantity = useRef([numValue]);

	const setInputValue = (index, value) => {
		const inputs = refInputs.current;
		inputs[index] = value;
		setTextValue(value)
	}
	const setInputQuantity = (index, value) => {
		const inputsQuantity = refInputsQuantity.current;
		inputsQuantity[index] = value;
		setNumValue(value)
	}
	const addInput = () => {
		// add a new element in our refInputs array
		refInputs.current.push('');
		refInputsQuantity.current.push('');
		// increase the number of inputs
		setNumInputs(value => value + 1);
	}
	const removeInput = (i) => {
		// remove from the array by index value
		refInputs.current.splice(i, 1)[0];
		refInputsQuantity.current.splice(i, 1)[0];
		// decrease the number of inputs
		setNumInputs(value => value - 1);
	}

	const inputsIngredients = [];
	for (let i = 0; i < numInputs; i++) {
		inputsIngredients.push(
			<View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Text>{i + 1}.</Text>
				<TextInput
					style={styles.input}
					onChangeText={value => setInputValue(i, value)}
					value={refInputs.current[i]}
					placeholder="ex: lait"
				/>
				<TextInput
					style={styles.input}
					onChangeText={value => setInputQuantity(i, value)}
					value={refInputsQuantity.current[i]}
					placeholder="20cL"
				/>
				{/* To remove the input */}
				<Pressable onPress={() => removeInput(i)} style={{ marginLeft: 5 }}>
					<MaterialCommunityIcons
						name="close"
						size={25}
						color="#2f3542"
						style={{
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 10,
							paddingBottom: 10,
							zIndex: 1,
						}}
					/>
				</Pressable>
			</View>
		);
	}
	// ----------------------------------FIN INPUTS INGREDIENTS

	//----------------------------------------SWITCH publication publique
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	//------------------------------------fin SWITCH publication publique

	//------------------------------------------TAG LIST
	var tags = ["entrée", "plat", "dessert", "amuse-bouche", "boisson", "asiatique", "américaine", "italien", "diététique", "végétarien", "rapide", "gastronomique", "recette de fête", "brunch"]
	const [selectedFiltersArray, setSelectedFiltersArray] = useState([]);
	const handlePressedChip = (name) => {
		if (selectedFiltersArray.includes(name)) {
			let tempArray = selectedFiltersArray.filter((x) => x !== name);
			setSelectedFiltersArray(tempArray);
		} else {
			setSelectedFiltersArray([...selectedFiltersArray, name]);
		}
	};

	var tagList = tags.map((item, index) => {
		var color = selectedFiltersArray.includes(item) ? "#F19066" : "#dfe4ea"
		return <TouchableOpacity key={index}
			style={{ backgroundColor: color, padding: 10, margin: 5, borderRadius: 5 }}
			onPress={() => handlePressedChip(item)}>
			<Text>{item}</Text>
		</TouchableOpacity >
	})

	//-------------------------------------------FIN TAG LIST

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
					onChangeText={(value) => handleChange('name', value)}
					value={recipe.name}
				/>

				<Text style={styles.label}>Auteur</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('author', value)}
					value={recipe.author}
				/>

				<Text style={styles.label}>Image</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('image', value)}
					value={recipe.image}
				/>
				<Text style={styles.label}>Temps de préparation</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('prepTime', value)}
					value={recipe.prepTime}
				/>

				<Text style={styles.label}>Temps de cuisson</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('cookTime', value)}
					value={recipe.cookTime}
				/>

				<Text style={styles.label}>Nombre de personnes</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('servings', value)}
					value={recipe.servings}
				/>

				<Text style={styles.label}>Ingrédients</Text>
				{/* MULTPIPLE INPUTS */}
				{inputsIngredients}
				<Pressable onPress={addInput} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
					<MaterialCommunityIcons
						name="plus"
						size={25}
						color="#2f3542"
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							zIndex: 1,
						}}
					/>
					<Text style={{ fontWeight: 'bold' }}> Ajouter un ingrédient</Text>
				</Pressable>

				{/* FIN MULTIPLE INPUTS */}

				<Text style={styles.label}>Instructions</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('direction', value)}
					value={recipe.direction}
				/>

				<Text style={styles.label}>Tags</Text>
				<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
					{tagList}
				</View>

				{/* <TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('tags', value)}
					value={recipe.tags}
				/> */}


				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
					<Text>Partager sur le feed Hungry: </Text>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={{ marginLeft: 10 }}>{isEnabled ? "oui" : "non"}</Text>
						<Switch
							style={{ marginRight: 10, marginLeft: 10 }}
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</View>


				<TouchableOpacity
					style={styles.button}
					title="Valider le formulaire"
					onPress={() => handleSubmitForm()}
				><Text style={styles.text}>Valider le formulaire</Text></TouchableOpacity>

			</ScrollView >


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
		</View >
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
