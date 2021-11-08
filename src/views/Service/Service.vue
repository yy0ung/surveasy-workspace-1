<template>
  <div class="service-container">
      <ServiceDetail />
      <ServiceOption />
  </div>
  
</template>

<script>
import ServiceDetail from '../../components/Service/Service1/ServiceDetail.vue'
import ServiceOption from '../../components/Service/Service1/ServiceOption.vue'
export default {
  components:{
    ServiceDetail,
    ServiceOption
  }

}
</script>

<style>
.service-container {
  display: flex;
  flex-direction: row;
}
</style>