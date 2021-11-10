<template>
  <div class="PaymentPrice">
    <div class="PaymentPrice-container">
      <ul id="PaymentPrice-title">결제금액</ul>
      <br>
    <hr align="left"> 
      <ul class="showPrice">
        <span id="showPrice-text">총 결제금액</span> 
        <span id="showPrice-num">{{ this.$store.state.localSurveyState.price }} 원</span>
      </ul>
    </div>
    </div>  
</template>

<script>
export default {

}
</script>

<style>
.PaymentPrice {
  background: #EEEEEE 0% 0% no-repeat padding-box;
  margin-top: 70px;
  margin-left: 20px;
  border-radius: 15px;
}
.PaymentPrice-container {
  width: 380px;
  padding-top: 20px;
  z-index: 1;
}
.PaymentPrice-container ul{
  text-align: left;
  font-size: 13px;
  margin: 0;
  padding-left: 45px;
}
#PaymentPrice-title {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  margin: 25px 0 30px 0;
  font-size: 20px;
  font-weight: bold;
}
hr {
  width: 300px;
  margin-left: 45px;
  margin-bottom: 20px;
}

.showPrice #showPrice-text {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  font-size: 17px;
  font-weight: bold;
  margin-left: 60px;
  margin-right: 70px;
}
.showPrice #showPrice-num{
  font-family: 'Noto Sans KR', sans-serif;
  color: #0CAE02;
  font-size: 19px;
  font-weight: bold;
  margin-right: 20px;
}
</style>