//#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");

let originSource = require("./configFile/originSource");
let rootPageSource = require("./configFile/rootPageSource");
let rootPageExport = require("./configFile/rootPageExport");
//  let rootNavIcon = require("./configFile/rootNavIcon");cls

//menu的文件夹数据格式不能变
const menu = JSON.parse(fs.readFileSync(`./menu.js`, "utf8"));

let rootCatalog = path.resolve();

let rootStr = "",
    navConfig = {};

/* 
  root.js 生成根目录文件夹
*/
generateRootFile();
function generateRootFile() {
    //-------------------------------------root 导入文件夹--------------------------------------
    //每个文件都要导入的基础组件
    rootStr += originSource();
    //root固有文件
    rootStr += `import { createAppContainer, createBottomTabNavigator } from "react-navigation"\n`;
    rootStr += `import NavigationService from "../common/utils/navigationService"; \n import pTd from "../common/utils/unit"\n\n`;

    //拼接导入到root的nav组件
    for (var i = 0, l = menu.length; i < l; i++) {
        rootStr += `import ${menu[i].name}Screen from "./${menu[i].name}/index"\n`;
    }

    //redux
    rootStr += "//redux\n"
    rootStr += `import { Provider, connect } from "react-redux"; \n
    import { createStore } from "redux"; \n
    import reducer from "../reducers/todos";\n\n
    let store = createStore(reducer)\n\n`

    //-------------------------------------- 组件代码 ---------------------------------------
    //nav 组成的一部分
    rootStr += rootPageSource();

    //nav配置
    rootStr += `const TabNavigatorStack = createBottomTabNavigator({\n`;

    for (var i = 0, l = menu.length; i < l; i++) {
        rootStr += `
    ${menu[i].name}Screen: {
        screen: ${menu[i].name}Screen,
        navigationOptions: {
            tabBarLabel: "${menu[i].label}",
            tabBarIcon: ({ tintColor, focused }) => (
                <HomeIconWithBadge
                    src={
                        focused
                            ? require("../assets/images/navigateMenuIco/home-select.png")
                            : require("../assets/images/navigateMenuIco/home-normal.png")
                    }  
                />
            )
        }
    },\n`;
    }
    rootStr += "},\n";

    rootStr += ` {
    initialRouteName: "${menu[0].name}Screen",
    tabBarOptions: {
        activeTintColor: "gray",
        inactiveTintColor: "gray",
        style: {
            borderTopColor: "#ececec",
            borderWidth: pTd(1)
        }
    }
}\n`;

    rootStr += ");\n";

    rootStr += rootPageExport();
    fs.writeFileSync("root.js", rootStr);
}

/* 
  菜单文件夹和文件生成
*/
generateMenuFile()
function generateMenuFile() {
    for (var j = 0, l = menu.length; j < l; j++) {
        //回到根目录
        process.chdir(rootCatalog)
        //新建并判断
        if (fs.ensureDirSync(menu[j].name)) {
            //切换目录
            changeCatalog(menu[j].name);
            var menuCatalog = path.resolve();
            //一级目录下的jsx文件
            generateLevel1File(menu[j].pages, menu[j].name);
            // 新建二级文件    
            for (var i = 0, len = menu[j].pages.length; i < len; i++) {

                if (fs.ensureDirSync(menu[j].pages[i].name)) {
                    changeCatalog(menu[j].pages[i].name)
                    generateLevel2File(menu[j].pages[i])

                    changeCatalog(menuCatalog);

                }
            }

        }
    }

    /*
     *更改目录
     **/
    function changeCatalog(root) {
        var nowRoot = path.resolve(root);
        process.chdir(nowRoot);
    }

    /*
     *一级目录下的jsx文件
     **/
    function generateLevel1File(pages, ScreenName) {
        var str = "";
        //导入文件
        fs.appendFileSync(
            `index.js`,
            `import React from "react";\n import { createStackNavigator } from "react-navigation";\n\n`
        );
        for (var i = 0; i < pages.length; i++) {
            str += `import ${firstUpperCase(pages[i].name)} from "./${pages[i].name}/index";\n`;
        }
        //页面配置
        str += `const ${ScreenName}Stack = createStackNavigator({\n`;
        for (var i = 0; i < pages.length; i++) {
            str += `${firstUpperCase(pages[i].name)}: {
               screen: ${firstUpperCase(pages[i].name)},
               navigationOptions: ({ navigation }) => ({
                   header: null
               })
           },\n`;
        }
        str += `});\n\n`;

        str += `${ScreenName}Stack.navigationOptions = ({ navigation }) => {
           return {
               tabBarVisible: navigation.state.index == 0
           };
       };\n\n`;
        str += `export default ${ScreenName}Stack;`;

        fs.appendFileSync(`index.js`, str);
    }


    /* 
      二级目录下的js文件
    */
    function generateLevel2File(page) {

        var str = "";
        //引用文件
        fs.appendFileSync(`index.js`, originSource());
        str += `import navigationService from "../../../common/utils/navigationService";\n`
        str += `import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";\n`
        page.isHome && (str += `import BackHandlerHoc from "../../../common/Hoc/BackHandlerHoc/backHandlerHoc";\n\n`)
        str += `import apiFun from "../../../ajax/apiFun";\n`
        //注释
        str += `
        /* 
         * ${page.label}
         **/
        \n`
       
        str += `class ${firstUpperCase(page.name)} extends React.Component {
           constructor(props){
               super(props)
           }
           componentDidMount(){
               this.requestOrder()
           }
           requestOrder() {
              Promise.resolve().then(res=>{
                  return this.getFirstRequest();
              })
           }
           async getFirstRequest() {
                let params = this.props.navigation.getParam("params");
                
                await apiFun.getZX(params).then(res => {
                    return "";
                });
           }
            goRouter(router, params){
                navigationService.navigate(router, {
                    params
                })
            }
           render(){
               return (
                   <View style={Gstyle.container}>
                      <CommonHeader title="${page.label}" />
                      <Text>${firstUpperCase(page.name)}</Text>
                   </View>
               )
           }
       }\n
      `
        str += page.isHome ? `export default BackHandlerHoc(${firstUpperCase(page.name)})\n\n` : `export default ${firstUpperCase(page.name)}\n\n`

        str += `const styles = StyleSheet.create({})`
        fs.appendFileSync(`index.js`, str);

    }

    /*
      首字母大写
    */
    function firstUpperCase(str) {
        let arr = str.split("");
        return arr.splice(0, 1)[0].toUpperCase() + arr.join("");
    }
    /*
      首字母小写
    */
    function firstLowerCase(str) {
        let arr = str.split("");
        return arr.splice(0, 1)[0].toLowerCase() + arr.join("")
    }
}
