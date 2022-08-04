import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';

import { SafeAreaView } from "react-native-safe-area-context";
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

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { privateIP } from "../env.js";

function UrlScreen(props) {
	const navigation = useNavigation();

	const [webView, setWebView] = useState(false);
	const onNavigationStateChange = (webViewState) => {
		console.log(webViewState.url);
	  };

	const [searchInput, setSearchInput] = useState("")

	const handleUrlSubmit = (searchInput) => {
		async function UrlSearch() {
			var rawResponse = await fetch(
				`http://${privateIP}:3000/api/url-scrapper`,
				{
					method: "post",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `url=${searchInput}`,
				}
			);

			var response = await rawResponse.json();

			props.recipe(response.recipe);
			
			if (response.status) {
				navigation.navigate("FormScreen")
			}
	
		}
		UrlSearch();
		navigation.navigate("FormScreen")
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
	//----------------------------- ------------------------------------Fin de StatusBar
		if (webView) {
			return (<View style={styles.container}><MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" /><WebView 
				style={styles.container}
				source={{ uri: 'https://google.com' }}
				onNavigationStateChange={onNavigationStateChange}
				javaScriptEnabled
				domStorageEnabled
				startInLoadingState={false}
			  /><View style={styles.bottomTab}>
			  <View
				  style={{
					  height: props.bottomTabHeight,
					  backgroundColor: "#f5f6fa",
					  display: "flex",
					  flexDirection:"row",
					  justifyContent: "space-between",
					  alignItems:"center",
					  marginBottom: 20
				  }}
			  >
				  <TouchableOpacity
					  style={{}}
					  onPress={() => setWebView(false)}
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
				  <TouchableOpacity
					  style={{display:"flex", flexDirection:"row", alignItems:"center", borderWidth:1, borderRadius: 100,paddingLeft:5, marginRight:20}}
					  onPress={() => handleConversion()}
				  >
					<Text>Convertir cette page en recette</Text>
					  <MaterialCommunityIcons
						  name="check"
						  size={28}
						  color="#2f3542"
						  style={{
							  
							  
							  paddingTop: 10,
							  paddingBottom: 10,
							  zIndex: 1,
						  }}
					  />
				  </TouchableOpacity>
			  </View>
		  </View></View>)
		}else {
	return (
		<View style={styles.container}>
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" />
<View style={{flex:1}}>
				<View style={styles.content}>
				<Text style={{ fontSize: 20 }}>UrlScreen</Text>
				<Button
					title="Cliquer ici pour ouvrir le navigateur"
					onPress={() => {setWebView(true)}}
				/>
				<TextInput
						style={styles.searchInput}
						onChangeText={(value) => setSearchInput(value)}
						value={searchInput}
						placeholder="Ecris ici ton url si t'es cap"
						underlineColorAndroid="transparent"
					/>
				<Button
					title="Ajout"
					onPress={() => {handleUrlSubmit(searchInput)}}
				/>
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
	);}
}

function mapStateToProps(state) {
	return { bottomTabHeight: state.bottomTabHeight, recipe: state.recipe };
}

/*function mapDispatchToProps(dispatch) {
	return {
		onSubmitBottomTabHeight: function (bottomTabHeight) {
			dispatch({ type: "initializeBottomTabHeight", bottomTabHeight: bottomTabHeight });
		},
	};
}*/

export default connect(mapStateToProps, null)(UrlScreen);

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44;
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
	},
});
