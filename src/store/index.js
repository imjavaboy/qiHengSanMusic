import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({

  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
  /**
  // state:用于保存全局共享数据
  state: {
    isFullScreen: false
  },
  // 修改全局共享数据的方法
  mutations: {
    changeFullScreen (state, flag) {
      state.isFullScreen = flag
    }
  },
  actions: {
    setFullScreen (context, flag) {
      context.commit('changeFullScreen', flag)
    }
  },
  modules: {
  },
  getters: {
    isFullScreen (state) {
      return state.isFullScreen
    }
  } */
})
