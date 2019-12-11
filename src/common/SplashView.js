import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator
} from "react-native";
import { width, height } from "./screen";
import { Actions } from "react-native-router-flux";

export default class SplashView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: true //默认加载动画
    };
  }
  componentDidMount() {
    this.timer=setTimeout(() => {
      Actions.mainpage();
    }, 2000);
  }

  componentWillUnmount(){
    if(this.timer){
      clearTimeout(this.timer)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image
          style={styles.splash}
          source={require("../images/splash.png")}
          resizeMode={"cover"}
        />
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, { height: 70 }]}
          size="small"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  splash:{
    width:width,
    height:height,
  },
  centering:{
    flex:1,
    marginTop:-height,
    alignItems:"center",
    justifyContent:"center",
    padding:8
  }
})

