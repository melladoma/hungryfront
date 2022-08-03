
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { privateIP } from "../env.js"

import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	Button,
	Text,
	TextInput,
	TouchableOpacity,
	Pressable,
	ImageBackground,
} from "react-native";


import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "react-native-vector-icons";


function SignUpScreen(props) {
	const navigation = useNavigation();

	const [searchInput, setSearchInput] = useState("");

	//------------mettre les champs de saisie a vide------------------
	const [signUpUsername, setSignUpUsername] = useState('')
	const [signUpEmail, setSignUpEmail] = useState('')
	const [signUpPassword, setSignUpPassword] = useState('')
	const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')
	//-----------------------------------------------------------------

	//-----------------------------------Show password -----------------
	const [passwordVisibility, setPasswordVisibility] = useState(true);
	const [rightIcon, setRightIcon] = useState('eye');
	//------------------------------------------------------------
	//pour si l'utilisater existe lui faire un redirect sur un page (if)--------
	const [userExists, setUserExists] = useState(false)
	//--------------------------------------------------------------------------

	//pour si l'utilisateur existe pas lui afficher une page d'err (else)-------
	const [listErrorsSignup, setErrorsSignup] = useState([])
	//--------------------------------------------------------------------------

	//le chemain du front au back
	var handleSubmitSignup = async () => {

		console.log('hello');
		const data = await fetch(`http://${privateIP}:3000/users/sign-up`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&confirmPasswordFromFront=${signUpConfirmPassword}`
		})

		//
		const body = await data.json()
		console.log(body);
		if (body.result == true) {
			props.addToken(body.token)
			setUserExists(true)

		} else {
			setErrorsSignup(body.error)
		}
		//-----------------------------------------------------------------
	}
	useEffect(() => {
		if (userExists) {
			console.log("le user existe (sign-up)");
			navigation.navigate("HomeDrawer2");
		}
	}, [userExists]);


	var tabErrorsSignup = listErrorsSignup.map((error, i) => {
		return (<Text style={{ color: 'red', height: 40, margin: 10 }} key={i}>{error}</Text>)
	})

	// -------------------------------------------------------REGEX verification email -----------------------------------------------------------
	const validateMail = (text) => {
		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		console.log(text, reg.test(text));
	};
	//------------------------------------------------------Fin REGEX -------------------------------------------------------------------------

	// -----------------------------------------------------Password show ----------------------------------------------------------------------
	const handlePasswordVisibility = () => {
		if (rightIcon === 'eye') {
			setRightIcon('eye-off');
			setPasswordVisibility(!passwordVisibility);
		} else if (rightIcon === 'eye-off') {
			setRightIcon('eye');
			setPasswordVisibility(!passwordVisibility);
		}
	};
	//------------------------------------------------------fin password show ---------------------------------------------------------------

	//----------------------------------------------------BOUTON -----------------------------------------------------
	const AppButton = ({ onPress, title }) => (
		<TouchableOpacity onPress={() => handleSubmitSignup()} style={styles.appButtonContainer}>
			<Text style={styles.appButtonText}>
				{title}
			</Text>
		</TouchableOpacity>
	);
	//-------------------------------------------------Fin bouton ----------------------------------------------


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

	return (
		<ImageBackground source={require('../assets/fork.jpg')} style={styles.container} >
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" />

			<View style={{ marginTop: 100, }}>
				<Text style={styles.baseText}>
					THE
				</Text>
				<Text style={styles.baseText}>
					HUNGRY-BOOK
				</Text>
			</View>

			<View style={styles.content}>


				<TextInput
					style={styles.inputContainer}
					inputStyle={{ marginLeft: 10 }}
					placeholder="Pseudo"

					onChangeText={(val) => setSignUpUsername(val)}
					value={signUpUsername}

				/>

				<TextInput
					style={styles.inputContainer}
					inputStyle={{ marginLeft: 10 }}
					placeholder='Votre adresse E-mail'
					keyboardType="email-address"

					onChangeText={(val) => setSignUpEmail(val)}
					value={signUpEmail}

				/>
				<View style={styles.inputContainer}>
					<TextInput

						inputStyle={{ marginLeft: 10 }}
						placeholder='Votre mot de passe'
						secureTextEntry={passwordVisibility}

						onChangeText={(val) => setSignUpPassword(val)}
						value={signUpPassword}

					/>
					<Pressable onPress={handlePasswordVisibility}>
						<MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
					</Pressable>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						inputStyle={{ marginLeft: 10 }}
						placeholder='Confirmer votre mot de passe'
						secureTextEntry={passwordVisibility}

						onChangeText={(val) => setSignUpConfirmPassword(val)}
						value={signUpConfirmPassword}

					/>
					<Pressable onPress={handlePasswordVisibility}>
						<MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
					</Pressable>
				</View>
				{tabErrorsSignup}

				{/* <Button
						title="Valider l'inscription"
						onPress={() => handleSubmitSignup()}
					/> */}
				<View style={styles.screenContainer}>
					<AppButton title="Créer mon compte" size="sm" />
				</View>
			</View>




			<TouchableOpacity
				style={{}}
				onPress={() => navigation.goBack()}
			>
				<MaterialCommunityIcons
					name="arrow-left"
					size={28}
					color="#dfe4ea"
					style={{
						paddingLeft: 20,
						paddingRight: 20,
						paddingTop: 10,
						paddingBottom: 10,
						zIndex: 1,

					}}
				/>
			</TouchableOpacity>
		</ImageBackground>
	);
}

/* function mapStateToProps(state) {
	return { listPOIFromState: state.listPOI };
}
*/
function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		}
	}
}


export default connect(null, mapDispatchToProps)(SignUpScreen);

//export default SignUpScreen;

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56;
// https://stackoverflow.com/a/39300715

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f6fa",

	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		margin: '15%',

	},
	baseText: {
		fontWeight: 'bold',
		margin: 35,
		fontSize: 25,
	},
	inputContainer: {
		backgroundColor: 'white',
		width: '100%',
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 4,
		borderColor: '#d7d7d7'
	},
	inputField: {
		padding: 14,
		fontSize: 22,
		width: '90%'
	},
	baseText: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 50,
		color: "#e67e22",
		borderColor: "#fff",
		textShadowColor: '#2c3e50',
		textShadowOffset: { width: 3, height: 3 },
		textShadowRadius: 10,
	},
	inputContainer: {
		backgroundColor: '#dfe4ea',
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "space-between",
		borderWidth: 0.75,
		padding: 10,
		height: 55,
		margin: 10,

	},
	screenContainer: {
		//flex: 1,
		justifyContent: "center",
		padding: 16
	},
	appButtonContainer: {
		elevation: 8,
		backgroundColor: "#e67e22",
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


});
