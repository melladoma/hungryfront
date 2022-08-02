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
	ImageBackground,
	KeyboardAvoidingView
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
 
		const data = await fetch('http://192.168.10.128:3000/users/sign-in', {
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
		return(<Text style={{color:'red',height: 40,margin: 10}} key={i}>{error}</Text>)
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
	const AppButton = ({ onPress, title }) => (
		<TouchableOpacity onPress={() => handleSubmitSignin()} style={styles.appButtonContainer}>
		  <Text style={styles.appButtonText}>
			{title}
		  </Text>
		</TouchableOpacity>
	  );
	  const SignUp = ({ onPress, title }) => (
		<TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.appButtonContainer1}>
		  <Text style={styles.appButtonText1}>
			{title}
		  </Text>
		</TouchableOpacity>
	  );

	return (
		
		<ImageBackground source={require('../assets/eggs.jpg')}  style={styles.container} >
		{/* <KeyboardAvoidingView */}
			
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" />
			
			<View style={{flex : 1}}>
			
				<View style={{marginTop:100,}}>
				<Text style={styles.baseText}>
						THE
					</Text>
					
					<Text style={styles.baseText}>
						HUNGRYBOOK
					</Text>
					{/* <Button
					color='#F19066'
					title="S'inscrire"
					type="solid"
					onPress={() => navigation.navigate("SignUp")}
				/> */}
				</View>


				<View style={styles.content}>


				
				<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='Adresse E-mail'
						keyboardType="email-address"
						overflow="hidden"
                        keyboardAppearance="dark"

						onChangeText={(val) => setSignInEmail(val)}
						value={signInEmail}

					/>					
					
					<TextInput
						style={styles.input}
						inputStyle={{ marginLeft: 10 }}
						placeholder='Mot de passe'
						secureTextEntry={true}
						
						onChangeText={(val) => setSignInPassword(val)}
						value={signInPassword}

					/>

					{tabErrorsSignin}
					
					<View style={styles.screenContainer}>
      					<AppButton title="Me connecter" size="sm"/>	
    				</View>
					<View style={{marginTop:90}}>
				<Text style={styles.goSignup}>Vous n'avez pas encore de compte ?</Text>
					</View>
					<View style={styles.screenContainer}>
      					<SignUp title="Créer mon compte" size="sm"/>	
    				</View>
					
					</View>
					
			</View>

			{/* </KeyboardAvoidingView> */}
		</ImageBackground>
		
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
		margin:'15%',

	},
	input: {
		height: 55,
		margin: 10,
		borderWidth: 0.75,
		padding: 10,
		borderRadius:15,
		backgroundColor:"#dfe4ea",
		
	},
	baseText:{
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize:55,
		color:"#e67e22",
		borderColor:"#fff",
		textDecoration:"underline"
	},
	text:{
		marginLeft: 12,
		marginTop: 12,
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
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center",
		marginTop:10,

	  },
	  appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
	  },
	  goSignup: {
		fontSize:18,
		color:"#fff",
		textAlign:"center",		
	  },
	  appButtonContainer1: {
		elevation: 8,
		backgroundColor: "#2F3542",
		borderRadius: 25,
		paddingVertical: 10,
		paddingHorizontal: 12,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center",
	

	  },
	  appButtonText1: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
	  },

	
	
});
