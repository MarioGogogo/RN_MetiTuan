import React, { Component } from "react";
import {StyleSheet, View, ScrollView, StatusBar,Text,FlatList} from "react-native";
import HomeActionBar from './HomeActionBar'
import MenuView from './MenuView'
import SpacingView from "../../common/SpacingView"
import ActiveView from './ActiveView'
import LimitTimeView from './LimitTimeView'
import GroupPurchaseCell from './GroupPurchaseCell'
import {Actions, Scene, Router} from 'react-native-router-flux'

import api from '../../config/mock'

import { width } from "../../common/screen";

export default class HomePage extends Component {
  // 默认值设置
  static defaultProps = {};
  // 初始化state
  constructor(props) {
    super(props);
    this.state = {
        actives: [],
        discounts: [],
        dataList: [],
        refreshing: false,

    };
  }

  loadMenuInfos = ()=>{
      return api.menuInfo
  }

  componentDidMount(): void {
      this.requestData()
  }

  requestData() {
    this.setState({
      refreshing: true,
    })
    this.requestActives();
    this.requestRecommend()
  }

  requestActives() {

     this.setState({
       actives:api.actives
     })
  }


  onMenuSelected = (index: number)=> {
    if(index===0){
       alert('跳转了美食',index)
      // this.props.navigator.push({
      //   component: FoodPage,
      // })
    }else {
      alert('你点击了：'+index)
    }
  }

  onGridSelected = (index: number)=> {
    if(index===0){
      alert('跳转了',index)
    }else {
      alert('你点击了：'+index)
    }
  }

  //请求推荐列表
requestRecommend =  () => {
      let dataList = api.recommend.data.map(
        (info) => {
          return {
            id: info.id,
            imageUrl: info.squareimgurl,
            title: info.mname,
            subtitle: `[${info.range}]${info.title}`,
            price: info.price
          }
        }
      )
      this.setState({
        dataList: dataList,
        refreshing: false,
      })

  }

  renderHeader =()=>{
     return (
        <View>
            <MenuView menuInfos={this.loadMenuInfos()} onMenuSelected={(index) => this.onMenuSelected(index)} />
            <SpacingView/>
            <ActiveView infos={this.state.actives} onGridSelected={(index) => this.onGridSelected(index)} />
            <SpacingView/>
            <LimitTimeView {...this.props}/>
            <SpacingView/>
            <View style={styles.recommendHeader}>
              <Text style={styles.text}>猜你喜欢</Text>
            </View>
        </View>
     )
  }

  renderCell = (info: Object) => {
    return (
      <GroupPurchaseCell
        info={info.item}
        onPress={this.onCellSelected}
      />
    )
  }

  onCellSelected = (info: Object) => {
    StatusBar.setBarStyle('default', false)
     alert('跳转任务详情')
    // this.props.navigation.navigate('GroupPurchase', { info: info })
  }


  keyExtractor = (item: Object, index: number) => {
    return item.id.toString()
  }



  render() {
    return (
        <View style={styles.container}>
          <StatusBar
            animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
            hidden={false}  //是否隐藏状态栏。
            backgroundColor={'red'} //状态栏的背景色
            translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
            barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
          />
          <HomeActionBar
            {...this.props}
            statusBar
          />
          <FlatList
            data={this.state.dataList}
            renderItem={this.renderCell}
            keyExtractor={this.keyExtractor}
            onRefresh={this.requestData}
            refreshing={this.state.refreshing}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  swiper: {
    width,
    height: 200
  },
  image: {
    width,
    height: 200,
    resizeMode: "stretch"
  },
  line: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  recommendHeader: {
    height: 35,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#fafafa",
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: 'white'
  },
});
