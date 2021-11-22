<template>
<div>
  <h1>비밀번호 재설정</h1>
  <p>{{resetEmail}}</p>
  <input type="text" v-model="resetEmail">
  <button @click="resetPassword(this.resetEmail)">비번재설정하깅~</button>

</div>
  
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  data(){
    return{
      resetEmail : '',
    }
  },
  mounted() {
    window.scrollTo(0,0)
  },
  methods :{
    resetPassword(email){
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('비밀번호 재설정 메일을 보냈습니다!')
         })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode)
        // ..
        });
      }
  }


}
</script>

<style>

</style>