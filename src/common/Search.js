import React, { Component } from "react";
import { View, StyleSheet, Platform, TextInput,TouchableOpacity,Text } from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import Theme from "./theme";
import { width } from "./screen";

export default class Search extends Component {
  onClickScanner=()=>{
     alert('打开二维码扫描')
  }
  onClickMesg=()=>{
    alert('打开消息')
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.scanner} onPress={this.onClickScanner}>
          <Icon
            name="ios-qr-scanner"
            size={30} //图片大小
            color={Theme.fontColor}
          />
        </TouchableOpacity>
        <View style={styles.serach}>
          <View style={styles.searchText}>
            <Icon
              name="ios-search"
              size={18} //图片大小
              color={"#888"}
            />
            <TextInput style={styles.text} placeholder="输入水果名" editable={false} />
          </View>
        </View>
        <TouchableOpacity style={styles.scanner} onPress={this.onClickMesg}>
          <Icon
            name="ios-megaphone"
            size={30} //图片大小
            color={Theme.fontColor}
          />
          <Text>消息</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height: Platform.OS === "ios" ? 44 : 56, //ios原生导航高度是44，android是56
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.color
  },
  scanner: {
    width: 50,
    alignItems: "center"
  },
  serach: {
    flex: 1,
    height: Platform.OS === "ios" ? 44 : 56, //ios原生导航高度是44，android是56
    justifyContent: "center",
    alignItems: "center"
  },
  searchText: {
    flexDirection: "row",
    width: "90%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10
  },
  text:{
    height: Platform.OS === "ios" ? 44 : 56, //ios原生导航高度是44，android是56
  },
  empty: {
    width: 50
  }
});
