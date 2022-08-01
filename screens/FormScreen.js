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
	Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function FormScreen(props) {
	const navigation = useNavigation();

	var handleSubmitForm = () => {
		let recipeObj = recipe;
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
		console.log(recipeObj)
		navigation.navigate("RecipeSheetScreen")
	}

	const [recipe, setRecipe] = useState({ name: "", image: "", prepTime: "", cookTime: "", author: "", direction: "", privateStatus: "", tags: [], ingredients: [] })

	const handleChange = (name, value) => {
		setRecipe({
			...recipe,
			[name]: value,
		});
	};
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
					placeholder="name"
				/>
				<TextInput
					style={styles.input}
					onChangeText={value => setInputQuantity(i, value)}
					value={refInputsQuantity.current[i]}
					placeholder="quantity"
				/>
				{/* To remove the input */}
				<Pressable onPress={() => removeInput(i)} style={{ marginLeft: 5 }}>
					<MaterialCommunityIcons
						name="close"
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
				</Pressable>
			</View>
		);
	}





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

				<Text style={styles.label}>Image</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('iamge', value)}
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

				<Text style={styles.label}>Auteur</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('author', value)}
					value={recipe.author}
				/>

				<Text style={styles.label}>Ingrédients</Text>
				{/* MULTPIPLE INPUTS */}
				{inputsIngredients}
				<Pressable onPress={addInput} style={styles.addButton}>
					<Text style={{ fontWeight: 'bold' }}><MaterialCommunityIcons
						name="plus"
						size={28}
						color="#2f3542"
						style={{
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 10,
							paddingBottom: 10,
							zIndex: 1,
						}}
					/> Add an ingredient</Text>
				</Pressable>
				<View style={{ marginTop: 25 }}>
					<Text>You have answered:</Text>
					{refInputs.current.map((value, i) => {
						return <Text key={i} style={styles.answer}>{`${i + 1} - ${value} `}</Text>
					})}
				</View>
				{/* FIN MULTIPLE INPUTS */}

				<Text style={styles.label}>Instructions</Text>
				<TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('direction', value)}
					value={recipe.direction}
				/>

				<Text style={styles.label}>Tags</Text>

				{/* <TextInput
					style={styles.input}
					onChangeText={(value) => handleChange('tags', value)}
					value={recipe.tags}
				/> */}

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
