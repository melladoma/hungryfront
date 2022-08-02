import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	Button,
	Text,
	TextInput,
	TouchableOpacity,
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


	//pour si l'utilisater existe lui faire un redirect sur un page (if)--------
	const [userExists, setUserExists] = useState(false)
	//--------------------------------------------------------------------------

	//pour si l'utilisateur existe pas lui afficher une page d'err (else)-------
	const [listErrorsSignup, setErrorsSignup] = useState([])
	//--------------------------------------------------------------------------

	//le chemain du front au back
	var handleSubmitSignup = async () => {

		console.log('hello');
		const data = await fetch("http://192.168.10.114:3000/users/sign-up", {
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
		return (<Text style={{ color: 'red' }} key={i}>{error}</Text>)
	})

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
		<View style={styles.container}>
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" />

			<View style={styles.content}>
				<View>
					<Text style={styles.baseText}>
						HUNGRYBOOK SIGN-UP
					</Text>
				</View>

				<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>


					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder="nom d'utilisateur"

						onChangeText={(val) => setSignUpUsername(val)}
						value={signUpUsername}

					/>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='Email'

						onChangeText={(val) => setSignUpEmail(val)}
						value={signUpEmail}

					/>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='password'

						onChangeText={(val) => setSignUpPassword(val)}
						value={signUpPassword}

					/>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='confirmation password'

						onChangeText={(val) => setSignUpConfirmPassword(val)}
						value={signUpConfirmPassword}

					/>

					{tabErrorsSignup}

					<Button
						title="Valider l'inscription"
						onPress={() => handleSubmitSignup()}
					/>



				</SafeAreaView>

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
	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f6fa",
	},
	baseText: {
		fontWeight: 'bold'
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},

});
