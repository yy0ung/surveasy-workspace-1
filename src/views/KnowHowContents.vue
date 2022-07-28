<template>
<div id="knowhowContents-container">
  
  <KnowHowTip2/>
  
  <!-- <KnowHowItem />
  <KnowHowClosed /> -->

</div>
</template>

<script>
import KnowHowTip1 from '../components/KnowHow/KnowHowTip/KnowHowTip1.vue'
import KnowHowTip2 from '../components/KnowHow/KnowHowTip/KnowHowTip2.vue'



export default {
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