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
      measurementId: "G-9XLHWG8GKQ",
    },
    isLoggedIn:false,
    db: null,
    userData: [],
    surveyData: [],
   
    priceTable: [
      [ [5000, 9000, 13000, 17000, 21000, 25000, 29000, 33000 ], 
        [14000, 20000, 26000, 32000, 38000, 44000, 50000, 56000], 
        [28000, 39000, 50000, 51000, 72000, 83000, 94000, 105000],
        [60000, 81000, 102000, 123000, 144000, 165000, 186000, 207000], ],
      
      [ [35000, 39000, 43000, 47000, 51000, 55000, 59000, 63000],
        [44000, 50000, 56000, 62000, 68000, 74000, 80000, 86000],
        [58000, 69000, 80000, 91000, 102000, 113000, 124000, 135000],
        [75000, 91000, 10700, 123000, 139000, 155000, 171000, 187000],
        [90000, 111000, 132000, 153000, 174000, 195000, 216000, 237000] ],

      [ [65000, 69000, 73000, 77000, 81000, 85000, 89000, 93000],
        [74000, 80000, 86000, 92000, 98000, 104000, 110000, 116000],
        [88000, 99000, 110000, 121000, 132000, 143000, 154000, 165000],
        [105000, 121000, 137000, 153000, 169000, 185000, 201000, 217000],
        [12000, 141000, 162000, 183000, 204000, 225000, 246000, 267000] ]

    ],

    priceTextTable: [
      [ '대학생 할인', '대학원생 할인', '대학생 및 대학원생이 아닙니다.' ],
      [ '1~3분', '4~6분', '7~10분', '11~15분', '16~20분' ],
      [ '30명', '40명', '50명', '60명', '70명', '80명', '90명', '100명' ],
      [ '선택 안함', '영어 설문(50명 이하)', '영어 설문(50명 초과)' ]
    ],
      

    EngOptionArray: [ '0','30000','60000' ],



    localSurveyState: {
      price: 0,
      identity: '',
      spendTime: '',
      requiredHeadCount: '',
      dueTime: '',
      ENTarget: '',

      title: '',
      target: '',
      institute: '',
      link: ''
    }, 
    

    currentUser:null,
    surveyListStatus:["응답 완료","응답 인증","설문 마감"],
    showModal: false,
  },
  mutations: {
    setDB(state, payload){
      state.db = payload
    },


    setSurveyMutation1(state, payload) {
      state.localSurveyState.price = payload.price,
      state.localSurveyState.identity = payload.identity,
      state.localSurveyState.spendTime = payload.spendTime,
      state.localSurveyState.requiredHeadCount = payload.requiredHeadCount,
      state.localSurveyState.dueTime = payload.dueTime,
      state.localSurveyState.ENTarget = payload.ENTarget
    },
    
    setSurveyMutation2(state, payload){
      state.localSurveyState.title = payload.title,
      state.localSurveyState.target = payload.target,
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
