<template>

  <HomeSlideImage/>
  <HomeContents/>
  <HomeNumberMarketing/>
  <HomeReview/>
</template>

<script>
import HomeSlideImage from '../components/Home/HomeSlideImage.vue'
import HomeMainContent from '../components/Home/HomeMainContent.vue'
import HomeNumberMarketing from '../components/Home/HomeNumberMarketing.vue'
import HomeReview from '../components/Home/HomeReview.vue'
import HomeSurveyTemplate from '../components/Home/HomeSurveyTemplate.vue'
import HomeContents from '../components/Home/HomeContents.vue'
import HomeBrandStory from '../components/Home/HomeBrandStory.vue'


export default {

  name: 'Home',
  components: {
    HomeMainContent,
    HomeNumberMarketing,
    HomeReview,
    HomeSurveyTemplate,
    HomeBrandStory,
    HomeSlideImage,
    HomeContents,
  },
  mounted() {
    window.scrollTo(0,0)
  },
}
</script>

<style>
</style>