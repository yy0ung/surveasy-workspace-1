<template>
<div id="site-map-container">
  <div class="map-contents">
    <router-link class="link-underline" to="/"><p>SURVEASY</p></router-link>
    <router-link class="link-underline" to="/service"><p>서비스 이용</p></router-link>
    <router-link class="link-underline" to="/surveylist"><p>설문 리스트</p></router-link>
    <router-link class="link-underline" to="/knowhow"><p>설문 노하우</p></router-link>
    <router-link class="link-underline" to="/story"><p>브랜드 스토리</p></router-link>
    <router-link class="link-underline" to="/contact"><p>문의</p></router-link>
    <router-link class="link-underline" to="/login"><p>Login</p></router-link>
  </div>
  

</div>
</template>

<script>
export default {

}
</script>

<style>
  #site-map-container{
    background-color: rgb(182, 177, 177);
    border:none;
  }
  #site-map-container .map-contents{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
   #site-map-container .map-contents p{
     color: black;
   }
   
</style>