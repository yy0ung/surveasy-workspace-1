<template>
  <div class="ServiceIdentity">
    <div class="identity-title">대학생 및 대학원생 인증을 진행하시겠습니까?</div>
    <div class="identity-detail">대학(원)생 인증을 완료하셔야 대학(원)생 할인이 적용됩니다. </div>
    <div class="middle-box"> 
      
      <select name="" id="middle-select" v-model="identityRequest">
          <option :value="{request: ''}" selected disabled >인증하려는 할인 대상을 선택하세요</option>
          <option :value="{request: '대학생'}">대학생 (학부생)</option>
          <option :value="{request: '대학원생'}">대학원생</option>
      </select>
      <p class="mi-detail">하단의 <span id="info-green">'인증하러 가기'</span>를 통해 카카오톡으로 대학(원)생임을 확인할 수 있는 자료를 보내주세요. </p>
      
    </div>
    <a  href="http://pf.kakao.com/_xfialK/chat" target="_blank"><button class="identity-btn" @click="sendRequestVerifyIdentity(this.identityRequest)">인증하러 가기</button></a>
      
        
     
    <p class="identity-done" @click="noFunc()">이미 인증 요청을 완료했습니다.</p>

  </div>
</template>

<script>
import {doc, collection, getDocs, updateDoc, setDoc} from 'firebase/firestore'
export default {
  data() {
    return{
      identityRequest: '',
    }
  },
  
  mounted() {
    window.scrollTo(0,0)
  },

  methods: {
    async fetchUserData(){
      const db = this.$store.state.db
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      
    },
    yesFunc() {
      this.$router.push('/mypage/dashboard')

    },
    noFunc() {
      this.$router.push('/mypage/dashboard')
    },
    async sendRequestVerifyIdentity(requestInfo) {
      const db = this.$store.state.db
      const currentUser = this.$store.state.loginState.currentUser

      if(this.$store.state.loginState.currentUser.identity == 'default' && this.$store.state.loginState.currentUser.identity_request == false) {
        // console.log(this.$store.state.loginState.currentUser.identity)


        await setDoc(doc(db, "identityVerifyRequired", currentUser.email.toString()), {
          requestIdentity: requestInfo.request,
          requestApproved: false,
          requestName: currentUser.name,
          requestEmail : currentUser.email
        
        })
        await updateDoc(doc(db, "userData", currentUser.email.toString()), {
          identity_request: true
        

      }).then(
        alert("요청이 전송되었습니다 !")
      )
      this.$store.state.userData = []
        await this.fetchUserData()
        // console.log(this.$store.state.loginState.currentUser.identity_request)
      }
      else {
        alert('이미 인증을 완료하셨습니다.')
      }
    },
  }

}
</script>

<style>

.ServiceIdentity{
  height: 500px;
  margin-top: 250px;
  font-family: 'Noto Sans KR', sans-serif;
}
.identity-title {
  font-size: 2rem;
  font-weight: bold;
  color: #0AAB00;
  margin-bottom: 35px;

}
.identity-detail{
  font-size: 1.2rem;
}
.identity-btn {
  padding: 10px 30px;
  margin-top: 50px;
  margin-bottom: 20px;
  color:#0CAE02;
  background-color: white;
  border: 1px solid #0CAE02;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
}
.identity-btn:hover{
  color: white;
  background-color: #0CAE02;
}
.identity-done{
  color: #b4afaf;
  text-decoration: underline;

  cursor: pointer;
}
#middle-select{
  border-radius: 10px;
  width: 350px;
  height: 38px;
  text-align: center;
  margin-bottom: 10px;
  padding: 3px 5px;
  font-family: 'Noto Sans KR', sans-serif;
  border: 0.1px solid black;
  margin-top: 50px;
  font-size: 1rem;
}
.middle-box .green-title{
  margin-top: 10px;
  
}
.mi-detail{
  margin-bottom: 0;
}
.mi-btn{
  font-family: 'Noto Sans KR', sans-serif;
  border: 1px solid #0AAC00;
  border-radius: 10px;
  opacity: 1;
  font-size: 0.8rem;
  padding: 5px 10px;
  color: #0AAC00;
  background-color: white;
  margin-left: 20px;
}
.mi-btn:hover{
  color: white;
  background-color: #0AAC00;
}
</style>