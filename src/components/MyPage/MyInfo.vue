<template>
  <div class="mypage">
    <h1>myinfo</h1>
    <p>{{this.$store.state.currentUser}}</p>
    <div>
      <p>닉네임 : {{this.$store.state.currentUser['nickname']}}</p>
      <p>핸드폰번호 : {{this.$store.state.currentUser['phoneNumber']}}</p>
      <p>이메일 : {{this.$store.state.currentUser['email']}}</p>
      <p>신분 : {{this.$store.state.currentUser['identity']}}</p>
      <p>패널 여부 : {{this.$store.state.currentUser['isPanel']}}</p>
      <p>업로드 설문 : {{this.$store.state.currentUser['uploadIndex']}}</p>
    </div>
    
    <div>
      <hr>
      <h1>신분 인증 요청하기</h1>
      <p>{{identityRequest.request}}</p>
      <div>
        <select name="" id="" v-model="identityRequest">
          <option disabled >요청할 신분을 선택하세요</option>
          <option :value="{request: 'undergraduate'}">대학생 (학부생)</option>
          <option :value="{request: 'postgraduate'}">대학원생</option>
        </select>
        <br>
        <button @click="sendRequestVerifyIdentity(this.identityRequest)">요청 보내기</button>
        <br>
        <router-link to="/withdraw" class="go-link">회원 탈퇴하기 ></router-link>
      </div>

    </div>
  </div>
</template>

<script>
import {doc, setDoc} from 'firebase/firestore'

export default {
  data(){
    return {
      identityRequest: ''
    }
  },

  methods :{
    async sendRequestVerifyIdentity(requestInfo){
      const db = this.$store.state.db
      const currentUser = this.$store.state.currentUser
      await setDoc(doc(db, "identityVerifyRequired", currentUser.email.toString()), {
        requestIdentity: requestInfo.request,
        requestApproved: false,
        requestName: currentUser.name,
        requestEmail : currentUser.email
        
      }).then(
        alert("요청이 전송되었습니다 !")
      )
    }
  }

}
</script>

<style>
.mypage{
  min-width: 1190px;
  margin-left: auto;
  margin-right: auto;
}
</style>