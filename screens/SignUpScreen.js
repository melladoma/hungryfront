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
		const data = await fetch("http://192.168.10.136:3000/users/sign-up", {
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
		return (<Text style={{color:'red',height: 40,margin: 10}} key={i}>{error}</Text>)
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

				<View>
					<Text style={styles.baseText}>
						HUNGRYBOOK
					</Text>
				</View>


				<View style={styles.content}>

					<Text style={styles.text}>nom d'utilisateur :</Text>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder="francis"

						onChangeText={(val) => setSignUpUsername(val)}
						value={signUpUsername}

					/>
					<Text style={styles.text}>Email :</Text>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='francis@gmail.com'
						keyboardType="email-address"

						onChangeText={(val) => setSignUpEmail(val)}
						value={signUpEmail}

					/>					
					<Text style={styles.text}>password :</Text>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='password'
						secureTextEntry={true}

						onChangeText={(val) => setSignUpPassword(val)}
						value={signUpPassword}

					/>					
					<Text style={styles.text}>confirmation password :</Text>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='confirmation password'
						secureTextEntry={true}

						onChangeText={(val) => setSignUpConfirmPassword(val)}
						value={signUpConfirmPassword}

					/>

					{tabErrorsSignup}

					<Button
						title="Valider l'inscription"
						onPress={() => handleSubmitSignup()}
					/>
			</View>




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
		margin:'15%',

	},
	baseText: {
		fontWeight: 'bold',
		margin:35,
		fontSize:25,

	},
	input: {
		height: 40,
		margin: 10,
		borderWidth: 1,
		padding: 10,
	},
	text:{
		marginLeft: 12,
		marginTop: 12,
	}
	
});
