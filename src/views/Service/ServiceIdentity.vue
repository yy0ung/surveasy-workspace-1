<template>
  <div class="ServiceIdentity">
    <div class="identity-title">대학생 및 대학원생 인증을 하시겠습니까?</div>
    <div class="identitu-detail">대학생 및 대학원생 인증을 하시면 할인가능~~ </div>
    <a  href="http://pf.kakao.com/_xfialK/chat" target="_blank"><button class="identity-btn" @click="yesFunc()">인증하러 가기</button></a>
    <button class="identity-btn" @click="noFunc()">이미 인증을 완료하였습니다.</button>
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
.identity-title {
  font-size: 40px;
  font-weight: bold;
}
.identity-btn {
  width: 200px;
  height: 30px;
  margin-top: 60px;
  color:#0CAE02;
  background-color: white;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
}
</style>