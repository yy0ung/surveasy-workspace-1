<template>
  <div class="servicePage">
    <div class="row">
      <div class="col-xl-1 col-lg-1"></div>
      <div id="desktop" class="col-xl-6 col-lg-6">
      <img class="serviceDetail-img" src="@/assets/service/설문응답_상세페이지.png">
      </div>
      <div class="col-xl-4 col-lg-4">
      <ServiceOption />
      </div>
      <div id="mobile">
      <img class="serviceDetail-img" src="@/assets/service/설문응답_상세페이지.png">
      </div>
      <div class="col-xl-1 col-lg-1"></div>
    </div>
  </div>
</template>

<script>
import ServiceOption from '../../components/InterviewService/InterviewService1/InterviewServiceOption.vue'
export default {
  components:{
    ServiceOption
  },
  mounted() {
    window.scrollTo(0,0)
  },

}
</script>

<style>
@media screen and (max-width: 950px){
#desktop {
  display: none;
}
}

@media screen and (min-width: 951px){
#mobile {
  display: none;
}
}

.serviceDetail-img {
  width:100%;
}

.servicePage {
  max-width: 1600px;
  margin:auto;
}

</style>