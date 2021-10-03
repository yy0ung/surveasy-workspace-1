<template>
<div>
  
  <KnowHowRecommend />
  <KnowHowItem />
  

</div>
</template>

<script>
import KnowHowRecommend from '../components/KnowHow/KnowHowRecommend.vue'
import KnowHowItem from '../components/KnowHow/KnowHowItem.vue'
import KnowHowDetail from '../components/KnowHow/KnowHowDetail.vue'

export default {
  components:{
    KnowHowRecommend,
    KnowHowDetail,
    KnowHowItem,
    
  }
}
</script>

<style>
#knowhow-recommend-container{
  margin-top: 30px;
}
  .knowhow-title{
    display:flex;
    padding-left: 200px;
    font-size: 1.2rem;
    color: #0CAE02;
    font-weight: bold;
  }
</style>