<template>
  <div>

    <h1>HOME</h1>

    <div class="home-contents">
      <HomeMainContent class="home-contents-child"/>
      <HomeNumberMarketing class="home-contents-child"/>
      <HomeReview class="home-contents-child"/>
      <HomeBrandStory class="home-contents-child"/>
      <HomeSiteMap class="home-contents-child"/>
      <Footer class="home-contents-child"/>
    </div>
    
    
  </div>
</template>

<script>
import HomeMainContent from '../components/Home/HomeMainContent.vue'
import HomeNumberMarketing from '../components/Home/HomeNumberMarketing.vue'
import HomeReview from '../components/Home/HomeReview.vue'
import HomeSiteMap from '../components/Home/HomeSiteMap.vue'
import HomeBrandStory from '../components/Home/HomeBrandStory.vue'
import Footer from '../components/Footer.vue'

export default {

  name: 'Home',
  components: {
    HomeMainContent,
    HomeNumberMarketing,
    HomeReview,
    HomeSiteMap,
    HomeBrandStory,
    Footer
  }
}
</script>

<style>
.home-contents-child{
  border-bottom: 1px solid black;
}
.HomeMainContent-btn{
  color:#42b983;
  background-color: #fff;
  border: 1.5px solid #42b983;
  padding: 5px 13px;
  border-radius: 30px;
}

.HomeMainContent-btn:hover{
  background-color: #42b983;
  color: #fff;  
}
</style>