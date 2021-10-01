<template>
<div>
  <div id="nav">
    <router-link to="/"><img class="logoimg" src="@/assets/logo.png" width="190"></router-link> 

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
    <div class="nav-login">
      <router-link to="/login"><span class="nav-element" >LOGIN</span></router-link> 
    </div>
    
    
  </div>
  <router-view/>

  <div id="footer-container">
    <div class="footer-contents">
      <p>서베이지 Surveasy</p>
      <p>상호 : 서베이지</p>
      <p>사업자등록번호 : 000-00-00000</p>
      <p>이메일 : surveasy2019@yonsei.ac.kr</p>
  </div>
  <div class="footer-icons" style="font-size: 1.5rem;">
    <span class="footer-icon"><i class="fab fa-facebook-square"></i></span>
    <span class="footer-icon"><i class="fab fa-instagram"></i></span>
    <span class="footer-icon"><i class="fab fa-google"></i></span>
    <span class="footer-icon"><i class="fas fa-comment"></i></span>
  </div>
  </div>
</div>
</template>
<script>
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs } from 'firebase/firestore'
import { orderBy } from 'lodash'

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
      const sorted = orderBy(this.$store.state.surveyData, this.$store.state.surveyData.id, "desc")
      this.$store.state.surveyData = sorted
      
    }
  }
}
</script>



<style>
body {
  margin: 0;
}

.nav-links {
  flex: 1;
  margin-top: 57px;
  height: 27px;
  width: 918px;

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
  color: #0CAE02;
}


#footer {
  height: 100px;
}


.link-underline{

  text-decoration: none;
}

.link-underline:hover {
  text-decoration: underline;

}
.logoimg{
  margin-top: 50px;
  margin-left: 60px;
  height: 44px;
}
.nav-login{
  text-align: right;
  letter-spacing: 1.5px;
  margin-top: 57px;

}
#footer-container{
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
  #footer-container .footer-contents{
    display:flex;
    flex-direction: column;
    text-align: left;
    
    padding: 20px 50px;

  }
  #footer-container .footer-contents p{
    margin: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #6D6D6D;
  }
  #footer-container .footer-icons{
    display: flex;
    padding-right: 50px;
  }
  #footer-container .footer-icon{
    padding: 15px;
    color: #42b983;
  }
</style>
