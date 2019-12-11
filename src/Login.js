import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {getAxios,postAxios} from '../src/util/request'

import { inject, observer } from 'mobx-react';

@inject('loginStore')
@observer
export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state={
      username:"",
      password:""
    }
  }
  jumpToHome=()=>{
    const {user,todos,loginStore} = this.props
    loginStore.setUser(this.state.username)
    loginStore.setPassword(this.state.password)
    // Actions.mainpage()
    this._asyncLogin();
  }

  _asyncLogin= async () =>{
     const params = {
        name:'jack',
        password:'123',
     }
   const result = await postAxios('https://easy-mock.com/mock/5d09c91f44339368a2ce4c22/myapi/name',params);
    console.log(result)
     if(result.success){
     Actions.mainpage()
   }else{
       console.log('错误了')
     }
  }

   componentWillUnmount() {
    console.log('组件卸载了')
   }


  render() {
    const {key} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.shopTitle}>一家水果店</Text>
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>用户名:</Text>
          <TextInput
            style={styles.textInputItem}
            placeholder={"请输入账号"}
            numberOfLines={1}
            maxLength={10}
            onChangeText={text=>{
              this.setState({
                username:text
              })
            }}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formTitle}>密码:</Text>
          <TextInput
            style={styles.textInputItem}
            placeholder={"请输入密码"}
            numberOfLines={1}
            maxLength={6}
            onChangeText={text=>{
              this.setState({
                password:text
              })
            }}
          />
        </View>
        <Icon.Button  //在图片后加, 自定义样式的文字
          name="facebook"
          backgroundColor="#6585d3"
          width={200}
        >
          <Text style={{fontFamily: 'Arial', fontSize: 15,color:"#fff",textAlign:"center"}} onPress={this.jumpToHome}>登录</Text>
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shopTitle:{
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
},
  welcome: {
    fontSize: 20,
    padding:10,
    color:"#fff",
    backgroundColor:"#6792ff",
    textAlign: 'center',
    marginTop: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  formItem:{
    width:"60%",
    flexDirection:"row",
    height:40,
    borderColor:"#ccc",
    borderWidth:1,
    alignItems: 'center',
    backgroundColor: "#fff"
},
  formTitle:{
    paddingLeft:6,
    width:"25%",
    textAlign: 'center',
    fontSize: 14

  },
  textInputItem:{
    flex:1,
    fontSize: 14,
    textAlign: 'center',
    height:40,
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
