<template>
<div>
  <div id="nav">
    <router-link to="/">서베이지 Surveasy 로고</router-link> 

    <div class="nav-links">
      <router-link to="/service"><span class="nav-element">서비스 이용</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/surveylist"><span class="nav-element">설문 리스트</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/knowhow"><span class="nav-element">설문 노하우</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/story"><span class="nav-element">브랜드 스토리</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/contact"><span class="nav-element">문의</span></router-link> 
    </div>
    
    <router-link to="/login"><span class="nav-element">LOGIN</span></router-link> 
    
  </div>
  <router-view/>

  <div id="footer">
    <p>footer</p>
  </div>
</div>
</template>
<script>
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs } from 'firebase/firestore'

export default {
  mounted(){
    const firebaseApp = initializeApp(this.$store.state.firebaseConfig)
    const db = getFirestore();
    this.$store.commit('setDB', db)
    this.fetchUserData()
    this.fetchSurveyData()
    
    
  },
  methods:{
    async fetchUserData(){
      const db = this.$store.state.db
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      
    },

    async fetchSurveyData(){
      const db = this.$store.state.db
      const surveyData = this.$store.state.surveyData
      const querySnapshot = await getDocs(collection(db, "surveyData"))
      querySnapshot.forEach((doc)=> {
        const upTime = new Date(doc.data().uploadTime.seconds*1000)
        const dueTime = new Date(doc.data().dueTime.seconds*1000)
        
        var dataSet = []
        dataSet.push(doc.data(), upTime, dueTime)
        surveyData.push(dataSet)
      })
      
    }
  }
}
</script>



<style>
body {
  margin: 0;
}

.nav-links {
  flex: 4;
}

.nav-links a {
  padding-left: 30px;
  padding-right: 30px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  border-bottom: 1px solid black;
  height: 40px;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
  text-decoration: none;
  
}

#nav .nav-element:hover {
  color: #42b983;
}


#footer {
  height: 100px;

}

.link-underline{
  text-decoration: none;
}

.link-underline:hover{
  text-decoration: underline;

}
</style>
