import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,AsyncStorage} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux'
import Spinner from 'react-native-spinkit';


export default class Profile extends Component{
  constructor(props) {
    super(props);
    this.state={
      index: 0,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 40,
      color: "#FFFFFF",
      isVisible: true
    }
  }
  componentDidMount(): void {
     console.log('Profile++++componentDidMount')
  }

  next=()=> {
    let next = this.state.index
    if (next++ >= this.state.types.length)
      this.setState({index: 0})
    else
      this.setState({index: next++})
  }

  increaseSize() {
    const size = this.state.size
    this.setState({size: size + 10});
  }

  changeColor() {
    this.setState({color: '#'+Math.floor(Math.random()*16777215).toString(16)});
  }

  changeVisibility() {
    this.setState({isVisible: !this.state.isVisible});
  }

  jumpToHome=()=>{
    Actions.pop({refresh: ({key: '刷新咯'})})
  }
  render() {
    console.log('Profile++++render')
    let type = this.state.types[this.state.index];
    return (
      <View style={styles.container}>
        <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color}/>

        <Text style={styles.text}>Type: {type}</Text>

        <TouchableOpacity style={styles.btn} onPress={this.next}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={this.increaseSize}>
          <Text style={styles.text}>Increase size</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={this.changeColor}>
          <Text style={styles.text}>Change color</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={this.changeVisibility}>
          <Text style={styles.text}>Change visibility</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6585d3',
  },

  spinner: {
    marginBottom: 50
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});
// 在使用过程中，
// 跟react-native提供的navigator的区别是你不需要拥有navigator对象。
// 你可以在任意地方使用简单的语法去控制scene的切换，
// 如：Actions.login({username, password}) or Actions.profile({profile}) or
// 甚至 Actions.profile(123)
// 所有的参数都将被注入到this.props中给Sene组件使用


// 正向跳转
// 正向跳转并传值
// 反向跳转
// 反向跳转并传值
// 指定页面跳转
// 指定页面跳转并传值
//
// 正向跳转
// 假设情景：从Home页跳转到Profile页面，Profile场景的key值为profile
//
// 不带参数 onPress={() => {Actions.proflie()}}
// 带参数onPress={() => {Actions.proflie({key: value})}}
//
// 在Profile界面接收参数：this.props.key
// 反向跳转
// 假设情景：从Profile页返回Home页面
//
// 返回上一页面，不带参数Actions.pop()
// 返回上一页面，带参数Actions.pop({refresh: ({key: value})})
// 指定回退页面数Actions.pop({popNum: 2})
// 指定回退页面数，带参数Actions.pop({popNum: 2, refresh:({key: value})})
// 返回指定页面Actions.popTo('home')
//
// 注意
//
// refresh是框架自带函数，可用于刷新属性（props）
// Actions.pop({refresh: ({key: value})}) // 用于刷新回退到的页面的属性
// Actions.refresh('params') // 用于刷新当前页面的属性对应回退页面刷新属性，即接受传递的参数
