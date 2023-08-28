<template id="app">
  <NavBar/>
  <router-view/>
  <Footer/>
</template>
<script>
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs, getDoc, snapshotEqual } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
// import browserDetect from 'vue-browser-detect-plugin'
// import { event } from 'vue-gtag'
// import { orderBy,sortBy } from 'lodash'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import _ from 'lodash'
import VueCookies from 'vue-cookies'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  data() {
    return {
      show: true
    }
  },
  mounted(){
    const firebaseApp = initializeApp(this.$store.state.firebaseConfig)
    const db = getFirestore();
    const analytics = getAnalytics()
    this.$store.commit('setDB', db)
    this.fetchUserData()
    this.fetchSurveyData()
    this.getCookie()
    window.scrollTo(0,0)
    this.test()
    // this.bd()
    // alert(this.$browserDetect.meta.name)
    // this.fetchLastID()
    // const mount = () => {
    //   event('login', { method: 'Google' })
    // }
    // mount()
    
  },
  components: {
    NavBar: NavBar,
    Footer: Footer,
  },

  methods:{
    setCookie(){
      VueCookies.set("none","n","7d")
      console.log(VueCookies.get("none"))
      this.show=false
      
    },
    getCookie(){
      if(VueCookies.isKey("none")){
        this.show=false
      }else{
        this.show=true
      }
      console.log(VueCookies.get("none"))
     //VueCookies.remove("none")
    },
    async fetchUserData(){
      const db = this.$store.state.db
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      
    },

    /*

    */
    async test(){
      const db = this.$store.state.db
      const snapShot = await getDocs(collection(db, "panelData"))
      const set = new Set()
      snapShot.forEach((doc) =>{
        var temp = doc.data().fcmToken
        if(temp!="" && set.has(temp)){
          console.log(doc.data().uid, doc.data().fcmToken, doc.data().name)
        }else{
          set.add(temp)
        }
      })
    },

    async fetchSurveyData(){
      const db = this.$store.state.db
      const surveyData = this.$store.state.surveyData
      const querySnapshot = await getDocs(collection(db, "surveyData"))
      querySnapshot.forEach((doc)=> {
        var dataSet = []
        if (doc.data().progress >= 3 || doc.data().progress == 2) {
          dataSet.push(doc.data())
          surveyData.push(dataSet)
        }
        // dataSet.push(doc.data(), upTime, dueTime, {'docID':docID})
        
      })
      
      const sorted = this.$store.state.surveyData.sort(function(a,b){return b[0].id - a[0].id })
      // const sorted = sortBy(this.$store.state.surveyData, [function(o) {return o.docID}])
      // var test = sorted.sort(function(a,b){return b[0].id - a[0].id })
      // console.log(test)
      this.$store.state.surveyData = sorted
      // console.log((this.$store.state.surveyData).length)
      
      
    },
    

    

    logout(){
      this.$router.push('/')
      this.$store.dispatch('logout')
    },
    handleFAQ(){
      this.$store.state.FAQbutton=0
    },
    goMypage(){
     
      this.$router.push('/mypage/dashboard')
      this.$store.state.indexColor=4
    },
    indexC(num){
      this.$store.state.indexColor = num
    }
    }
}
</script>



<style>
#app {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
