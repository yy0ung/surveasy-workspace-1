<template>
  <div class="ServiceIdentity">
    <div class="identity-title">대학생 및 대학원생 인증을 진행하시겠습니까?</div>
    <div class="identity-detail">대학(원)생 인증을 완료하셔야 대학(원)생 할인이 적용됩니다. </div>
    <a  href="http://pf.kakao.com/_xfialK/chat" target="_blank"><button class="identity-btn" @click="yesFunc()">인증하러 가기</button></a>
    <div class="already-text" @click="noFunc()">이미 마이페이지에서 인증 요청을 완료하였습니다.</div>
  </div>
</template>

<script>
export default {
  data() {

  },
  
  mounted() {
    window.scrollTo(0,0)
  },

  methods: {
    yesFunc() {
      this.$router.push('/servicepaydone')

    },
    noFunc() {
      this.$router.push('/servicepaydone')
    }
  }

}
</script>

<style>
.ServiceIdentity {
  height: 500px;
}
.identity-title {
  font-family: 'Noto Sans KR', sans-serif;
  margin-top: 140px;
  font-size: 25px;
  color:#0CAE02;
  
}
.identity-detail {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 17px;
  font-weight: 500;
  margin-top: 20px;
}
.identity-btn {
  font-family: 'Noto Sans KR', sans-serif;
  width: 181px;
  height: 47px;
  margin-top: 65px;
  color:#0CAE02;
  background-color: white;
  border: 1px solid #0CAE02;
  border-radius: 30px;
  font-size: 19px;
  font-weight: lighter;
  cursor: pointer;
}
.already-text {
  font-family: 'Noto Sans KR', sans-serif;
  margin: 45px;
  font-size: 15px;
  color: grey;
  font-weight: lighter;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>