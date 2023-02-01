<template>
<div class="container">
  <div class="row">
  <div class="col-1"></div>
  <div class="col-10">
    <div class="row">
  <div class="col-lg-7 col-xl-7 col-12">
      <OptionInfo />
      <SurveyInfo />
      <CouponPoint />
  </div> 
  <div class="col-lg-5 col-xl-5 col-12">
        <PaymentPrice />
        <PaymentMethod />
    </div>
  </div>
</div>
  <div class="col-1"></div>
</div>
</div>
  
</template>

<script>
import OptionInfo from '../../components/Service/Service2/OptionInfo.vue'
import SurveyInfo from '../../components/Service/Service2/SurveyInfo.vue'
import CouponPoint from '../../components/Service/Service2/Coupon.vue'
import PaymentPrice from '../../components/Service/Service2/PaymentPrice.vue'
import PaymentMethod from '../../components/Service/Service2/PaymentMethod.vue'

export default {

  components: { OptionInfo, SurveyInfo, CouponPoint, PaymentPrice, PaymentMethod },
  mounted() {
    window.scrollTo(0,0)
  },
}
</script>

<style>
.cl{
  position: sticky;
  align-self : flex-start;
}
</style>