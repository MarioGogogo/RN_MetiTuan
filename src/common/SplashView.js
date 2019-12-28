import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { width, height } from "./screen";
import { Actions } from "react-native-router-flux";
import {scaleHeight, scaleWidth} from "../util/ScreenUtil"

export default class SplashView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: true, //默认加载动画
      timerCount:3,
    };

  }
  componentDidMount() {
    this.countDownAction()
    // this.timer=setTimeout(() => {
    //   //清除路由堆栈并将场景推入第一个索引. 没有过渡动画。
    //   Actions.reset('mainpage')
    // }, 2000);
  }

  countDownAction =()=> {
    const codeTime = this.state.timerCount;
    this.interval = setInterval(() => {
      const timer = this.state.timerCount - 1
      if (timer === 0) {
        this.interval && clearInterval(this.interval);
        this.setState({
          timerCount: codeTime
        })
        Actions.reset('mainpage')
      } else {
          this.setState({
            timerCount: timer
          })
      }
    }, 1000)
  }
  toHome=()=>{
    if(this.interval){
      clearInterval(this.interval);
    }
    Actions.reset('mainpage')
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
          hidden={false}  //是否隐藏状态栏。
          backgroundColor={'transport'} //状态栏的背景色
          translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content')
        />
        <TouchableOpacity
          style={styles.countdown}
          onPress={this.toHome}
        >
              <Text>{this.state.timerCount}</Text>
        </TouchableOpacity>
        <Image
          style={styles.splash}
          source={require("../images/splash.png")}
          resizeMode={"cover"}
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
  },
  countdown:{
      position: 'absolute',
    top:30,
    right:10,
      zIndex:99,
      width:scaleWidth(60),
      height:scaleHeight(30),
      justifyContent: "center",
      alignItems: "center",
      borderWidth:1,
      borderColor:"#999",
      borderRadius:20,

  }
})

