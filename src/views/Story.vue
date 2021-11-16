<template>
<div id="story">
  
  <StoryPainPoint />
  <StoryStoryTelling />
  <StoryTwo />
  <StoryLine />
  <StoryPicture />
  <StoryMembers />
  <StoryVideo />

  
</div>
</template>

<script>
import StoryMembers from '../components/Story/StoryMembers.vue'
import StoryPainPoint from '../components/Story/StoryPainPoint.vue'
import StoryStoryTelling from '../components/Story/StoryStoryTelling.vue'
import StoryTwo from '../components/Story/StoryTwo.vue'
import StoryLine from '../components/Story/StoryLine.vue'
import StoryPicture from '../components/Story/StoryPicture.vue'
import StoryVideo from '../components/Story/StoryVideo.vue'


export default {
  components :{
    StoryMembers,
    StoryPainPoint,
    StoryStoryTelling,
    StoryTwo,
    StoryLine,
    StoryPicture,
    StoryVideo
    
    
  }
}
</script>

<style>
#story{
  max-width: 1190px;
  margin-right: auto;
  margin-left: auto;
  
}
</style>