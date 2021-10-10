<template>
  <div id="home">

    

    <div class="home-contents">
      <HomeMainContent class="home-contents-child"/>
      <HomeNumberMarketing class="home-contents-child"/>
      <HomeReview class="home-contents-child"/>
      <HomeSurveyTemplate class="home-contents-child"/>
      <HomeBrandStory class="home-contents-child"/>
      <HomeSiteMap class="home-contents-child"/>
      
    </div>
    
    
  </div>
</template>

<script>
import HomeMainContent from '../components/Home/HomeMainContent.vue'
import HomeNumberMarketing from '../components/Home/HomeNumberMarketing.vue'
import HomeReview from '../components/Home/HomeReview.vue'
import HomeSurveyTemplate from '../components/Home/HomeSurveyTemplate.vue'
import HomeSiteMap from '../components/Home/HomeSiteMap.vue'
import HomeBrandStory from '../components/Home/HomeBrandStory.vue'


export default {

  name: 'Home',
  components: {
    HomeMainContent,
    HomeNumberMarketing,
    HomeReview,
    HomeSurveyTemplate,
    HomeSiteMap,
    HomeBrandStory,
    
  }
}
</script>

<style>
.home-contents-child{
  margin-top:0;
}

.HomeMainContent-btn{
  font-family: 'Noto Sans KR', sans-serif;
  color: #0AAC00;
  background-color: #fff;
  border: 1px solid #0AAC00;
  padding: 9px 20px;
  border-radius: 24px;
  font-size: 19px;
}

.HomeMainContent-btn:hover{
  background-color: #0AAC00;


  color: #fff;  
}
</style>