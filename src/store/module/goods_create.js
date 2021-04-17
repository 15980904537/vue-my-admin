import util from '../../common/util'

export default {
    state: {
       sku_type: 0,
       form: {
        title: "",
        catagory: [],
        desc: "",
        unit: "",
        stock: 0,
        min_stock: 0,
        display_stock: false,
        status: 0,
        express: "",
        oprice: 0,//市场价格
        pprice: 0,//销售价格
        cprice: 0,//成本价格
        weight: 0,//重量
         volumn: 0,//体积
         sku_card: [{
           name: '黄色',
           type: 0,
           list: [{
             id:1,
             name: '黄色',
             color: '',
             image: '',
             isCheck:false
           }]
         }, {
             name: '红色',
             type: 1,
             list: [{
               id:2,
               name: '红色',
               color: '',
               image: '',
               isCheck: false
             }]
           }]  
    }, 
    //选择图片
    chooseList:[],
       //表头
    ths: [{
      name: '商品规格',
      rowspan: 1,
      colspan: 1,
      width:""
    }, {
        name: 'sku图片',
        rowspan: 2,
        width: "60"
      }, {
        name: '销售价',
        rowspan: 2,
        width: "100"
      }, {
        name: '市场价',
        rowspan: 2,
        width: "100"
      }, {
        name: '成本价',
        rowspan: 2,
        width: "100"
      }, {
        name: '库存',
        rowspan: 2,
        width: "100"
      }, {
        name: '体积',
        rowspan: 2,
        width: "100"
      }, {
        name: '重量',
        rowspan: 2,
        width: "100"
      }, {
        name: '编码',
        rowspan: 2,
        width: "100"
      },],
      //商品类型
    goods_type_id: 'hahah' ,
    goods_attr: {
      value1: 'hahah',
      single: true,
      all:false
    }
    },
  getters: {
    //判断有无规格
    skuLables(state) {
      return state.form.sku_card.filter(v => {
        return v.list.length>0
      })
    },
      
    //获取表头
    getths(state,getters) {
      let item = getters.skuLables.length;
      state.ths[0].rowspan=item>0?1:2
      state.ths[0].colspan = item
      return state.ths
    },
    //获取规格表格数据
    tableData(state) {
      if (!state.form.sku_card.length) return []
      let sku_list = [];
      for (let i = 0; i < state.form.sku_card.length; i++){
        if (state.form.sku_card[i].list.length > 0) {
          sku_list.push(state.form.sku_card[i].list)
        }
      }
      console.log(sku_list)
      if (sku_list.length === 0) {
        return []
      }
      let arr = util.cartesianProductOf(...sku_list);
      console.log(arr)
      arr=arr.map(v => {
        let obj= {
          skus: [],
          image: '',
          pprice: 0,
          oprice: 0,
          cprice: 0,
          stock: 0,
          volume: 0,
          weight: 0,
          code:''
        }
        obj.skus = v;
        return obj
      })
      return arr
    }

    },
    mutations: {
      //  更改状态
      getGoodsStatus(state,{key,value}) {
           state[key]=value
      },
      //添加规格
      addSkuCard(state) {
        state.form.sku_card.push({
          name: '商品名称',
          type: 0,
          list:[]
        })
      },

      //删除规格
      delSkuCard(state, index) {
          state.form.sku_card.splice(index,1)
        
      },

      //修改卡片
      VModelSkuCard(state, { key, index, value }) {
        state.form.sku_card[index][key]=value
        
      },
      //升序
      moveUp(state,index) {
        util.moveUp(state.form.sku_card,index)
      },
      //降序
      moveDown(state, index) {
        util.moveDown(state.form.sku_card, index)
      },
      //增加规格值
      addSkuValue(state, index) {
        state.form.sku_card[index].list.push({
          name: '规格名称',
          color: '',
          image: '',
          id: Math.random(0, 1),
          isCheck:false
        })   
      },
      //删除规格值
      delSkuValue(state, index, listIndex) {
       
        state.form.sku_card[index].list.splice(listIndex, 1)
        
      },
      //修改规格值
      updateSkuValue(state, { cardIndex, valueIndex, key, value }) {
        // console.log(state.sku_card[cardIndex].list[valueIndex])
        state.form.sku_card[cardIndex].list[valueIndex][key]=value
      },
      //排序规格卡片的规格属性列表
      sortSkuValue(state,{index,value}) {
        state.form.sku_card[index].list= value
      },

      //修改商品属性
      VModelGoodAttrs(state, { key, value }) {
        console.log(key,value)
        state.goods_attr[key] = value

      },
    },
  actions: {
    move({ commit },{action,index}) {
      if (action === 'moveUp') {
        commit('moveUp',index)
      } else {
        commit('moveDown', index)
      }
       
      }
    }
}