<template>
<div id="knowhow-item-container">
  <div class="knowhow-contents">
    <div class="knowhow-title">
      <p class="black-light-check">서베이지 매거진 : Check</p>
      <p class="green">127명의 패널들이 선정한 인생 영화</p>
    </div>
    <div class="knowhow-content">
      <p><img class="img1" src="@/assets/knowhow/three/check3thumbnail.png" width="500"></p>
      <p class="black-bold-">서베이지 앱을 통해 “당신의 인생 영화는?”이라는 주제로 패널들의 Answer을 받았습니다.<br>총 127여명의 패널들이 질문에 답하였고, 패널들이 선정한 인생 영화를 소개해 드립니다.<br>무슨 영화를 볼지 고민될 때, 참고해 보시는 건 어떨까요?</p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">1. 로맨스&코미디</p>
      <p class="black-light">첫 번째로 소개해 드릴 영화 장르는 로맨스와 코미디입니다. 웃음 요소가 있고 너무 무겁지 않은 영화를 감상하고 싶을 때 이 영화들을 보는 것을 추천드려요!</p>
      <p><img class="img3" src="@/assets/knowhow/three/check3image(1).png" width="550"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">2. 드라마</p>
      <p class="black-light">다음은 드라마 장르의 영화입니다. 드라마 장르는 인간의 생활사, 가족애, 사회적 사건들을 다룬 장르입니다. 현실에서도 충분히 있을 법한 스토리들을 소재로 다룬 영화를 보고 싶으시다면 이 영화들을 추천드립니다. </p>
      <p><img class="img" src="@/assets/knowhow/three/check3image(2).png" width="550"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">3. 액션&모험&SF</p>
      <p class="black-light">다음은 액션, 모험, 그리고 SF 장르의 영화입니다. 흥미진진한 격투 장면, 현실에서는 겪을 수 없는 공상과학을 다룬 영화들로 영화를 보는 내내 긴장감 넘치는 시간을 즐기실 수 있어요!</p>
      <p><img class="img" src="@/assets/knowhow/three/check3image(3).png" width="550"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">4. 애니메이션&판타지&미스터리</p>
      <p class="black-light">애니메이션, 판타지 그리고 미스터리 장르의 영화들입니다. 영화에서 그려지는 판타지 세상을 통해서 감동과 재미를 느끼실 수 있어요! </p>
      <p><img class="img" src="@/assets/knowhow/three/check3image(4).png" width="550"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">5. 범죄&전쟁&스릴러</p>
      <p class="black-light">마지막으로 범죄, 전쟁 그리고 스릴러 장르의 영화들을 추천드립니다. 이 영화들은 누아르 분위기를 물씬 풍기는 영화들로 감상 후에는 깊은 여운이 남겨집니다. 어두우면서도 여운이 남는 영화를 보고 싶을 땐 이 영화들을 추천드려요. </p>
      <p><img class="img" src="@/assets/knowhow/three/check3image(5).png" width="550"></p>

      <p><img src="@/assets/knowhow/08.png" class="img2" width="30"></p>
        <p class="black-bold-">127명의 패널들이 선정한 인생 영화!<br>어떤 영화를 볼지 한참 고민하다가 끝내 못 고른 경험이 종종 있으시죠?<br>앞으로는 패널 분들이 뽑아준 인생 영화들을 감상하는 것을 추천드립니다.
</p>
 
    </div>
  </div>
</div>
</template>
 
<script>
export default {
  methods: {
   
  }
}
</script>

<style>

#knowhow-item-container{
    width: 1190px;
    margin-right: auto;
    margin-left: auto;
    font-family: 'Noto Sans KR', sans-serif;
    margin-top: 60px;
    text-align: center;
  }

  #knowhow-item-container .knowhow-title p{
   font-size: 1.5rem;
   margin-right: 30rem;
   font-weight: 500;
   color: #0AAB00;
   margin-top: 6px;
  }
  #knowhow-item-container .knowhow-title .black-light-check{
    font-size: 1.2rem;
    margin-right: 42.5rem;
    
    font-weight: 300;
    color:black;
    margin-bottom: 0;
  }
  #knowhow-item-container .img1{
    margin-top: 50px;
  }
  #knowhow-item-container .img{
    margin-top:30px;
    padding-left: 0 !important;
  }
  .knowhow-content {
    margin-bottom: 120px;
  }
  .knowhow-content .black-light{
    font-weight: 300;
    text-align: left;
    margin-left: 12rem !important;
    margin-right: 12rem !important;
    font-size: 1.1rem;
  }
  .knowhow-content .black-bold{
    font-weight: 700;
    font-size: 1.3rem;
    text-align: left;
    margin-left: 12rem !important;
  }
  .knowhow-content .img2{
    margin-top:100px;
    padding-left: 0 !important;
    margin-bottom: 20px;
  }
  .black-bold-{
    
    color: gray;
    font-weight: 400;
  }
 .green{
    margin-left: 9.9rem;
    text-align: left;
  }
 
</style>

