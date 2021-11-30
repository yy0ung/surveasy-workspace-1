<template>
  <div class="PaymentPrice">
    <div class="PaymentPrice-container">
      <ul id="PaymentPrice-title">결제금액</ul>
      <ul class="showPrice-detail-total">
        <span id="showPrice-text">주문금액</span> 
        <span id="showPrice-num">{{ this.$store.state.localSurveyState.beforeCouponPrice }} 원</span>
      </ul>
      <ul class="showPrice-detail-coupon">
        <span id="showPrice-text">쿠폰할인</span> 
        <span id="showPrice-num">- {{ this.$store.state.localSurveyState.couponDiscount }} 원</span>
      </ul>
    <hr align="left"> 
      <ul class="showPrice-final">
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
.showPrice-detail-total #showPrice-text {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  font-size: 16px;
  margin-left: 5px;
  margin-right: 165px;
}
.showPrice-detail-total #showPrice-num{
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  font-size: 16px;
}
.showPrice-detail-coupon {
  padding: 13px;
}
.showPrice-detail-coupon #showPrice-text {
  font-family: 'Noto Sans KR', sans-serif;
  color: rgb(157, 157, 157);
  font-size: 16px;
  margin-right: 130px;
  margin-left: 40px;
}
.showPrice-detail-coupon #showPrice-num{
  font-family: 'Noto Sans KR', sans-serif;
  color: rgb(157, 157, 157);
  font-size: 16px;
}
.showPrice-final #showPrice-text {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  font-size: 17px;
  font-weight: bold;
  margin-left: 5px;
  margin-right: 125px;
}
.showPrice-final #showPrice-num{
  font-family: 'Noto Sans KR', sans-serif;
  color: #0CAE02;
  font-size: 19px;
  font-weight: bold;
  margin-right: 20px;
}
</style>