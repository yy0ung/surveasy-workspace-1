<template>
<div>
  <h1>story</h1>
  <StoryPainPoint />
  <StoryStoryTelling />
  <StoryMembers />
</div>
</template>

<script>
import StoryMembers from '../components/Story/StoryMembers.vue'
import StoryPainPoint from '../components/Story/StoryPainPoint.vue'
import StoryStoryTelling from '../components/Story/StoryStoryTelling.vue'
export default {
  components :{
    StoryMembers,
    StoryPainPoint,
    StoryStoryTelling
  }
}
</script>

<style>

</style>