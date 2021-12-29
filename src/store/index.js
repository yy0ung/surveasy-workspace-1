
import { createStore } from 'vuex'
import { doc, getDoc } from 'firebase/firestore'
import createPersistedState from 'vuex-persistedstate'


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
    notLoggedInService: true,
    notLoggedInService2: true,
    db: null,
    userData: [],
    surveyData: [],
    adminData: [],
    adminDataIdentity:[],
    adminDataB2B:[],

    adminCoupon: [],
    myCoupon: [],
    
    
    
   
    priceTable: [
      [ [5000, 5000, 9000, 13000, 17000, 21000, 25000, 29000, 33000 ], 
        [5000, 5000, 9000, 13000, 17000, 21000, 25000, 29000, 33000 ],
        [14000, 14000, 20000, 26000, 32000, 38000, 44000, 50000, 56000], 
        [28000, 28000, 39000, 50000, 51000, 72000, 83000, 94000, 105000],
        [45000, 45000, 61000, 77000, 93000, 109000, 125000, 141000, 157000],
        [60000, 60000, 81000, 102000, 123000, 144000, 165000, 186000, 207000], ],

      [ [5000, 5000, 9000, 13000, 17000, 21000, 25000, 29000, 33000 ], 
        [5000, 5000, 9000, 13000, 17000, 21000, 25000, 29000, 33000 ],
        [14000, 14000, 20000, 26000, 32000, 38000, 44000, 50000, 56000], 
        [28000, 28000, 39000, 50000, 51000, 72000, 83000, 94000, 105000],
        [45000, 45000, 61000, 77000, 93000, 109000, 125000, 141000, 157000],
        [60000, 60000, 81000, 102000, 123000, 144000, 165000, 186000, 207000], ],
      
      [ [35000, 35000, 39000, 43000, 47000, 51000, 55000, 59000, 63000],
        [35000, 35000, 39000, 43000, 47000, 51000, 55000, 59000, 63000],
        [44000, 44000, 50000, 56000, 62000, 68000, 74000, 80000, 86000],
        [58000, 58000, 69000, 80000, 91000, 102000, 113000, 124000, 135000],
        [75000, 75000, 91000, 10700, 123000, 139000, 155000, 171000, 187000],
        [90000, 90000, 111000, 132000, 153000, 174000, 195000, 216000, 237000] ],

      [ [65000, 65000, 69000, 73000, 77000, 81000, 85000, 89000, 93000],
        [65000, 65000, 69000, 73000, 77000, 81000, 85000, 89000, 93000],
        [74000, 74000, 80000, 86000, 92000, 98000, 104000, 110000, 116000],
        [88000, 88000, 99000, 110000, 121000, 132000, 143000, 154000, 165000],
        [105000, 105000, 121000, 137000, 153000, 169000, 185000, 201000, 217000],
        [120000, 120000, 141000, 162000, 183000, 204000, 225000, 246000, 267000] ]

    ],
      
    EngOptionArray: [ '0','30000','60000' ],

    TimeOptionArray: [ '0','15000','12000','8000','5000','0','0' ],


    priceTextTable: [
      [ '', '30명', '40명', '50명', '60명', '70명', '80명', '90명', '100명' ],
      [ '', '1~3분', '4~6분', '7~10분', '11~15분', '16~20분' ],
      [ '', '18~24시간', '24~36시간', '36~48시간', '48~72시간', '72시간~168시간' ],
      [ '선택 안함', '영어 설문 (50명 이하)', '영어 설문 (50명 초과)' ],
      [ '', '대학생 할인', '대학원생 할인', '할인 대상이 아닙니다.' ],
    ],
      

    localSurveyState: {
      price: 0,
      requiredHeadCount: '',
      spendTime: '',
      dueTime: '',
      ENTarget: '',
      identity: '',
      
      title: '',
      target: '',
      institute: '',
      link: '',
      notice: '',

      account_userName:'',

      adminApproved: false,
      uploader: '',
      uploaderIdentity: '',

      dueDate: '',
      dueTimeTime: '',
      dueTimeTimeTime: '',

      beforeCouponPrice:0,
      couponDiscount:0,
      coupon_use: false,
      
    },

    localTemplateState: {
      type: '',
      name: '',
      email: '',
      etc: '',
      uploader: '',
      uploadDate: ''
    },
     


    showLinkModal: false,
    goServiceInputForm: false,
    checklink: null,

    currentUser:null,
    surveyListStatus:["응답 완료","응답 인증","설문 마감"],
    showModal: false,
    showFinalModal: false,
    FAQbutton: 0,

    isAdmin: false,
    AdminPassword: 1111,
    lastID : [],
    currentUserUploadInfo:[],

    
  },

  mutations: {
    setDB(state, payload){
      state.db = payload
    },


    setSurveyMutation1(state, payload) {
      state.localSurveyState.price = payload.price,
      state.localSurveyState.beforeCouponPrice = payload.beforeCouponPrice,
      state.localSurveyState.identity = payload.identity,
      state.localSurveyState.spendTime = payload.spendTime,
      state.localSurveyState.requiredHeadCount = payload.requiredHeadCount,
      state.localSurveyState.dueTime = payload.dueTime,
      state.localSurveyState.ENTarget = payload.ENTarget
      state.localSurveyState.dueDate = payload.dueDate
      state.localSurveyState.dueTimeTime = payload.dueTimeTime
     
    },
    
    setSurveyMutation2(state, payload){
      state.localSurveyState.title = payload.title,
      state.localSurveyState.target = payload.target,
      state.localSurveyState.institute = payload.institute,
      state.localSurveyState.link = payload.link,
      state.localSurveyState.notice = payload.notice
    },

    setSurveyMutation3(state, payload) {
      state.localSurveyState.account_userName = payload.account_userName
      state.localSurveyState.uploader = payload.uploader
      state.localSurveyState.uploaderIdentity = payload.uploaderIdentity
    },

    setTemplateMutation(state, payload) {
      state.localTemplateState.type = payload.type
      state.localTemplateState.name = payload.name
      state.localTemplateState.email = payload.email
      state.localTemplateState.etc = payload.etc      
      state.localTemplateState.uploader = payload.uploader
      state.localTemplateState.uploadDate =  payload.uploadDate
    },

    setCurrentUserMutation(state, payload){
      state.currentUser = payload
      console.log(state.currentUser)
      console.log('currentUser가 설정되었습니다.')
      
    },

    setCouponDiscountEmpty(state){
      state.localSurveyState.couponDiscount = 0
    },

    logoutMutation(state){
      state.currentUser = null
      state.isLoggedIn = false
    },
    setAdminState(state){
      state.isAdmin = true
    },

    setSurveyDueTime(state,payload){
      var dttt = payload.dueDate + ' ' + payload.dueTime
      
      
      
      state.localSurveyState.dueTimeTimeTime= new Date(dttt);
      console.log(state.localSurveyState.dueTimeTimeTime)
    },

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

    // async setUploadInfo({state, commit}){
    //   console.log('setuploadinfo시작')
    //   const db = state.db
    //   const uploadIndex = state.currentUser['uploadIndex']
    //   console.log(uploadIndex)

    //   for (var index in uploadIndex){
    //     var docRef = doc(db, "adminRequired", uploadIndex[index].toString())
    //     var docSnap = await getDoc(docRef)
    //       .then((data) => {
    //         commit('setCurrentUserUploadInfo', data.data())
    //       })

    //   }
    // },

    logout({commit}){
      commit('logoutMutation')

    }
  },
  modules: {
  }
//   plugins: [
//     createPersistedState({
//       // paths : ['isLoggedIn', 'currentUser']
//     })
//   ]
 })