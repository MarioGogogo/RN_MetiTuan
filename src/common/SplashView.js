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
      //清除路由堆栈并将场景推入第一个索引. 没有过渡动画。
      Actions.reset('mainpage')
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
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={true}  //是否隐藏状态栏。
          backgroundColor={'red'} //状态栏的背景色
          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle={'default'} // enum('default', 'light-content', 'dark-content')
        />
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

