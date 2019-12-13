import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from  "react-native"

export default class HomePage extends React.Component {
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
           render(){
               return (
                   <View>
                      <Text>HomePage</Text>
                   </View>
               )
           }
       }

           