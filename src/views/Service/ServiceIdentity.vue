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
  height: 400px;
}
.identity-title {
  margin-top: 100px;
  font-size: 20px;
  font-weight: bold;
  color:#0CAE02;
}
.identity-detail {
  font-size: 13px;
  font-weight: bold;
  margin-top: 20px;
}
.identity-btn {
  width: 130px;
  height: 31px;
  margin-top: 50px;
  color:#0CAE02;
  background-color: white;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
.already-text {
  margin: 30px;
  font-size: 10px;
  color: grey;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>