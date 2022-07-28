import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { StatusBar } from "expo-status-bar";
import {
	Drawer,
	FAB,
	View,
	ScrollView,
	Platform,
	Image,
	FlatList,
	Appbar,
	StyleSheet,
	Chip,
	Avatar,
	Button,
	Card,
	Title,
	Paragraph,
	Surface,
	Pressable,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation, DrawerActions } from "@react-navigation/native";


export default function DrawerScreen( props) {
	const navigation = useNavigation()
	const [active, setActive] = useState("");

	const MyStatusBar = ({ backgroundColor, ...props }) => (
		<View style={[styles.statusBar, { backgroundColor }]}>
			<SafeAreaView>
				<StatusBar
					translucent
					backgroundColor={backgroundColor}
					{...props}
				/>
			</SafeAreaView>
		</View>
	);

	var avatar = "premiereLettreNomDutilisateur";
	if ("il a fourni une image") {
		avatar = (
			<Image
				source={require("../assets/adaptive-icon.png")}
				style={{
					width: 60,
					height: 60,
					borderWidth: 1,
					borderRadius: 100,
				}}
			></Image>
		);
	}

	return (
		<View style={styles.container}>
			<MyStatusBar backgroundColor="#dfe4ea" />

			<View style={styles.content}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						borderWidth: 2
					}}
				>
					<View
						style={{
							marginTop: 20,
							marginLeft: 20,
							width: 60,
							height: 60,
							borderWidth: 1,
							borderRadius: 100,
						}}
					>
						{avatar}
					</View>
					<View style={{ flex:1, paddingLeft: 30, paddingTop:30, paddingBottom:30, 
						borderWidth:1 }}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-start",
							}}
						>
							<Text style={{ marginBottom: 10 }}>Francis</Text>
							<MaterialCommunityIcons
								name="pencil"
								size={15}
								color="#2f3542"
							/>
						</View>
						<View
							style={{
								width:'80%',
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								
								borderWidth:1
							}}
						>
							<Text style={{ marginBottom: 10 }}>J'habite à San FRANCISco et je suis pas FRANCIScain. J'aime la cuisine FRANCAISe !</Text>
							<MaterialCommunityIcons
								name="pencil"
								size={15}
								color="#2f3542"
							/>
						</View>
					</View>
				</View>
				<View style={{ borderWidth: 2, flex:1, justifyContent:'space-between', paddingVertical:10 }}>
					
						<View>
					<TouchableOpacity
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							paddingLeft: 20,
							marginBottom:10
						}}
						onPress={() => console.log("hello")}
					>
						<MaterialCommunityIcons
							name="cart"
							size={24}
							color="#2f3542"
						/>
						<Button
							onPress={() => navigation.navigate('ShoppingList')}
							title="Ma liste de courses"
							color="#841584"
							accessibilityLabel="Navigate to Ma liste de course"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							paddingLeft: 20,
						}}
						onPress={() => console.log("hello")}
					>
						<MaterialCommunityIcons
							name="calendar"
							size={24}
							color="#2f3542"
						/>
						<Button
							onPress={() => navigation.navigate('Planner')}
							title="Mon planning"
							color="#841584"
							accessibilityLabel="Navigate to Ma liste de course"
						/>
					</TouchableOpacity></View>
					<TouchableOpacity
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifySelf: 'flex-end',
							paddingLeft: 20,
						}}
						onPress={() => console.log("hello")}
					>
						<MaterialCommunityIcons
							name="cog-box"
							size={24}
							color="#2f3542"
						/>
						<Button
							onPress={() => navigation.navigate('Account')}
							title="Paramètres"
							color="#841584"
							accessibilityLabel="Navigate to Ma liste de course"
						/>
					</TouchableOpacity>
					</View>
					
				
			</View>
		</View>
	);
}

//Sinon on peut supprimer le scrollView et l'Appbar et tout englober avec un:
//<DrawerContentScrollView></DrawerContentScrollView>

const STATUSBAR_HEIGHT =
	Platform.OS === "android" ? StatusBar.currentHeight : 44;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		
	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
	appBar: {
		backgroundColor: "#79B45D",
		height: APPBAR_HEIGHT,
	},
	content: {
		flex: 1,
		backgroundColor: "#f5f6fa",
		
	},
});
