import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native'
import Theme from  '../common/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { inject, observer } from 'mobx-react';


const { width } = Dimensions.get('window')

@inject('loginStore')
@observer
export default class NavBar extends Component {

  render() {
    const props = this.props;
    const {loginStore} = props
    console.log("TCL: NavBar -> render -> loginStore", loginStore.defaultTheme)
     
    return (
      <View style={[styles.naviBar, props.style,{backgroundColor:loginStore.defaultTheme}]}>
        <View style={{width: 40}}>
          {
            props.leftItem ? props.leftItem : (
              props.onBack ? (
                <TouchableOpacity style={{paddingLeft: 15}} onPress={props.onBack}>
                  <Icon
                    name="md-arrow-back"
                    size={20}
                    color={props.iconColor || '#ffffff'}
                  />
                </TouchableOpacity>
              ) : <View/>
            )
          }
        </View>
        <Text style={{color: props.titleColor || '#fff'}}>{props.title}</Text>
        <View style={{width: 40}}>
          {
            props.rightItem ? props.rightItem : <View/>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  naviBar: {
    width,
    height: Platform.OS === 'ios' ? 44 : 56, //ios原生导航高度是44，android是56
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

