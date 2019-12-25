/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 限时抢购
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux'
import {scaleWidth,scaleHeight} from '../../util/ScreenUtil'
import LocalImg from '../../config/images'
import CountDownView from '../../common/CountDownView'


const isIOS = Platform.OS === "ios";

export default class LimitTimeView extends Component {

  more() {
    alert('跳转更多')
  }

  detail() {
    Actions.detail()
  }

  render() {
    return (
      <View style={styles.flexStyle}>
        <View style={styles.container}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontSize: scaleWidth(14), fontWeight: "bold"}}>限时抢购</Text>
            <Text style={{fontSize: scaleWidth(11), color: "#aaa", marginLeft: 10}}>距离结束</Text>
            <CountDownView
              date="2019-12-22T24:00:00+00:00"
            />
          </View>
          <TouchableOpacity onPress={this.more.bind(this)}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{fontSize: scaleWidth(12), color: "#aaa", marginRight: 3}}>更多</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          style={styles.lTimeScrollView}>
          <View style={{flexDirection: "row", alignItems: "center", paddingTop: 15}}>
            {
              ["全素冒菜套餐", "荤素套餐", "培根餐", "酸汤水饺","必胜客宅急送"].map((item, i) => {
                let layout = (
                  <View style={styles.lTimeList}>
                    <Image source={LocalImg["sale"+i]} style={{height: scaleWidth(85), width: scaleWidth(85), resizeMode: 'cover'}}/>
                    <Text style={{fontSize: scaleWidth(13), color: "#333", marginVertical: 5}}>{item}</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Text style={{fontSize: scaleWidth(14), fontWeight:"bold", color: "#ff6000", marginRight: 2}}>{"￥99"}</Text>
                      <Text style={{fontSize: scaleWidth(12), color: "#aaa", textDecorationLine: "line-through"}}>{"￥29"}</Text>
                    </View>
                  </View>
                )
                return isIOS?(
                  <TouchableHighlight key={i} style={{borderRadius: 4,marginRight: 10}} onPress={this.detail.bind(this)}>{layout}</TouchableHighlight>
                ):(
                  <View key={i} style={{marginRight: 10}}><TouchableNativeFeedback onPress={()=>{}}>{layout}</TouchableNativeFeedback></View>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexStyle: {
    padding:10
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: "#333",
    fontSize: scaleWidth(11),
    color: "#fff",
    padding:scaleWidth(2),
    marginHorizontal: 3
  },
  lTimeScrollView: {
  },
  lTimeList: {
    backgroundColor:"#fff",
    alignItems: "center"
  }

});

