import React, { useState,useEffect } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import { color } from "react-native-reanimated";

function SignInScreen(props) {
	const navigation = useNavigation();

	const [searchInput, setSearchInput] = useState("");

	//------------mettre les champs de saisie a vide------------------
	const [signInEmail, setSignInEmail] = useState('')
  	const [signInPassword, setSignInPassword] = useState('')
	//---------------------------------------------------------------------

	//pour si l'utilisater existe lui faire un redirect sur un page (if)--------
	const [userExists, setUserExists] = useState(false)
	//--------------------------------------------------------------------------

	//pour si l'utilisateur existe pas lui afficher une page d'err (else)-------
	const [listErrorsSignin, setErrorsSignin] = useState([])
	//--------------------------------------------------------------------------

	var handleSubmitSignin = async () => {
 
		const data = await fetch('http://192.168.10.135:3000/users/sign-in', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		  body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
		})
	
		const body = await data.json()

		console.log(body);

		if(body.result == true){
		  props.addToken(body.token)
		  setUserExists(true)
		  
		}  else {
		  setErrorsSignin(body.error)
		}
	  }

	  useEffect(() => {
		if (userExists) {
			console.log("le user existe (sign-in)");
			navigation.navigate("HomeDrawer2");
		}
	}, [userExists]);
	
	  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
		return(<Text style={{color:'red'}} key={i}>{error}</Text>)
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
					<Button
					title="S'inscrire"
					onPress={() => navigation.navigate("SignUp")}
				/>
				</View>
				<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

				<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='Email'

						onChangeText={(val) => setSignInEmail(val)}
						value={signInEmail}

					/>
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='password'

						onChangeText={(val) => setSignInPassword(val)}
						value={signInPassword}

					/>

					{tabErrorsSignin}

					<Button
						title="connexion"
						onPress={() => handleSubmitSignin()}
					/>
				</SafeAreaView>
			</View>

			
		</View>
	);
}

/* function mapStateToProps(state) {
	return { listPOIFromState: state.listPOI };
}*/

function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		}
	}
}

export default connect(null, mapDispatchToProps)(SignInScreen); 

//export default SignInScreen;

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
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	}
	
});
