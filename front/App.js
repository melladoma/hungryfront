import "react-native-gesture-handler"; //doit être tout en haut d'apres la doc RNPaper

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
//les deux lignes ci-dessus permettent de cacher les messages d'erreur sur telephone

import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//redux
/* import { Provider as StoreProvider } from "react-redux"; */
/* import pseudo from "./reducers/pseudo.reducer";
import { createStore, combineReducers } from "redux"; 
const store = createStore(combineReducers({ }));*/
// à décommenter quand on aura créé les reducers

//modules pour la navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Icones:
/* import {
	hamburger,
	book,
} from "react-native-vector-icons/MaterialCommunityIcons"; */
import { MaterialCommunityIcons } from "react-native-vector-icons";

//composants

import { Text, View } from "react-native";

//import des "screens":
import BooksScreen from "./screens/BooksScreen";
import FeedScreen from "./screens/FeedScreen";
import BooksDrawerScreen from "./screens/BooksDrawerScreen";



//au cas où besoin du stack navigator:

/* const Stack = createStackNavigator();
function StackNavigator() {
	return (
		<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Map"
						component={BottomNavigator}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
	);
} */

const Drawer = createDrawerNavigator();

function BooksAndDrawer() {
	return (
		<Drawer.Navigator
			initialRouteName="Book"
			drawerContent={(props) => <BooksDrawerScreen />}
			screenOptions={{
				drawerStyle: {
					width: "80%",
				},
			}}
		>
			<Drawer.Screen
				name="BookAndDrawer"
				component={BooksScreen}
				options={{ headerShown: false }}
			/>
		</Drawer.Navigator>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		
			<NavigationContainer>
				<Tab.Navigator
				initialRouteName='My recipes'
					screenOptions={({ route }) => ({
						tabBarActiveTintColor: "#ff7f50",
						tabBarInactiveTintColor: "#dfe4ea",
						tabBarLabelPosition: "beside-icon",
						tabBarShowLabel: false,
						tabBarStyle: [
							{
								display: "flex",
								backgroundColor: '#2f3542'
							},
							null,
						],

						tabBarHideOnKeyboard: true,
						tabBarIcon: ({ color }) => {
							let iconName;

							if (route.name === "Feed") {
								iconName = "hamburger";
							} else if (route.name === "Add") {
								iconName = "plus-circle";
							} else if (route.name === "My recipes") {
								iconName = "silverware-clean";
							}
							return (
								<MaterialCommunityIcons
									name={iconName}
									size={24}
									color={color}
								/>
							);
						},
					})}
				>
					<Tab.Screen
						name="Feed"
						component={FeedScreen}
						options={{ headerShown: false }}
					/>
					<Tab.Screen
						name="Add"
						component={FeedScreen}
						options={{ headerShown: false }}
					/>
					<Tab.Screen
						name="My recipes"
						component={BooksAndDrawer}
						options={{ headerShown: false }}
					/>
					
					
				</Tab.Navigator>
			</NavigationContainer>
		
	);
}

/* <StoreProvider store={store}></StoreProvider> */ //dans le return autour du reste pour initer redux
