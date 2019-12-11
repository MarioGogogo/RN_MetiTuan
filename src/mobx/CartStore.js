import { observable, action, configure, computed } from "mobx";
// mobx@4.x 之后的严格模式改成这么用了~
configure({ enforceActions: "always" }); //使用严格模式，防止直接在view层修改store中的数据

class CartStore {
  @observable cartTotal = 0; //购物车总数量
  @observable foodsList = []; //购物车列表
  @observable likesList = []; //收藏列表
  @observable commentsList = []; //评论列表

  // 用Mobx的computed方法更加方便
  @computed get getCartLength() {
    return this.foodsList.length;
  }

   
  @action addFoodsList=(data)=>{
       this.foodsList.push(data)
  }

}
export default CartStore;


// foodsList的格式应该是 
// [{
//    date:'234324234234',
//    data:{
//      "name":"jasc",
//      "num":2,
//      "price":99
//    }

// },
// {
//   date:'234324234234',
//   data:{
//     "name":"jasc",
//     "num":2,
//     "price":101
//   }

// }]
