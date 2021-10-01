<template>
<div>
  
  <StoryPainPoint />
  <StoryStoryTelling />
  <StoryMembers />
  <HomeSiteMap />
  
</div>
</template>

<script>
import StoryMembers from '../components/Story/StoryMembers.vue'
import StoryPainPoint from '../components/Story/StoryPainPoint.vue'
import StoryStoryTelling from '../components/Story/StoryStoryTelling.vue'
import HomeSiteMap from '../components/Home/HomeSiteMap.vue'

export default {
  components :{
    StoryMembers,
    StoryPainPoint,
    StoryStoryTelling,
    HomeSiteMap,
    
  }
}
</script>

<style>

</style>