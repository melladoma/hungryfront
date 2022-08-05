import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Text,
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

function SnapScreen(props) {
	const navigation = useNavigation();

	//----------------------------- ------------------------------------Début StatusBar
	// const MyStatusBar = ({ backgroundColor, ...props }) => (
	// 	<View style={[styles.statusBar, { backgroundColor }]}>
	// 		<SafeAreaView>
	// 			<StatusBar
	// 				translucent
	// 				backgroundColor={backgroundColor}
	// 				barStyle="dark-content"
	// 				{...props}
	// 			/>
	// 		</SafeAreaView>
	// 	</View>
	// );
	//----------------------------- ------------------------------------Fin de StatusBar

	//------------------------------------------------------------- Camera expo ------------------------------------------------------------------
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const [hasPermission, setHasPermission] = useState(null);
	const [image, setImage] = useState(null);
	//const [visible, setVisible] = useState(false);
	var camera = useRef(null);
    const isFocused = useIsFocused();


// -------------------------------------------------------------------Gallerie photo --------------------------------------------------------
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		  setImage(result.uri);
		}
	  };
	
// -----------------------------------------------------------Demande permission appareil photo ---------------------------------------------------
	useEffect(() => {  
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	  }, []);
	  
	  var cameraDisplay;
	  if(hasPermission && isFocused){
		cameraDisplay = <Camera 
		  style={{ flex: 1 }}
		  flashMode={flash}
		  ref={ref => (camera = ref)}
		>
		   <View    
			style={{
			  flex: 1,
			  backgroundColor: 'transparent',
			  flexDirection: 'row',
			}}>
			   <TouchableOpacity
				style={{
				
					alignSelf: 'flex-end',
					alignItems: 'center',
				}}
				onPress={() => {
					setFlash(
					  flash === Camera.Constants.FlashMode.off
						? Camera.Constants.FlashMode.torch
						: Camera.Constants.FlashMode.off
					);
				  }}
				>
				<IconFontAwesome
				name="flash"
				size={20}
				color="#ffffff"
				/><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
			   </TouchableOpacity>
	
			</View>
		</Camera>
	  } else {
		cameraDisplay = <View style={{ flex: 1 }}></View>
	  }
	  //---------------------------------------------------------------------Fin composant camera ----------------------------------------------------
	

	return (
		<View style={styles.container}>
			{/* <MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" /> */}

			<View style={{ flex: 1 }}>
			{cameraDisplay} 

	{/* ------------------------------------------------Boutons de camera et gallerie --------------------------------------------------- */}
				<View style={styles.bottomTab}>
					<View
						style={{
							height: 150,
							flexDirection: "row",
							backgroundColor: "#2F3542",
							display: "flex",
							justifyContent: "space-around",
							padding: 20,
						}}
					>
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() => navigation.goBack()}
						>
							<MaterialCommunityIcons
								name="arrow-left"
								size={28}
								color="white"
								style={{
									paddingLeft: 20,
									paddingRight: 20,
									paddingTop: 10,
									paddingBottom: 10,
									zIndex: 1,
								}}
							/>
						</TouchableOpacity>

{/* ---------------------------------------------------------Enregistrement photo + redirection sur FormScreen------------------------------------------ */}
						<TouchableOpacity
							style={{}}
							onPress={async () => {
								
								if (camera) {
									console.log("salut");
									var photo = await camera.takePictureAsync({quality : 0.7, base64: true, exif: true});
									console.log("photo",photo.uri);
									var data = new FormData();
									
									data.append('recette', {
									  uri: photo.uri,
									  type: 'image/jpeg',
									  name: 'recette.jpg',
									});     
									console.log(data,"data es tu la");            
									var rawResponse = await fetch("http://192.168.10.115:3000/api/tesseract", {
									  method: 'POST',
									  body: data
									});
									var response = await rawResponse.json();
									console.log(response,"repond nous")
									navigation.navigate("FormScreen")
								}
							}
							}
						>

							<View
								style={{
									display: "flex",
									width: 80,
									height: 80,
									borderWidth: 2,
									borderRadius: 100,
									backgroundColor: "white",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<MaterialCommunityIcons
									name="camera"
									size={28}
									color="#2F3542"
									style={{
										zIndex: 1,
									}}
								/>
							</View>
						</TouchableOpacity>
{/* ------------------------------------------------REDIRECTION SUR LA GALLERIE PHOTO ---------------------------------------------- */}
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() => navigation.navigate("FormScreen")}
						>
							<MaterialCommunityIcons
								name="image"
								size={28}
								color="white"
								onPress={pickImage}
								style={{
									paddingLeft: 20,
									paddingRight: 20,
									paddingTop: 10,
									paddingBottom: 10,
									zIndex: 1,
								}}
							/>
							{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
						</TouchableOpacity>
					</View>
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

export default connect(mapStateToProps, null)(SnapScreen);

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
