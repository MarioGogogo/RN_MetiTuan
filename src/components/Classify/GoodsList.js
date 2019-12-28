/**
 * https://github.com/facebook/react-native
 * 
 */

import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native'
import {scaleWidth,scaleHeight} from '../../util/ScreenUtil'
import Button from '../../common/RNButton'

let {width, height} = Dimensions.get('window')
const MAIN_HEIGHT = height - (Platform.OS === 'ios' ? 64 : 42) - 36
const LABEL_HEIGHT = 25
const PIC_SIZE = scaleWidth(60)

export default class GoodsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0)
    }
  }


  render() {
    console.log(this.props.goods)
    return (
       <View styles={styles.container}>
          <Text>自定义组件</Text>
       </View>
    );
  }
}
const styles = StyleSheet.create({
   container:{
      flex:1,
     backgroundColor:"#fafafa"
   }
})