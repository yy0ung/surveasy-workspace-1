<template>
<div>
  <h1>knowhow</h1>
  <KnowHowRecommend />
  <KnowHowItem />
  <KnowHowDetail />
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
    KnowHowItem
  }
}
</script>

<style>

</style>