import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     scalex:0,
     scalsey:0
  },
  getters: {

  },
  mutations: {
    reciveScale(state, scale) {
			state.scalex=scale.x
			state.scaley=scale.y
      console.log(scale,'烧到了')
		},
  },
  actions: {
  },
  modules: {
  }
})
