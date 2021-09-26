<template>
<div>
  <h1>service</h1>
  <ServiceOption />
  <ServiceDetail />

</div>
</template>

<script>
import ServiceDetail from '../../components/Service/ServiceDetail.vue'
import ServiceOption from '../../components/Service/ServiceOption.vue'
export default {
  components:{
    ServiceDetail,
    ServiceOption
  }

}
</script>

<style>

</style>