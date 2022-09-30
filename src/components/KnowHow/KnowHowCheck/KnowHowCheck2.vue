<template>
<div id="knowhow-item-container">
  <div class="knowhow-contents">
    <div class="knowhow-title">
      <p class="black-light-check">서베이지 매거진 : Check</p>
      <p class="green">100명의 패널들이 선정한 인생 맛집</p>
    </div>
    <div class="knowhow-content">
      <p><img class="img1" src="@/assets/knowhow/three/check2thumbnail.png" width="500"></p>
      <p class="black-bold-">서베이지 앱올 통해 “당신의 인생 맛집은?” 이라는 주제로 패널들의 Answer을 받았습니다.<br>총 100여명의 패널들이 질문에 답하였고, 패널들이 선정한 인생 맛집들을 소개해 드립니다.<br>가족, 친구들과 함께 패널들이 추천한 맛집을 가보는 건 어떨까요?
</p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">1. 서울 맛집</p>
      <p class="black-light">첫 번째는 서울 맛집으로 서울 지역 중에서도 다양한 지역의 맛집들을 추천해 주셨습니다. 메뉴 또한, 한식, 분식, 일식, 중식 등 다양해요. 식사 메뉴가 고민된다면, 이 맛집들을 방문해 보시는 건 어떨까요?
</p>
      <p><img class="img" src="@/assets/knowhow/three/check2image(1).png" width="600"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">2.. 경기 맛집</p>
      <p class="black-light">다음은 경기 지역 맛집입니다, 경기지역도 한식, 양식, 중식 그리고 건강식까지 다양한 메뉴들을 답변해 주셨어요, 주말에 기분 전환할 겸 드라이브도 하고 추천 맛집에서 식사 한 끼 하시는 건 어떨까요?</p>
      <p><img class="img" src="@/assets/knowhow/three/check2image(2).png" width="600"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">3. 충청도, 인천, 대구 맛집</p>
      <p class="black-light">다음은 충청도, 인천, 대구 지역의 추천 맛집입니다. 충청도의 맛집으로는 북일곰탕, 어신참치 등을 답해주셨고 인천 맛집으로는 2분의 1 떡볶이집, 삼일정, 옥련동 할머니 즉석 떡볶이집을 추천해 주셨어요. 대구 지역은 소고기 맛집과 한식 맛집을 답해주셨습니다 !
</p>
      <p><img class="img" src="@/assets/knowhow/three/check2image(3).png" width="600"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">4. 경상도, 강원도, 대전, 전라북도 맛집</p>
      <p class="black-light">경상도, 강원도, 대전, 전라북도 지역의 추천 맛집들입니다 : )  냉면, 대구찜, 낙지볶음 등을 먹을 수 있는 맛집들을 답해주셨어요. </p>
      <p><img class="img" src="@/assets/knowhow/three/check2image(4).png" width="600"></p>
    </div>
    <div class="knowhow-content">
      <p class="black-bold">5. 전국구 맛집</p>
      <p class="black-light">마지막으로 전국 단위로 있는 추천 맛집들입니다 : ) 각 지역마다 지점들이 있어서 가까운 지역으로 편하게 방문하실 수 있어요 </p>
      <p><img class="img" src="@/assets/knowhow/three/check2image(5).png" width="600"></p>

      <p><img src="@/assets/knowhow/08.png" class="img2" width="30"></p>
        <p class="black-bold-">100여명의 패널들이 선정한 인생 맛집 !<br>밥약 메뉴가 고민되는 대학생 분들, 점심 식사 메뉴가 고민되는 직장인 분들 ! 이 맛집들을 방문해 보시는 것을 추천드립니다.

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


