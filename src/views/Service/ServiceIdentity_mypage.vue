<template>
  <div class="ServiceIdentity">
    <div class="identity-title">대학생 및 대학원생 인증을 진행하시겠습니까?</div>
    <div class="identity-detail">대학(원)생 인증을 완료하셔야 대학(원)생 할인이 적용됩니다. </div>
    <a  href="http://pf.kakao.com/_xfialK/chat" target="_blank"><button class="identity-btn" @click="yesFunc()">인증하러 가기</button></a>

    <p class="identity-done" @click="noFunc()">이미 마이페이지에서 인증 요청을 완료했습니다.</p>

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
      this.$router.push('/mypage/dashboard')

    },
    noFunc() {
      this.$router.push('/mypage/dashboard')
    }
  }

}
</script>

<style>

.ServiceIdentity{
  height: 400px;
  margin-top: 150px;
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
</style>