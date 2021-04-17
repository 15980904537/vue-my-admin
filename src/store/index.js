import Vue from 'vue';
import Vuex from 'vuex'
// import cart from './module/cart.js'
// import path from './module/path.js'
import info from './module/info.js'
import rule from './module/rule.js'
import goodsCreate from './module/goods_create'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    info,
    rule,
    goodsCreate
  }
})