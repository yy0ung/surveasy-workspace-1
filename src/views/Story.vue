<template>
<div>
  
  <StoryPainPoint />
  <StoryStoryTelling />
  <StoryMembers />
  <HomeSiteMap />
  <Footer />
</div>
</template>

<script>
import StoryMembers from '../components/Story/StoryMembers.vue'
import StoryPainPoint from '../components/Story/StoryPainPoint.vue'
import StoryStoryTelling from '../components/Story/StoryStoryTelling.vue'
import HomeSiteMap from '../components/Home/HomeSiteMap.vue'
import Footer from '../components/Footer.vue'
export default {
  components :{
    StoryMembers,
    StoryPainPoint,
    StoryStoryTelling,
    HomeSiteMap,
    Footer
  }
}
</script>

<style>

</style>