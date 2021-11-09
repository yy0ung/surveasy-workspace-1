<template>
  <div class="PaymentMethod">
    <div class="PaymentMethod-container">
      <ul id="PaymentMethod-title">결제 방법</ul>
      <ul>
        <span id="Account-title">입금 계좌</span>
        <span id="Account-address">카카오뱅크 3333-17-5341775 (장서준)</span>
      </ul>
      <ul>
        <div><input v-model="accont_userName" id="Account-input" placeholder="입금자명"></div>
      </ul>
      <ul>
        <div class="PaymentMethod-text">
          입금 시, 메세지/입금자명에 "서베이지 아이디" 또는
          <br>"설문 주제"를 꼭 써주세요.
          <br><br>
          대학(원)생 인증을 완료하셔야 대학(원)생 할인이 적용됩니다.
          <br>아직 인증을 완료하지 않으셨다면, 카카오채널에서 완료해주세요.
          <p>{{ this.$props.title }}</p>
        </div>
      </ul>
      <button id="Payment-btn" @click="PayFin()">결제하기</button>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      accont_userName: ''
    }
  },

  methods: {
    PayFin() {
      this.$store.commit('setSurveyMutation2', { account_userName: this.accont_userName });
      
      console.log(this.$store.state.localSurveyState)
      
    }
  }
}
</script>

<style>
.PaymentMethod {
  z-index: -10;
  width: 400px;
  height: 380px;
  margin-top: 20px;
  margin-left: 20px;
  background-color: #EEEEEE;
  border-radius: 12px;
}
.PaymentMethod-container {
  padding: 1px;
  z-index: 1;
}
.PaymentMethod-container ul{
  text-align: left;
  font-size: 13px;
  margin: 0;
}
#PaymentMethod-title {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  margin: 27px 0 30px 0;
  font-size: 19px;
  font-weight: bold;
}
#Account-title {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-right: 34px;
}
#Account-input {
  font-family: 'Noto Sans KR';
  background-color: #EEEEEE;
  width: 280px;
  height: 10px;
  margin-top: 18px;
  border: 1px solid rgb(187, 187, 187);
  padding: 15px;
  font-size: 14px;
  font-weight: lighter;
}
.PaymentMethod-container input::placeholder {
  color: rgb(187, 187, 187);
}
.PaymentMethod-text {
  font-family: 'Noto Sans KR' lighter;
  font-size: 11px;
  margin-top: 30px;
  line-height: 19px;
}
#Payment-btn {
  background-color: #EEEEEE;
  border: 1px solid #0CAE02;
  width: 90px;
  height: 40px;
  margin-top: 30px;
  color: #0CAE02;
  font-weight: 800;
  border-radius: 30px;
  cursor: pointer;   
}
</style>