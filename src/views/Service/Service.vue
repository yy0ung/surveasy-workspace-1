<template>
  <div class="service-container row">
    <div class="col-xl-2"></div>
    <ServiceDetail />
    <ServiceOption />
    <div class="col-xl-2"></div>
  </div>
  
</template>

<script>
import ServiceDetail from '../../components/Service/Service1/ServiceDetail.vue'
import ServiceOption from '../../components/Service/Service1/ServiceOption.vue'
export default {
  components:{
    ServiceDetail,
    ServiceOption
  },
  mounted() {
    window.scrollTo(0,0)
  },

}
</script>

<style>

.service-container  {
  max-width: 1400px;
}
</style>