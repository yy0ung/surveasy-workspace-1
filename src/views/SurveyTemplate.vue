<template>
  <div class="servicePage">
    <div class="row">
      <div class="col-xl-1 col-lg-1"></div>
      <div id="desktop" class="col-xl-6 col-lg-6">
      <img class="serviceDetail-img" src="@/assets/Template/설문템플릿.png">
      </div>
      <div class="col-xl-4 col-lg-4">
      <TemplateOption />
      </div>
      <div id="mobile">
      <img class="serviceDetail-img" src="@/assets/Template/설문템플릿.png">
      </div>
      <div class="col-xl-1 col-lg-1"></div>
    </div>
  </div>
</template>

<script>
import TemplateDetail from '../components/Template/TemplateDetail.vue'
import TemplateOption from '../components/Template/TemplateOption.vue'
export default {
  components:{
    TemplateDetail,
    TemplateOption
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