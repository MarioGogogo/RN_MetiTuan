import React,{Component} from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'

export  default  class Merchant extends Component{
    state={}

  render() {
    return (
       <View styles={styles.container}>
          <Text>商家组件</Text>
       </View>
    );
  }
}
const styles = StyleSheet.create({
   container:{
      flex:1,
     backgroundColor:"#fafafa"
   }
})