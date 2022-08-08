import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation, DrawerActions, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["fr"] = {
	monthNames: [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Août",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre",
	],
	monthNamesShort: [
		"Janv.",
		"Févr.",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juil.",
		"Août",
		"Sept.",
		"Oct.",
		"Nov.",
		"Déc.",
	],
	dayNames: [
		"Dimanche",
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi",
	],
	dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
	today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

import { SafeAreaView } from "react-native-safe-area-context";
import {
	StatusBar,
	View,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput,
	Image
} from "react-native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

function PlannerScreen(props) {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const [items, setItems] = useState({})
	const [recipeData, setRecipeData] = useState(props.recipe);
	const [isThisRecipeMine, setIsThisRecipeMine] = useState(false);
	const [addedRecipes, setAddedRecipes] = useState([]);
	const [likedRecipes, setLikedRecipes] = useState(props.likedRecipes);

	useEffect(() => {
		if (isFocused) {
			setRecipeData(props.recipe);
			async function initialFetch() {
				var rawResponse = await fetch(
					`http://${privateIP}:3000/recipesheet/initial-fetch-recipesheet`,
					{
						method: "post",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						body: `token=${props.token}`,
					}
				);

				var response = await rawResponse.json();

				setAddedRecipes(response.addedRecipes);
				setLikedRecipes(response.likedRecipes)
			}
			initialFetch();
		}
	}, [isFocused]);

	const timeToString = (time) => {
		const date = new Date(time);
		return date.toISOString().split('T')[0];
	  }
	

	const loadItems = (day, item) => {
	
		setTimeout(() => {
		  for (let i = 0; i < 8; i++) {
			const time = day.timestamp + i * 24 * 60 * 60 * 1000;
			const strTime = timeToString(time);	

			if (!items[strTime]) {
			  items[strTime] = [];			  
			  const numItems = 1;
			  for (let j = 0; j < numItems; j++) {
				items[strTime].push({
				  
				  height: Math.max(50, Math.floor(Math.random() * 150)),
				  day: strTime
				});
			  }
			}
		  }
		  
		  const newItems= {};
		  Object.keys(items).forEach(key => {
			newItems[key] = items[key];
		  });
		  setItems(newItems)
		}, 1000);
	  }
	  


	  const renderItem = ({ item }) =>{
		return(
			<TouchableOpacity 
				style={{borderWidth:1}}
				>
				<View>
					<Text>
					ok
					</Text>
				</View>
			</TouchableOpacity>
		)

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

	return (
		<View style={styles.container}>
			<MyStatusBar backgroundColor="#dfe4ea" barStyle="dark-content" />
			<View style={styles.appBar}>
				<TouchableOpacity
					style={{}}
					onPress={() =>
						navigation.dispatch(DrawerActions.openDrawer())
					}
				>
					<MaterialCommunityIcons
						name="menu"
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

			<View style={styles.content}>
				
{/* -----------------------------Code Dylan --------------------------- */}
				{/* <Agenda
					// The list of items that have to be displayed in agenda. If you want to render item as empty date
					// the value of date key has to be an empty array []. If there exists no value for date key it is
					// considered that the date in question is not yet loaded
					items={{}}
					// Callback that gets called when items for a certain month should be loaded (month became visible)
					loadItemsForMonth={(month) => {
						console.log("trigger items loading");
					}}
					// Callback that fires when the calendar is opened or closed
					onCalendarToggled={(calendarOpened) => {
						console.log(calendarOpened);
					}}
					// Callback that gets called on day press
					onDayPress={(day) => {
						console.log("day pressed");
					}}
					// Callback that gets called when day changes while scrolling agenda list
					onDayChange={(day) => {
						console.log("day changed");
					}}
					
					
					// Max amount of months allowed to scroll to the past. Default = 50
					pastScrollRange={50}
					// Max amount of months allowed to scroll to the future. Default = 50
					futureScrollRange={50}
					// Specify how each item should be rendered in agenda
					renderItem={(item, firstItemInDay) => {
						return <View />;
					}}
					// Specify how each date should be rendered. day can be undefined if the item is not first in that day
					renderDay={(day, item) => {
						return <View />;
					}}
					// Specify how empty date content with no items should be rendered
					renderEmptyDate={() => {
						return <View />;
					}}
				
					// Specify what should be rendered instead of ActivityIndicator
					renderEmptyData={() => {
						return <View />;
					}}
					
				
					
					// By default, agenda dates are marked if they have at least one item, but you can override this if needed
					markedDates={
						{
							/* "2012-05-16": { selected: true, marked: true },
						"2012-05-17": { marked: true },
						"2012-05-18": { disabled: true }, */
						}
					{/* } */}
					
					{/* // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
					onRefresh={() => console.log("refreshing...")}
					
					// Agenda theme
					theme={{
						agendaDayTextColor: "yellow",
						agendaDayNumColor: "green",
						agendaTodayColor: "red",
						agendaKnobColor: "blue",
					}}
					// Agenda container style
					style={{}} */}
				{/* /> */} 
				{/* <Text style={{ fontSize: 20 }}>PlannerScreen</Text>
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
				</View> */}
{/* -----------------------------Code Dylan --------------------------- */}

<Agenda
       
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2022-08-08'}
		renderItem={renderItem}
        // renderItem={this.renderItem}
        // renderEmptyDate={this.renderEmptyDate}
        // rowHasChanged={this.rowHasChanged}
        // showClosingKnob={true}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
      />
			</View>
		</View>
	);
}

function mapStateToProps(state) {
	return {
		bottomTabHeight: state.bottomTabHeight,
		recipe: state.recipe,
		token: state.token,
		likedRecipes: state.likedRecipes,
		fromWhichScreen: state.fromWhichScreen
	};
}

function mapDispatchToProps(dispatch) {
	return {
		sendBottomTabHeight: function (bottomTabHeight) {
			dispatch({
				type: "sendBottomTabHeight",
				bottomTabHeight: bottomTabHeight,
			});
		},
		sendPressedRecipeToStore: function (recipe) {
			console.log(recipe)
			dispatch({
				type: "setRecipe",
				recipe: recipe,
			});
		},
	};
}

export default connect(mapStateToProps, null)(PlannerScreen);

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
	appBar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#dfe4ea",
		height: APPBAR_HEIGHT,
		width: "100%",
	},
	content: {
		backgroundColor: "#f5f6fa",
		flex: 1,
		justifyContent: "space-between",
	},
});
