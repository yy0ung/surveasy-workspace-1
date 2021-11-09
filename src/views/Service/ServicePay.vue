<template>
<div class="ServicePay">
  <div class="ServicePay-col">
      <OptionInfo />
      <SurveyInfo />
      
      
    </div>  

  <div class="ServicePay-col">
      <PaymentPrice />
      <PaymentMethod />
    </div>
</div>
  
</template>

<script>
import OptionInfo from '../../components/Service/Service2/OptionInfo.vue'
import SurveyInfo from '../../components/Service/Service2/SurveyInfo.vue'
import PaymentPrice from '../../components/Service/Service2/PaymentPrice.vue'
import PaymentMethod from '../../components/Service/Service2/PaymentMethod.vue'

export default {

  components: { OptionInfo, SurveyInfo, PaymentPrice, PaymentMethod }

}
</script>

<style>
.ServicePay {
  display: flex;
  flex-direction: row;
}
.ServicePay-row {
  display: flex;
  flex-direction: column;
}
</style>