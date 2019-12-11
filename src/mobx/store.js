// root.js主要内容是配置react-navigation(导航器)
import LoginStore from "./LoginStore"
import CartStore from './CartStore'
const loginStore = new LoginStore()
const cartStore = new CartStore()

// import AuthStore from './AuthStore'
// import HomeStore from './HomeStore'

// const authStore = new AuthStore()
// const homeStore = new HomeStore()

const stores = {
  loginStore,
  cartStore
}

export default stores
