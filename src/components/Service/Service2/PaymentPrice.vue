<template>
  <div class="PaymentPrice">
    <div class="PaymentPrice-container">
      <ul id="PaymentPrice-title">결제금액</ul>
      <ul><hr align="left" style="width:300px;"></ul>
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
  z-index: -10;
  width: 400px;
  height: 180px;
  margin-top: 70px;
  margin-left: 20px;
  background-color: #EEEEEE;
  border-radius: 12px;
}
.PaymentPrice-container {
  padding: 1px;
  z-index: 1;
}
.PaymentPrice-container ul{
  text-align: left;
  font-size: 13px;
  margin: 0;
}
#PaymentPrice-title {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  margin: 27px 0 50px 0;
  font-size: 19px;
  font-weight: bold;
}
hr {
  margin-bottom: 20px;
}

.showPrice #showPrice-text {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-left: 70px;
  margin-right: 80px;
}
.showPrice #showPrice-num{
  font-family: 'Noto Sans KR', sans-serif;
  color: #0CAE02;
  font-size: 19px;
  font-weight: bold;
  margin-right: 20px;
}
</style>