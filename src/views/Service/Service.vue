<template>
  <div class="service-container">
    <div class="service-detail">
      <ServiceActivePannel/>
      <ServiceDetail />
    </div>
      <ServiceOption />
  </div>
  
</template>

<script>
import ServiceDetail from '../../components/Service/Service1/ServiceDetail.vue'
import ServiceOption from '../../components/Service/Service1/ServiceOption.vue'
import ServiceActivePannel from '../../components/Service/Service1/ServiceActivePannel.vue'
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, query, where } from "firebase/firestore"

export default {
  components:{
    ServiceDetail,
    ServiceOption,
    ServiceActivePannel
  },
  mounted() {
    window.scrollTo(0,0)
    
  }
}
 
</script>

<style>
.service-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}
</style>