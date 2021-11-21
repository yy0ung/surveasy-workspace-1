<template>
<div class="login">
  <img class="login-checkimg" src="@/assets/check.png" width="120">
  <div class="loginform">
    <li>
      <input type="email" placeholder="아이디 (이메일)" v-model="email">
    </li>
    <li>
      <input type="password" placeholder="비밀번호" v-model="password">
    </li>
    <li>
      <div class="error">{{ error }}</div>
    </li>
    <li>
      <button class="loginbtn" @click="signIn">로그인하기</button>
    </li>
    
  </div>
  <div class="sublogin">
    <router-link to="/find-pw"><span class="sublogin-element">비밀번호 찾기</span></router-link> 
    <span class="sublogin-element">|</span> 
    <router-link to="/register"><span class="sublogin-element">회원가입</span></router-link> 
     
    
  </div>
  
</div>
  
 
  
  
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
export default {
  data(){
    return{
      email:'',
      password:'', 
      error: ''
    }
  },
  mounted() {
    window.scrollTo(0,0)
  },

  methods:{
    signIn(){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          
          const user = userCredential.user
          this.$store.state.currentUser = user
          console.log('current User: ', user)
          this.$store.state.isLoggedIn = true
          console.log('여기부터 currentUser 메소드 실험 -----')
          console.log(auth.currentUser.email)
          console.log(this.$store.state.currentUser.email)
          this.$store.dispatch('setCurrentUser', {
            payload: auth.currentUser.email
          })
          // .then(this.$store.dispatch('setUploadInfo', {
          // }))

          if(this.$store.state.notLoggedInService==false) {
            console.log('옵션 살리면서 로그인 성공')
            this.$router.push('/servicepay')
          }

          if(this.$store.state.notLoggedInService==true) {
            console.log('걍')
            this.$router.push('/')
          }

        })
        .catch((error) => {
          // 이 부분 alert 말고 다른 디자인 적용해도 좋을 듯.
          const errorCode = error.code;
          const errorMsg = error.message;

          console.log(errorCode)

          if(error.code=="auth/invalid-email") {
            this.error = "유효하지 않은 이메일 형식입니다."
          }

          if(error.code=="auth/wrong-password") {
            this.error = "잘못된 비밀번호입니다."
          }

        })
        

      
      
    }

  }
}
</script>

<style>
.login {
  margin: 100px;
  height: 350px;
}
.login-checkimg {
  margin-bottom: 15px;
}
.loginform li {
  list-style-type: none;
  margin: 10px;
}
.loginform li input {
  width: 200px;
  height: 20px;
  border: none;
  padding: 4px;
  margin: 5px;
  
  background-color: rgb(228, 228, 228);
}
.error {
  color: rgb(225, 5, 5);
  font-size: 10px;
}
.loginbtn {
  width: 120px;
  height: 30px;
  margin: 20px;
  color:#0CAE02;
  background-color: #fff;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 13px;
  cursor: pointer;
}
.loginbtn:hover {
  background-color: #0CAE02;
  color: #fff;
}
.sublogin {
  margin: 20px;
}
.sublogin .sublogin-element {
  font-size: 12px;
  margin: 20px;
}
a {
  text-decoration: none;
  color: rgb(74, 74, 74);
}
</style>