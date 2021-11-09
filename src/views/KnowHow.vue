<template>
<div id="knohow-container">
  
  <KnowHowItem />
  

</div>
</template>

<script>
import KnowHowItem from '../components/KnowHow/KnowHowItem.vue'


export default {
  components:{
    
    KnowHowItem,
    
  }
}
</script>

<style>
  #knowhow-container{
    min-width: 1190px;
  margin-left: auto;
  margin-right: auto;
  }
</style>