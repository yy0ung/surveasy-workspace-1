<template>
  <div id="knowhow-main-container">
  
    <p class="knowhow-subtitle">서베이지의 EASY한 꿀팁 
      <router-link :to="`/knowhowimage/${1}`"><span id="knowhow-more-btn">더보기</span></router-link></p>
      <div class="knowhow-main-contents">
        <div class="main-grid" v-for="slide in this.$store.state.knowhowOne" :key="slide">
        <router-link :to="slide.link"><img class="know-main-image" :src="slide.image"></router-link>

    </div>
      </div>
      
      
    

    <p class="knowhow-subtitle">다른 리서치도 EASY하게
      <router-link :to="`/knowhowimage/${2}`"><span id="knowhow-more-btn">더보기</span></router-link></p>
    


    <p class="knowhow-subtitle">서베이지의 매거진 : check
      <router-link :to="`/knowhowimage/${3}`"><span id="knowhow-more-btn">더보기</span></router-link></p>
    
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
    }
  },
  methods: {
    
    
  },
}
</script>

<style>
#knowhow-main-container{
  max-width: 1190px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 100px;
  height: 1300px;
  
}

.knowhow-subtitle{
  font-family: 'Noto Sans KR', sans-serif;
  color: #0AAB00;
  font-size: 25px;
  text-align: left;
  margin-left: 50px;
}
#knowhow-more-btn{
  font-family: 'Noto Sans KR', sans-serif;
  color: #a8a7a7;
  font-size: 15px;
  font-weight: 400;
  margin-left: 10px;
  text-decoration: underline;
  
  
}
.main-grid{
  width: 200px;
  height: 200px;
}
.know-main-image{
  width: 200px;
  height: 200px;
  grid-area: 1/1/2/2;
}
.knowhow-main-contents{
  justify-content: center;
  align-items: center;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 15em);
  grid-template-rows: repeat(2,15em);
  gap: 10px;


}




</style>