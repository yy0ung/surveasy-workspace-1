<template>
<div id="template-container">
  <div class="template-image">
    <img class="templateimg" src="@/assets/Home/template.png" width="575">
  </div>
  <div class="template-content">
    <p>
      <span class="template-none">제로 베이스에서 설문조사를 만드는 것에 어려움을 겪고 계신가요?</span>
      <br>
      <span class="template-bold">단돈 500원에 <span class="template-green">설문 템플릿</span>을 구매하여 사용해보세요!</span>
    </p>
    <router-link to="/surveytemplate"><button class="HomeSurveyTemplate-btn" id="template-btn">설문 템플릿 보기</button></router-link>
  </div>
    
  </div>
  
</template>

<script>
export default {

}
</script>

<style>
  #template-container{
    height: 580px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EEEEEE;
  }

  #template-container .template-content{
    text-align: left;
    margin-left: 178px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 30px;

  }

  #template-container .template-bold{
    font-weight: 900;
  } 
  #template-container .template-green{
    color: #fff;
    font-weight: 900;
    background-color: #0AAC00;
  }  
  .HomeSurveyTemplate-btn{
    margin-top: 82px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #0AAC00;
    background-color: #EEEEEE;
    border: 1px solid #0AAC00;
    padding: 9px 20px;
    border-radius: 24px;
    font-size: 19px;
}

.HomeSurveyTemplate-btn:hover{
  background-color: #0AAC00;
  color: #fff;  
}
</style>