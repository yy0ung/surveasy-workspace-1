import { createStore } from 'vuex'
import { doc, getDoc } from 'firebase/firestore'


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
    isLoggedIn:false,
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
    

    currentUser:null
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


    setCurrentUserMutation(state, payload){
      state.currentUser = payload
      
    },
    logoutMutation(state){
      state.currentUser = null
      state.isLoggedIn = false
    }
  },
  actions: {
    async setCurrentUser({state, commit}, payload){
      
      const db = state.db
      const docRef = doc(db, "userData", payload['payload'].toString())
      const docSnap = await getDoc(docRef)
        .then((data) => {
          commit('setCurrentUserMutation',data.data())
        })


      // console.log(docSnap.data());
    },

    logout({commit}){
      commit('logoutMutation')
    }
  },
  modules: {
  }
})
