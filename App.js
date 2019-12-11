import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux'

import Register from './src/Register';
import Login from './src/Login';
import MainPage from "./src/TabBar";
import SplashView from './src/common/SplashView'


class App extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene
          key="splashview"
          hideNavBar
          component={SplashView}
        />
      <Scene
          key="mainpage"
          hideNavBar
          component={MainPage}
        />
        <Scene
          hideNavBar
          key="login"
          component={Login} title="Login"/>
        {/*<Scene key="register"    hideNavBar component={Register} title="Register"/>*/}
        {/*<Scene key="furitDetail" hideNavBar component={FuritDetail} title="FuritDetail"/>*/}
        {/*<Scene key="order"    hideNavBar component={Order} title="Order"/>*/}
        {/*<Scene key="colorTheme" hideNavBar component={ColorTheme} title="ColorTheme"/>*/}
      </Scene>
      {/* Loading和Toash全局加载 */}

    </Router>
  }
}



export default App
