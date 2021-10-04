import { createStore } from 'vuex'


export default createStore({
  state: {
    firebaseConfig : {
      apiKey: "AIzaSyDnID31w3NDNi96G-1ImjJ-5Iuz3j775zs",
      authDomain: "surveasy-workspace.firebaseapp.com",
      projectId: "surveasy-workspace",
      storageBucket: "surveasy-workspace.appspot.com",
      messagingSenderId: "1077091709710",
      appId: "1:1077091709710:web:0fb6f216a86dfd3a87dd5f",
      measurementId: "G-9XLHWG8GKQ"
    },

    db: null,
    userData: [],
    surveyData: [],

    surveyInfo: {
      totalPrice: 0,
      requiredHeadCount: '',
      dueTime: '',
      spendTime: '',
      discount: '',
    }
  },
  mutations: {
    setDB(state, payload){
      state.db = payload
    },

  },
  actions: {

  },
  modules: {
  }
})
