<template>
<div id="contactus-container">
  
  <div class="contactus-contents">
    <h2>CONTACT US</h2>
    <button class="ContactContactUs-btn" >친구 추가 하러 가기</button>
    <div class="contactus-icon" style="font-size: 1.3rem;">
      <i class="fas fa-paper-plane"></i>
    </div>
    <div class="contactus-contents-text">
      <p class="contactus-bold">@Surveasy 카카오톡 플러스 친구</p>
      <p>추가 후 1:1 실시간 채팅으로 문의</p>
    </div>
    <button class="ContactContactUs-btn">이메일 복사하기</button>
    <div class="contactus-icon" style="font-size: 1.3rem;">
      <i class="fas fa-envelope-open"></i>
    </div>
    <div class="contactus-contents-text">
      <p class="contactus-bold">surveasy2019@yonsei.ac.kr</p>
      <p>이메일 문의</p>
    </div>
    
    
    
    
  </div>    
</div>
</template>

<script>
export default {

}
</script>

<style>
  #contactus-container{
    max-width: 1190px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 40px;
  }
  #contactus-container .contactus-contents {
    background-color: rgb(238, 238, 238);
    padding: 50px 50px;
    display: flex;
    align-items: center;
    justify-content:space-evenly;
    border-radius: 30px;
    margin-left: 30px;
    margin-right: 30px;
    
  }
  
  #contactus-container .contactus-contents .contactus-contents-text{
    text-align: left;
    margin-right:80px;
  }

  

</style>