<template>
<div id="app" :class="{backactive: this.$store.state.showModal}">
  <div id="nav">
    <router-link to="/"><img class="logoimg" src="@/assets/logo.png" width="190"></router-link> 

    <div class="nav-links">
      <div class="my-dropdown">
        <span class="nav-element" id="nav-service">서비스 이용
          <span class="nav-icon" >
            <i class="fas fa-chevron-down"></i>
          </span>
        </span>        
        <div class="my-dropdown-content">
          <router-link to="/service">설문 응답 서비스</router-link>
          <router-link to="/surveytemplate">설문 템플릿</router-link>
        </div>
       </div>
      <span class="nav-element-">|</span>
      <router-link to="/surveylist"><span class="nav-element">설문 리스트</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/knowhow"><span class="nav-element">설문 노하우</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/story"><span class="nav-element">브랜드 스토리</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/contact"><span class="nav-element" @click="handleFAQ">문의</span></router-link> 
    </div>
    <div class="nav-login" >
      <div v-if="this.$store.state.isLoggedIn == false">
        <router-link to="/login"><span class="nav-element" >LOGIN</span></router-link> 
      </div>
      <div v-else>
        <div class='my-dropdown'>
          <p class="my-dropdown-btn">안녕하세요 {{this.$store.state.currentUser.nickname}}님</p>
          <div class='my-dropdown-content'>
            <router-link to="/mypage">마이페이지</router-link>
            <p @click="logout">로그아웃</p>
            
          </div>
        </div>
      </div>
      
    </div>
  
    
    
  </div>
  <router-view/>
  <div id="site-map-container">
  <div class="map-contents">
    <p><span id="sitemap-bold">사이트맵</span></p>
    <p><span id="sitemap-bold">서비스</span>
      <router-link class="link-underline" to="/service"><p><span id="sitemap-none">설문 응답 서비스</span></p></router-link>
      <router-link class="link-underline" to="/surveylist"><p><span id="sitemap-none">설문 리스트</span></p></router-link>
      <router-link class="link-underline" to="/surveytemplate"><p><span id="sitemap-none">설문 템플릿</span></p></router-link>
      <router-link class="link-underline" to="/knowhow"><p><span id="sitemap-none">설문 노하우</span></p></router-link>
    </p>
    <p><span id="sitemap-bold">회사</span>
      <router-link class="link-underline" to="/story"><p><span id="sitemap-none">브랜드 스토리</span></p></router-link>
    </p>
    <p><span id="sitemap-bold">문의</span>
      <router-link class="link-underline" to="/contact"><p><span id="sitemap-none">1:1 문의</span></p></router-link>
      <router-link class="link-underline" to="/contact"><p><span id="sitemap-none">B2B 문의</span></p></router-link>
      <router-link class="link-underline" to="/contact"><p><span id="sitemap-none">FAQ</span></p></router-link>
    </p>
    
    
    </div>
    
  </div>

  <div id="footer-container">
    <div class="footer-contents">
      <p>서베이지 Surveasy</p>
      <p>상호 : 서베이지</p>
      <p>이메일 : surveasy2019@yonsei.ac.kr</p>
  </div>
  <div class="footer-icons" >
    <span class="footer-icon"><img class="footerimg" src="@/assets/Footer/IHEI.jpg" width="130"></span>
    <span class="footer-icon"><a href="https://www.instagram.com/surveasy/"><img class="footerimg" src="@/assets/Footer/insta.jpg" width="31.3"></a></span>
    <span class="footer-icon"><a href=""><img class="footerimg" src="@/assets/Footer/facebook.jpg" width="32.05"></a></span>
    <span class="footer-icon"><a href="https://blog.naver.com/surveasy"><img class="footerimg" src="@/assets/Footer/blog.jpg" width="32.05"></a></span>
    <span class="footer-icon"><a href=""><img class="footerimg" src="@/assets/Footer/kakao.jpg" width="33.86"></a></span>
    <span class="footer-icon"><a href="https://www.youtube.com/c/Surveasy/featured"><img class="footerimg" src="@/assets/Footer/youtube.jpg" width="34.09"></a></span>
    
  </div>
  </div>
</div>
</template>
<script>
import { initializeApp } from 'firebase/app'
import { getFirestore,collection, getDocs } from 'firebase/firestore'
import { orderBy,sortBy } from 'lodash'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import _ from 'lodash'

export default {
  mounted(){
    const firebaseApp = initializeApp(this.$store.state.firebaseConfig)
    const db = getFirestore();
    this.$store.commit('setDB', db)
    this.fetchUserData()
    this.fetchSurveyData()

    // 로그인관리 방법 중 하나
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {  
    //       if (user) {
    //         console.log('authStateChanged!')
    //         this.$store.dispatch('setCurrentUser', {
    //           payload: user.email
    //         })
        
    //   }
    // })

    
    
    
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
        var docID = Number(doc.data().id)
        var dataSet = []
        dataSet.push(doc.data(), upTime, dueTime, {'docID':docID})
        surveyData.push(dataSet)
      })
      
      const sorted = this.$store.state.surveyData.sort(function(a,b){return b[0].id - a[0].id })
      // const sorted = sortBy(this.$store.state.surveyData, [function(o) {return o.docID}])
      // var test = sorted.sort(function(a,b){return b[0].id - a[0].id })
      // console.log(test)
      this.$store.state.surveyData = sorted
      console.log((this.$store.state.surveyData).length)
      
      
    },

    logout(){
      this.$router.push('/')
      this.$store.dispatch('logout')
    },
    handleFAQ(){
      this.$store.state.FAQbutton=0
    }
  }
}
</script>



<style>
#app{

  min-width: 1190px;
  margin-left: auto;
  margin-right: auto;

  margin-left : auto;
  margin-right: auto;
  min-width: 1190px;

}
body {
 
  margin: 0;
}

#nav .nav-links {
  flex:1;
  margin-top: 57px;
  height: 27px;
  width: 918px;
  font-size: 1rem;
  padding-bottom: 30px;

}

.nav-links a {
  padding-left: 30px;
  padding-right: 30px;
  
}

#home {
  max-width: 1190px;
  margin-left: auto;
  margin-right: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

#nav {
  background-color: #fff;
  padding: 20px;
  height: 70px;
  display: flex;
  align-items: center;
  position: sticky;
  top:0;
  
}




#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
  text-decoration: none;
  
  
}
#nav .nav-element{
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
  text-decoration: none;
  margin-right: 30px;
  margin-left: 30px;
}
#nav .nav-icon{
  margin-left: 15px;
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
  margin-top: 25px;
  margin-left: 60px;
  height: 44px;
}
.nav-login{
  text-align: right;
  letter-spacing: 1.5px;
  margin-top: 57px;
  padding-bottom: 30px;

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

  .my-dropdown{
    position: relative;
    display: inline-block;
  }
  .my-dropdown:hover .my-dropdown-content{
    display: block;
    margin-top:5px;
    margin-left: 5px;
  }

  .my-dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.my-dropdown-content a:hover {background-color: #aaa;}

  .my-dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
  }

  .my-dropdown-content p {
    cursor: pointer;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .my-dropdown-content p:hover {
    background-color: #aaa;
  }

  #site-map-container{
    background: #E3E3E3 0% 0% no-repeat padding-box;;
    border:none;
    text-align: left;
    height: 300px;
    
  }
  #site-map-container .map-contents{
    
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 35px;
    padding-left: 500px;
  }
   #site-map-container .map-contents p{
     color: black;
   }
   #site-map-container #sitemap-bold{
     font-family: 'Noto Sans KR', sans-serif;
     font-size: 1rem;
     font-weight: 500;
   }
   #site-map-container #sitemap-none{
     font-family: 'Noto Sans KR', sans-serif;
     font-size: 0.8rem;
     font-weight: 300;
   }
   #nav .nav-links a.router-link-exact-active {
  color: #0f5219;
}
/*.backactive{
  background: rgb(202, 202, 202);
  width: 100%;
  height: 100%;
  
  }*/
  

</style>
