<template>
  <div class="shadow rounded bg-white p-4 mt-4">
        <h3>결제금액</h3><hr>
        <div class="row">
          <p class="showPrice-text col-6">주문금액</p> 
          <p class="showPrice-num col-6">{{ priceToString(this.$store.state.localSurveyState.beforeCouponPrice) }} 원</p>
          <p class="showPrice-text col-6">쿠폰할인</p> 
          <p class="showPrice-num col-6">{{ priceToString(this.$store.state.localSurveyState.couponDiscount) }} 원</p>
          <p class="showPrice-text col-6">적립금 사용</p> 
          <p class="showPrice-num col-6">{{ priceToString(this.$store.state.localSurveyState.pointDiscount) }} 원</p>
      <hr class="col-12"> 
          <p class="showPrice-text col-6">총 결제금액</p> 
          <p class="showPrice-num col-6">{{ priceToString(this.$store.state.localSurveyState.price) }} 원</p>
    </div>
  </div>  
</template>

<script>
export default {
  methods: {
    priceToString(price) {
      return (""+price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
}
</script>

<style>
.showPrice-num {
  color:#0CAE02;
}
</style>