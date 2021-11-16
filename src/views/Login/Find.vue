<template>
<div>
  <h1>비밀번호 재설정</h1>
  <input type="text" v-model="resetEmail">
  <button @click="resetPassword">비번재설정하깅~</button>

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
  methods :{
    resetPassword(){
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
        // Password reset email sent!
        // ..
         })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        // ..
        });
      }
  }


}
</script>

<style>

</style>