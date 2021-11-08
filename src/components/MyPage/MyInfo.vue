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
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>