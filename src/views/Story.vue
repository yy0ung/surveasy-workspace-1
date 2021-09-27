<template>
<div>
  
  <StoryPainPoint />
  <StoryStoryTelling />
  <StoryMembers />
  <Footer />
</div>
</template>

<script>
import StoryMembers from '../components/Story/StoryMembers.vue'
import StoryPainPoint from '../components/Story/StoryPainPoint.vue'
import StoryStoryTelling from '../components/Story/StoryStoryTelling.vue'
import Footer from '../components/Footer.vue'
export default {
  components :{
    StoryMembers,
    StoryPainPoint,
    StoryStoryTelling,
    Footer
  }
}
</script>

<style>

</style>