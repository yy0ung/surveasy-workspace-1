<template>
  <div class="Coupon">
    <div class="Coupon-container">
      <ul id="Coupon-title">쿠폰 적용</ul>

      <ul id="Coupon-detail">
        <ul class="Coupon-detail-text">쿠폰</ul>
          <select class="Coupon-selectbox" v-model="selectedCoupon">
            <option>사용 가능 쿠폰 0장 / 전체 2장</option>
          </select>
          <button class="Coupon-btn">쿠폰 적용</button>
      </ul>

    </div>
    </div>  
</template>

<script>
export default {
  data() {
    return {
      selectedCoupon: ''
    }
  }

}
</script>

<style>
.Coupon {
  background: #EEEEEE 0% 0% no-repeat padding-box;
  margin-top: 20px;
  border-radius: 15px;
  opacity: 1;
}
.Coupon-container {
  width: 1123px;
  padding: 25px;
  z-index: 1;
}
.Coupon-container ul {
  text-align: left;
}
.Coupon-container #Coupon-title {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 25px 0 30px 0;
}
#Coupon-detail ul {
  display: block;
  margin-left: 3px;
}
.Coupon-detail-text {
  left: 187px;
  width: 200px;
  height: 25px;
  margin-top: 38px;
  margin-bottom: 15px;
  padding: 0;
  text-align: left;
  font-family: 'Noto Sans KR';
  font-size: 17px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.Coupon-selectbox {
  left: 190px;
  width: 695px;
  height: 55px;
  border: 0.75px solid #BCBCBC;
  opacity: 1;
  background-color: #EEEEEE;
}
.Coupon-btn {
  background-color: #EEEEEE;
  border: 1px solid #0CAE02;
  width: 112px;
  height: 46px;
  margin-left: 28px;
  color: #0CAE02;
  font-size: 15px;
  font-weight: 800;
  border-radius: 26px;
  cursor: pointer;  
}
</style>