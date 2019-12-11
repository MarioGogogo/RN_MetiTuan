import {observable, action, configure, computed} from 'mobx';
// mobx@4.x 之后的严格模式改成这么用了~
configure({enforceActions:"always"});  //使用严格模式，防止直接在view层修改store中的数据
import Theme from '../common/theme'

class LoginStore {
  @observable defaultTheme= Theme.color;
  @observable username = "";
  @observable password = "";

  @computed get getDefalutColor() {
    return this.defaultTheme
  }
   
  @action setColorTheme=(color)=>{
      console.log("TCL: LoginStore -> @actionsetColorTheme -> color", color)
      this.defaultTheme = color;
  }

  @action setUser=(username)=>{
    this.username = username
  }
  @action setPassword=(password)=>{
    this.password = password
  }
}
export default LoginStore;
