<template>
<div id="members-container">
  <p>Surveasy의 멤버를 소개합니다.</p>
  <div class="members-contents">
    <div class="first">
      <span class="green">기획운영 Team</span><br>
      <div class="name"><span>송다예</span><span>장서준</span><span>김민지</span><span>함이수</span></div>
      <img class="img" src="@/assets/brandstory/다예.png" width="180">
      <img class="img" src="@/assets/brandstory/서준.png" width="180">
      <img class="img" src="@/assets/brandstory/민지.png" width="180">
      <img class="img" src="@/assets/brandstory/이수.png" width="180">
    </div>
    <div class="second">
      <div class="green"><span class="a">마케팅 Team</span><span class="de">개발 Team</span></div>
      <div class="name-"><span>마서희</span><span>이서영</span><span id="right">이예린</span><span>김민서</span><span>최진혁</span><span>오세영</span></div>
      <img class="img" src="@/assets/brandstory/서희.png" width="180">
      <img class="img" src="@/assets/brandstory/서영.png" width="180">
      <img class="img" id="right" src="@/assets/brandstory/예린.png" width="180">
      
      <img class="img" src="@/assets/brandstory/민서.png" width="180">
      <img class="img" src="@/assets/brandstory/진혁.png" width="180">
      <img class="img" src="@/assets/brandstory/세영.png" width="180">
    </div>
    
  </div>
  
</div>
</template>

<script>
export default {

}
</script>

<style>
  #members-container{
   max-width: 1190px;
    margin-right: auto;
   margin-left: auto;
   font-family: 'Noto Sans KR', sans-serif;
}
#members-container p{
  font-size: 1.7rem;
  font-weight: 300;
  margin-top: 110px;
  margin-bottom: 70px;
}
#members-container .members-contents .first{
  margin-bottom: 60px;
}
#members-container .members-contents .green{
  display: flex;
  justify-content: space-around;
  color: #0AA600;
  font-weight: 500;
  text-decoration: underline;
  margin-bottom: 30px;
}
#members-container .members-contents #right{
  margin-right: 57px;
}
#members-container .members-contents .name, .name-{
 
  margin-bottom: 20px;
}
#members-container .members-contents .name span{
  margin-right: 67px;
  margin-left: 67px;
  font-weight: 200;
  
}
#members-container .members-contents .name- span{
  text-align: center;
  margin-right: 67px;
  margin-left: 67px;
  font-weight: 200;
  
}
#members-container .members-contents .name- #right{
  margin-right:130px;
}


</style>