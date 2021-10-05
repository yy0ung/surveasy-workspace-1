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


    surveyLocal: {
      price: 0,
      head: '',
      spendtime: '',
      duetime: '',
      discount: '',
      title: '',
      keyword: '',
      institute: '',
      link: ''
    }, 
    
  },
  mutations: {
    setDB(state, payload){
      state.db = payload
    },

    setSurvey(state, payload2) {
      state.surveyLocal.price = payload2.price,
      state.surveyLocal.head = payload2.head,
      state.surveyLocal.spendtime = payload2.spendtime,
      state.surveyLocal.duetime = payload2.duetime,
      state.surveyLocal.discount = payload2.discount,
      state.surveyLocal.title = payload2.title,
      state.surveyLocal.keyword = payload2.keyword,
      state.surveyLocal.institute = payload2.institute,
      state.surveyLocal.link = payload2.link
    },

  },
  actions: {

  },
  modules: {
  }
})
