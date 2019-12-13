import React from "react";
 import { createStackNavigator } from "react-navigation";
 import TopHeader from "../../components/Header/topHeader";
import AboutUs from "./pages/aboutUs/index";
import FeedBack from "./pages/feedBack/index";
const AboutMeStack = createStackNavigator({
AboutUs: {
               screen: AboutUs,
               navigationOptions: ({ navigation }) => ({
                   header: <TopHeader title="关于我们" navigation={navigation}/>
               })
           },
FeedBack: {
               screen: FeedBack,
               navigationOptions: ({ navigation }) => ({
                   header: <TopHeader title="反馈意见" navigation={navigation}/>
               })
           },
});

AboutMeStack.navigationOptions = ({ navigation }) => {
           return {
               tabBarVisible: navigation.state.index == 0
           };
       };export default AboutMeStack;