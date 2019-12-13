/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 个人中心
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native'
import { Text16, Text14, Paragraph } from '../../common/Text'
import MineItemCell from './MineItemCell';
import SpacingView from '../../common/SpacingView'
import SettingPage from './SettingPage'
// import WebViewPage from '../component/WebViewPage'
// import AboutPage from '../mine/AboutPage'
import api from '../../config/mock'
const { width,height } = Dimensions.get('window');
import {Actions, Scene, Router} from 'react-native-router-flux'


export default class MinePage extends Component {

  state: {
    isRefreshing: boolean
  }

  constructor(props: Object) {
    super(props)

    this.state = {
      isRefreshing: false
    }
  }

  onHeaderRefresh() {
    this.setState({isRefreshing: true})

    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 2000);
  }

  setting() {
    Actions.setting()
    // this.props.navigator.push({
    //   component: SettingPage,
    //   args: {
    //   }
    // })
  }

  about() {
    this.props.navigator.push({
      component: AboutPage,
    })
  }

  auth() {
    this.props.navigator.push({
      component: WebViewPage,
      args: {
        url: 'https://wwww.xiangzhihong.com',
        title: 'blog',
      }
    })
  }


  onSelect=(title)=>{

    switch (title) {
      case "关于美团":
        Actions.about()
        break;
      default:

    }
  }

  renderCells() {
    let cells = [];
    let dataList = this.getDataList();
    //TODO:是否可以扁平化数据 优化
    for (let i = 0; i < dataList.length; i++) {
      let sublist = dataList[i];
      for (let j = 0; j < sublist.length; j++) {
        let data = sublist[j];
        let cell = <MineItemCell image={data.image} title={data.title} subtitle={data.subtitle}
                                 key={data.title}  onPress={()=>this.onSelect(data.title)} />;
        cells.push(cell)
      }
      cells.push(<SpacingView key={i}/>)
    }

    return (
      <View style={{flex: 1}} >
        {cells}
      </View>
    )
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={this.setting.bind(this)}>
            <Image style={[styles.icon, {marginRight: 15}]}
                   source={require('../../images/icon_setting_white.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.about.bind(this)}>
            <Image style={[styles.icon, {marginRight: 10}]}
                   source={require('../../images/icon_message_white.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.userContainer} onPress={this.auth.bind(this)}>
          <Image style={styles.avatar} source={require('../../images/ic_avatar_default.png')} />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text16 style={{color: 'white'}}>code_xzh</Text16>
              <Image style={{marginLeft: 4,height:18,width:18}}
                     source={require('../../images/beauty_v1.png')}/>
            </View>
            <Paragraph style={{color: 'white', marginTop: 4}}>个人信息 ></Paragraph>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  getDataList() {
    return api.setting
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{
          position: 'absolute',
          width: width,
          height: height / 2,
          backgroundColor: '#06C1AE'
        }}/>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onHeaderRefresh()}
              tintColor='#fff'
            />
          }>
          {this.renderHeader()}
          <SpacingView />
          {this.renderCells()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingTop:Platform.OS === 'android'?20:30
  },
  header: {
    backgroundColor: '#06C1AE',
    paddingBottom: 20
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 7,
  },
  icon: {
    width: 27,
    height: 27,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51D3C6'
  }
});

