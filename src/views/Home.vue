<template>
  <div>
    <h1>Home</h1>
    <div class="home-contents">
      <HomeMainContent class="home-contents-child"/>
      <HomeNumberMarketing class="home-contents-child"/>
      <HomeReview class="home-contents-child"/>
      <HomeBrandStory class="home-contents-child"/>
      <HomeSiteMap class="home-contents-child"/>
    </div>
    
    
  </div>
</template>

<script>
import HomeMainContent from '../components/Home/HomeMainContent.vue'
import HomeNumberMarketing from '../components/Home/HomeNumberMarketing.vue'
import HomeReview from '../components/Home/HomeReview.vue'
import HomeSiteMap from '../components/Home/HomeSiteMap.vue'
import HomeBrandStory from '../components/Home/HomeBrandStory.vue'

export default {

  name: 'Home',
  components: {
    HomeMainContent,
    HomeNumberMarketing,
    HomeReview,
    HomeSiteMap,
    HomeBrandStory
  }
}
</script>

<style>
.home-contents-child{
  border-bottom: 1px solid black;
}
</style>