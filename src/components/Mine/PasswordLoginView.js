/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 账号登录界面
 */

import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const {width, height} = Dimensions.get('window')

export default class PasswordLoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {name: '',pass:''};
  }

  submit(){
    alert("您输入的用户名为："+this.state.name);
  }


  render() {
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          style={{backgroundColor:'#000'}}
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'#fff'}}
        />

        <View style={styles.styleContainer}>
          <FontAwesome
            name={'id-badge'}
            style={styles.icon}
            size={20}
            color={"#06C1AE"}
          />
          <TextInput
            style={styles.styleUserName}
            placeholder='请输入用户名'
            underlineColorAndroid={'transparent'}
            numberOfLines={1}
            keyboardType={'numeric'}
            autoFocus={true}
            onChangeText={(name) => this.setState({name})}/>
        </View>
        <View style={styles.styleLine}/>


        <View style={styles.stylePassContainer}>
          <FontAwesome
            name={'keyboard-o'}
            style={styles.icon}
            size={20}
            color={"#06C1AE"}
          />
          <TextInput
            style={styles.stylePassWord}
            placeholder='请输入密码'
            numberOfLines={1}
            underlineColorAndroid={'transparent'}
            secureTextEntry={true}
            onChangeText={(pass) => this.setState({pass})}
          />
        </View>

        <Text style={styles.styleText} onPress={()=>{
          this.refs.toast.show('你点击了忘记密码!',3000);
        }}>
          忘记密码？
        </Text>

        <TouchableOpacity onPress={()=>this.submit()}>
          <View style={styles.styleSubmit}>
            <Text style={styles.submit}>
              登录
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  styleContainer: {
    backgroundColor: '#ffffff',
    height: 40,
    marginTop:10,
    width: width,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  stylePassContainer: {
    flexDirection:"row",
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    height: 40,
    width: width,
    paddingLeft: 20,

  },
  icon: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  styleUserName: {
    backgroundColor: '#ffffff',
    height: 40,
    width: width*0.8,
    textAlign: 'left',
    paddingLeft:10,
  },
  styleLine: {
    backgroundColor: '#f4f4f4',
    height: 1,
    width: width,
  },
  stylePassWord: {
    backgroundColor: '#ffffff',
    height: 40,
    width: width*0.8,
    textAlign: 'left',
    paddingLeft:10
  },
  styleText: {
    fontSize: 16,
    marginTop: 10,
    color: '#06C1AE',
    textAlign: 'right',
  },
  styleSubmit: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#06C1AE',
    height: 38,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    color: '#ffffff',
    fontSize:18
  },
});

