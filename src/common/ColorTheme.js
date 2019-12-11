import React, {Component } from "react";
import { View, StyleSheet,Text,TouchableOpacity } from "react-native";

import { width, height } from "./screen";
import NavBar from "./NaviBar";
import {Actions, Scene, Router} from 'react-native-router-flux'
import { inject, observer } from 'mobx-react';

const ColorList = ["#AB956D","#4285f4", "#db4437", "#f4b400", "#0f9d58"];

@inject('loginStore')
@observer
export default class ColorTheme extends Component {
  _getColorTheme=(item)=>{
     console.log("TCL: ColorTheme -> _getColorTheme -> item", item)
     const {loginStore} = this.props;
     loginStore.setColorTheme(item)
  }
  render() {
    let colors = []
    colors = ColorList.map(item=>{
       return (
        <View style={styles.colorItem} key={'color-'+item}>
        <TouchableOpacity style={[styles.item,{backgroundColor:item}]} onPress={()=>this._getColorTheme(item)} >
          <Text>{item}</Text>
        </TouchableOpacity>
        </View>
       )
    })
    return (
      <View style={styles.container}>
        <NavBar title={"设置主题"} onBack={()=>{Actions.pop()} } />
        <View style={styles.colorWarpper}>
          {colors}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  colorWarpper: {
    flexDirection: "row",
    justifyContent:"flex-start",
    flexWrap:"wrap"
  },
  colorItem: {
    width: width / 4,
    height: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    width: 80,
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
