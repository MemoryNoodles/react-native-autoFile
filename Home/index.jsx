import React from "react";
 import { createStackNavigator } from "react-navigation";
 import TopHeader from "../../components/Header/topHeader";
import HomePage from "./pages/homePage/index";
import Players from "./pages/players/index";
const HomeStack = createStackNavigator({
HomePage: {
               screen: HomePage,
               navigationOptions: ({ navigation }) => ({
                   header: <TopHeader title="主页" navigation={navigation}/>
               })
           },
Players: {
               screen: Players,
               navigationOptions: ({ navigation }) => ({
                   header: <TopHeader title="球员" navigation={navigation}/>
               })
           },
});

HomeStack.navigationOptions = ({ navigation }) => {
           return {
               tabBarVisible: navigation.state.index == 0
           };
       };export default HomeStack;