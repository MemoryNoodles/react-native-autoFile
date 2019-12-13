import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from  "react-native"

import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import NavigationService from "./navigationService";
import HomeScreen from "./Home/index"
import AboutMeScreen from "./AboutMe/index"
import pTd from "../tools/tool"

/* 主界面 */
            class IconWithBadge extends React.Component {
                render() {
                    const { name, badgeCount, color, size, src } = this.props;
                    return (
                        <View key={name} style={{ margin: 5 }}>
                            <Image
                                style={{ width: pTd(45), height: pTd(45) }}
                                source={src}
                            />
                        </View>
                    );
                }
            }
            
            const HomeIconWithBadge = props => {
                return <IconWithBadge {...props} badgeCount={props.badgeCount} />;
            };

const TabNavigatorStack = createBottomTabNavigator({

    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 首页,
            tabBarIcon: ({ tintColor, focused }) => (
                <HomeIconWithBadge
                    src={
                        focused
                            ? require("./assets/img/barIcon/home-select.png")
                            : require("./assets/img/barIcon/home-normal.png")
                    }  
                />
            )
        }
    },

    AboutMeScreen: {
        screen: AboutMeScreen,
        navigationOptions: {
            tabBarLabel: 我的,
            tabBarIcon: ({ tintColor, focused }) => (
                <HomeIconWithBadge
                    src={
                        focused
                            ? require("./assets/img/barIcon/home-select.png")
                            : require("./assets/img/barIcon/home-normal.png")
                    }  
                />
            )
        }
    },
},
 {
    initialRouteName: "HomeScreen}",
    tabBarOptions: {
        activeTintColor: "gray",
        inactiveTintColor: "gray",
        style: {
            borderTopColor: "#ececec",
            borderWidth: pTd(1)
        }
    }
}
);
const NavigationMain = createAppContainer(TabNavigatorStack);

            export default class App extends React.Component {
                render() {
                    return (
                        <View style={{flex:1}}>
                            <View style={{paddingTop:pTd(40)}}>
                                <StatusBar
                                    backgroundColor="transparent"
                                    barStyle="dark-content"
                                />
                            </View>
                            <NavigationMain
                                ref={navigatorRef => {
                                    NavigationService.setTopLevelNavigator(navigatorRef); //设置顶层路由导航
                                }}
                            />
                        </View>
                    );
                }
            }