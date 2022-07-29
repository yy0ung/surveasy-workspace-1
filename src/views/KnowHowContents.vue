<template>
<div id="knowhowContents-container">
  <div v-if="this.id==11">
    <KnowHowTip1/>
  </div>
  <div v-if="this.id==12">
    <KnowHowTip2/>
  </div>
  <!-- <KnowHowItem />
  <KnowHowClosed /> -->

</div>
</template>

<script>
import KnowHowTip1 from '../components/KnowHow/KnowHowTip/KnowHowTip1.vue'
import KnowHowTip2 from '../components/KnowHow/KnowHowTip/KnowHowTip2.vue'



export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  components:{
    KnowHowTip1,
    KnowHowTip2
    
  },
  mounted() {
    window.scrollTo(0,0)
  },
}
</script>

<style>
  #knowhow-container{
  min-width: 1190px;
  margin-left: auto;
  margin-right: auto;
  }
  
</style>