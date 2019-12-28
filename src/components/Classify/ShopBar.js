import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import {scaleWidth,scaleHeight} from '../../util/ScreenUtil'
import Toast, {DURATION} from 'react-native-easy-toast'

let {width, height} = Dimensions.get('window')

export default class ShopBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scale: new Animated.Value(0)
    }
  }
  runAnimate() {
    this.state.scale.setValue(0)
    Animated.timing(this.state.scale, {
      toValue: 2,
      duration: 320,
      easing: Easing.elastic(3)
    }).start()
  }

  balance(){
    alert('结算');
  }

  render() {
    let {list, lens} = this.props

    return (
      <View style={styles.cartView}>
        <Toast ref="toast"/>

        <View style={styles.cartBar}>

          <View style={{flex: 1, justifyContent: "center", paddingLeft: scaleWidth(70)}}>
            {
              !lens.maxPrice ?
                (<Text style={{color: "#999", fontWeight: "bold"}}>{"购物车为空"}</Text>) :
                [<Text key={0} style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: scaleWidth(16)
                }}>{`￥${lens.maxPrice}`}</Text>,
                  <Text key={1} style={{color: "#fff", fontSize: scaleWidth(10)}}>{"另加7元配送费"}</Text>]
            }
          </View>
          <TouchableOpacity  onpress={() => this.balance.bind(this)}>
            {!lens.maxPrice ?
              <Text style={styles.price}>{"￥20元起"}</Text> :
              <Text style={[styles.price, {backgroundColor: "#00c257", color: "#fff"}]}>{"去结算"}</Text>}
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.iconWrap, {
          transform: [
            {
              scale: this.state.scale.interpolate({
                inputRange: [0, 1, 2], outputRange: [1, 0.8, 1]
              })
            }
          ]
        }]}>
          <View style={[styles.iconView, lens.length ? {backgroundColor: "#3190e8"} : null]}>
            <Image source={require('../../images/ic_shopping_cart.png')} style={styles.shopCart} color={lens.length ? "#fff" : "#666"}/>
          </View>
          <View style={[styles.count, {
            transform: [{translateX: lens.length ? 0 : -9999}]
          }]}>
            <Text style={{fontSize: scaleWidth(10), color: "#fff"}}>{lens.length}</Text>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cartView: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height: scaleWidth(46) + 10
  },
  count: {
    backgroundColor: "#f00",
    height: scaleWidth(12),
    borderRadius: 5,
    overflow: "hidden",
    paddingHorizontal: 4,
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0
  },
  iconWrap: {
    position: "absolute",
    left: 16,
    top: 0,
    width: scaleWidth(46),
    height: scaleWidth(46)
  },
  shopCart: {
    width: 40,
    height: 40,
  },
  iconView: {
    backgroundColor: "#333",
    overflow: "hidden",
    borderRadius: scaleWidth(23),
    width: scaleWidth(46),
    height: scaleWidth(46),
    borderWidth: 4,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center"
  },
  cartBar: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height: scaleWidth(46),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,.9)"
  },
  price: {
    color: "#999",
    fontWeight: "bold",
    fontSize: scaleWidth(16),
    paddingHorizontal: 20,
    height: scaleWidth(46),
    lineHeight: Platform.OS === 'ios' ? scaleWidth(46) : 32,
    backgroundColor: "rgba(255,255,255,.1)"
  },
  blur: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})
