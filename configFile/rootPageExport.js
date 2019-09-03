module.exports = ()=>{
    return `const NavigationMain = createAppContainer(TabNavigatorStack);

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
            }`
    }