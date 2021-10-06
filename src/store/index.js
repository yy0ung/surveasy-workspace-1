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



    localSurveyState: {
      price: 0,
      requiredheadcount: '',
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


    setSurveyMutation1(state, payload) {
      state.localSurveyState.price = payload.price,
      state.localSurveyState.requiredheadcount = payload.requiredheadcount,
      state.localSurveyState.spendtime = payload.spendtime,
      state.localSurveyState.duetime = payload.duetime,
      state.localSurveyState.discount = payload.discount
    },
    setSurveyMutation2(state, payload){
      state.localSurveyState.title = payload.title,
      state.localSurveyState.keyword = payload.keyword,
      state.localSurveyState.institute = payload.institute,
      state.localSurveyState.link = payload.link
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
