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
  justify-content: center;
  
  height: 2000px;
}
.ServicePay-col {
  display: flex;
  flex-direction: column;
}

.OptionInfo {
  width: 1123px;
  height: 408px;
}
.SurveyInfo {
  width: 1123px;
  height: 814px;
}
</style>