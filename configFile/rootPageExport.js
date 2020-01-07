module.exports = () => {
    return `const NavigationMain = createAppContainer(TabNavigatorStack);

            export default class App extends React.Component {
                render() {
                    return (
                        <Provider store={store}>
                            <View style={{flex:1}}>
                                <StatusBar
                                    translucent={true}
                                    backgroundColor="transparent"
                                    barStyle="dark-content"
                                />
                                <NavigationMain
                                    ref={navigatorRef => {
                                        NavigationService.setTopLevelNavigator(navigatorRef); //设置顶层路由导航
                                    }}
                                />
                            </View>
                        </Provider>
                    );
                }
            }`
}