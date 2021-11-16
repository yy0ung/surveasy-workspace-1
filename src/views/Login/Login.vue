<template>
<div class="login">
  <img class="checkimg" src="@/assets/check.png" width="50">
  <div class="loginform">
    <li>
      <input type="email" placeholder="아이디 (이메일)" v-model="email">
    </li>
    <li>
      <input type="password" placeholder="비밀번호" v-model="password">
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
      password:''
    }
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
          this.$router.push('/')
        })
        .catch((error) => {
          // 이 부분 alert 말고 다른 디자인 적용해도 좋을 듯.
          const errorCode = error.code;
          const errorMsg = error.message;
          alert(errorCode)
        })
        

      
      
    }

  }
}
</script>

<style>
.login {
  margin: 100px;
}
.loginform li {
  list-style-type: none;
  margin: 10px;
}
.loginform li input {
  width: 170px;
  border: none;
  padding: 4px;
  margin: 7px;
  font-size: 3px;
  background-color: rgb(228, 228, 228);
}
.loginbtn {
  width: 80px;
  height: 20px;
  margin: 5px;
  color:#0CAE02;
  background-color: #fff;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 10px;
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
  font-size: 3px;
  text-decoration: none;
  margin: 10px;
}
</style>