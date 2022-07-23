import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { StatusBar } from "expo-status-bar";
import { View, ScrollView, Platform } from "react-native";
import {
	Button,
	Searchbar,
	Drawer,
	FAB,
	Title,
	Appbar,
	Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BooksDrawerScreen() {
	const [active, setActive] = useState("");

	return (
		
		<Drawer.Section>
			<Appbar.Header
				style={{
					backgroundColor: "white",
				}}
			>
				<Appbar.Action style={{ marginRight: -40 }} disabled />
				<Appbar.Action style={{ marginRight: -40 }} disabled />
				<Appbar.Content
					titleStyle={{ fontWeight: "bold" }}
					title="Mes livres de recette"
				/>

				<Appbar.Action
					icon="book-plus"
					onPress={() => console.log("press")}
				/>
			</Appbar.Header>

			<ScrollView showsVerticalScrollIndicator={false}>
				<Drawer.Item
					label="Recettes de Noël"
					active={active === "first"}
					onPress={() => setActive("first")}
				/>
				<Drawer.Item
					label="Pour petits-dej"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "third"}
					onPress={() => setActive("third")}
				/>
				<Drawer.Item
					label="Test d'un très très très long texteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
					active={active === "fourth"}
					onPress={() => setActive("fourth")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "five"}
					onPress={() => setActive("five")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "six"}
					onPress={() => setActive("six")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Le reste cest pour test le scroll"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>

				{/* Ne pas supprimer ce dernier item qui permet au Scroll de finir au bon endroit. Sinon les derniers items disparaissent derriere le Bottom Tab Navigator */}
				<Drawer.Item style={{ marginBottom: "50%" }} />
			</ScrollView>
		</Drawer.Section>
		
	);
}

//style pour le FAB
/*position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 560,
	*/

//Sinon on peut supprimer le scrollView et l'Appbar et tout englober avec un:
//<DrawerContentScrollView></DrawerContentScrollView>
//C'est à dire, remplacer le return par:
/*
return (
	<DrawerContentScrollView>
		<Drawer.Section>
			<Title style={{margin: 16, fontWeight: 'bold'}}>Mes livres de recette</Title>

				<Drawer.Item
					label="Recettes de Noël"
					active={active === "first"}
					onPress={() => setActive("first")}
				/>
				<Drawer.Item
					label="Pour petits-dej"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "third"}
					onPress={() => setActive("third")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "fourth"}
					onPress={() => setActive("fourth")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "five"}
					onPress={() => setActive("five")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "six"}
					onPress={() => setActive("six")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>
				<Drawer.Item
					label="Recettes préférées de Papa"
					active={active === "second"}
					onPress={() => setActive("second")}
				/>

				<FAB
				style={{
					backgroundColor: "white",
					margin: 16
				}}
				icon="book-plus-multiple"
				label="Créer un nouveau livre"
				onPress={() => console.log("Pressed")}
			/>
			
		</Drawer.Section>
	</DrawerContentScrollView>
			
	
	)
	*/

{
	/* <FAB
					style={{
						backgroundColor: "white",
						margin: 16,
					}}
					icon="book-plus-multiple"
					label="Créer un nouveau livre"
					onPress={() => console.log("Pressed")}
				/>
 */
}
