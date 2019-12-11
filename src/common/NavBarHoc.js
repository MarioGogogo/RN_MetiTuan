import React, {Component} from 'react';
import {StyleSheet,Dimensions, View,Text} from 'react-native';

export default function NavBarHoc(WrappedComponent) {
  return class ComposedComponent extends Component {
    
    render() {
      const props = {...this.props};
      console.log('高阶函数props',props);
      
      return (
        <View style={styles.container}>
           <View>
             <Text>头部导航</Text>
           </View>
           {/* 高阶组件的传入参数 */}
          <WrappedComponent  {...props} />
        </View>
      );
    }
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
