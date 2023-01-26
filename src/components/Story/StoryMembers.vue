<template>
<div id="members-container">
  <p>Surveasy의 멤버를 소개합니다.</p>
  <div class="members-contents">
    <div class="mem-first">
      <div class="mem-green">기획운영 Team</div>
      <div class="mem-name"><span>송다예</span><span>박지호</span></div>
      <img class="mem-img" src="@/assets/brandstory/다예.png" width="180"/>
      <!-- #지호 사진 추가 -->
      <img class="mem-img" src="@/assets/brandstory/다예.png" width="180" />
      
     
    </div>
    <div class="mem-second">
      <div class="mem-green">개발 Team</div>
      <div class="mem-name-"><span>김민서</span><span>최진혁</span><span>오세영</span></div>
      
      <img class="mem-img" src="@/assets/brandstory/민서.png" width="180">
      <img class="mem-img" src="@/assets/brandstory/진혁.png" width="180">
      <img class="mem-img" src="@/assets/brandstory/세영.png" width="180">
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
  font-weight: 400;
  margin-top: 110px;
  margin-bottom: 70px;
  text-align: center;
}
.members-contents{
  display: flex;
    justify-content: space-around;
}
#members-container .members-contents .mem-first{
  margin-bottom: 60px;
}
#members-container .members-contents .mem-green{
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
#members-container .members-contents .mem-name, .mem-name-{
 
  margin-bottom: 20px;
}
#members-container .members-contents .mem-name span{
  margin-right: 67px;
  margin-left: 67px;
  font-weight: 200;
  
}
#members-container .members-contents .mem-name- span{
  text-align: center;
  margin-right: 67px;
  margin-left: 67px;
  font-weight: 200;
  
}
#members-container .members-contents .mem-name- #right{
  margin-right:130px;
}
</style>