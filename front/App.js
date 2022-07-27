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
import HomeScreen from "./screens/HomeScreen";
import FeedScreen from "./screens/FeedScreen";
import DrawerScreen from "./screens/DrawerScreen";
import AccountScreen from "./screens/AccountScreen";
import AddScreen from "./screens/AddScreen";
import FormScreen from "./screens/FormScreen";
import PlannerScreen from "./screens/PlannerScreen";
import RecipeSheetScreen from "./screens/RecipeSheetScreen";
import SearchScreen from "./screens/SearchScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SnapScreen from "./screens/SnapScreen";
import UrlScreen from "./screens/UrlScreen";




const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function HomeTabs({ navigation }, props) {
	return (
		<Tab.Navigator
				initialRouteName='Home'
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
							} else if (route.name === "Home") {
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
						component={AddScreen}
						options={{ headerShown: false }}
					/>
					<Tab.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					
					
				</Tab.Navigator>
	);
}

function AddTabs({ navigation }, props) {
	return (
		<Tab.Navigator
				initialRouteName='Add'
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
							} else if (route.name === "Home") {
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
						component={AddScreen}
						options={{ headerShown: false }}
					/>
					<Tab.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					
					
				</Tab.Navigator>
	);
}

function FeedTabs({ navigation }, props) {
	return (
		<Tab.Navigator
				initialRouteName='Feed'
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
							} else if (route.name === "Home") {
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
						component={AddScreen}
						options={{ headerShown: false }}
					/>
					<Tab.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					
					
				</Tab.Navigator>
	);
}

//-----1----2----3------4----5


function DrawerNavigator({ navigation }, props) {
	return (
		<Drawer.Navigator
			initialRouteName="HomeDrawer"
			drawerContent={(props) => <DrawerScreen />}
			screenOptions={{
				drawerStyle: {
					width: "80%",
				}
			}}
		>
			{/* <Drawer.Screen
				name="Drawer"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="StackNavigator"
				component={StackNavigator}
				options={{ headerShown: false }}
			/> */}
			<Drawer.Screen
				name="HomeDrawer"
				component={HomeTabs}
				options={{ headerShown: false }}
			/>
			
			<Drawer.Screen
						name="ShoppingList"
						component={ShoppingListScreen}
						options={{ headerShown: false }}
					/>
					<Drawer.Screen
						name="Planner"
						component={PlannerScreen}
						options={{ headerShown: false }}
					/>
					<Drawer.Screen
						name="Account"
						component={AccountScreen}
						options={{ headerShown: false }}
					/>
			
		</Drawer.Navigator>
	);
}

function DrawerNavigator2({ navigation }, props) {
	return (
		<Drawer.Navigator
			initialRouteName="AddDrawer"
			drawerContent={(props) => <DrawerScreen />}
			screenOptions={{
				drawerStyle: {
					width: "80%",
				}
			}}
		>
			{/* <Drawer.Screen
				name="Drawer"
				component={AddScreen}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="StackNavigator"
				component={StackNavigator}
				options={{ headerShown: false }}
			/> */}
			<Drawer.Screen
				name="AddDrawer"
				component={AddTabs}
				options={{ headerShown: false }}
			/>
			
			<Drawer.Screen
						name="ShoppingList"
						component={ShoppingListScreen}
						options={{ headerShown: false }}
					/>
					<Drawer.Screen
						name="Planner"
						component={PlannerScreen}
						options={{ headerShown: false }}
					/>
					<Drawer.Screen
						name="Account"
						component={AccountScreen}
						options={{ headerShown: false }}
					/>
			
		</Drawer.Navigator>
	);
}

function DrawerNavigator3({ navigation }, props) {
	return (
		<Drawer.Navigator
			initialRouteName="FeedDrawer"
			drawerContent={(props) => <DrawerScreen />}
			screenOptions={{
				drawerStyle: {
					width: "80%",
				}
			}}
		>
			{/* <Drawer.Screen
				name="Drawer"
				component={FeedScreen}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="StackNavigator"
				component={StackNavigator}
				options={{ headerShown: false }}
			/> */}
			<Drawer.Screen
				name="FeedDrawer"
				component={FeedTabs}
				options={{ headerShown: false }}
			/>
			
			<Drawer.Screen
						name="ShoppingList"
						component={ShoppingListScreen}
						options={{ headerShown: false }}
					/>
					<Drawer.Screen
						name="Planner"
						component={PlannerScreen}
						options={{ headerShown: false }}
					/>
					<Drawer.Screen
						name="Account"
						component={AccountScreen}
						options={{ headerShown: false }}
					/>
			
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		
			<NavigationContainer>
				<Stack.Navigator
				initialRouteName="HomeDrawer2"
				>
					<Stack.Screen
						name="HomeDrawer2"
						component={DrawerNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="AddDrawer2"
						component={DrawerNavigator2}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="FeedDrawer2"
						component={DrawerNavigator3}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="SearchScreen"
						component={SearchScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="SnapScreen"
						component={SnapScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="UrlScreen"
						component={UrlScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="FormScreen"
						component={FormScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RecipeSheetScreen"
						component={RecipeSheetScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="PlannerScreen"
						component={PlannerScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ShoppingListScreen"
						component={ShoppingListScreen}
						options={{ headerShown: false }}
					/>
					
					
					{/* <Stack.Screen
						name="ShoppingList"
						component={ShoppingListScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Planner"
						component={PlannerScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Account"
						component={AccountScreen}
						options={{ headerShown: false }}
					/> */}
				</Stack.Navigator>
				
			</NavigationContainer>
		
	);
}

/* <StoreProvider store={store}></StoreProvider> */ //dans le return autour du reste pour initer redux
