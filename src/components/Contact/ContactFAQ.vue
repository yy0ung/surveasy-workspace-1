<template>
<div id="FAQ-container">
  <div>
    <h1>FAQ</h1>
    <div class="FAQ-contents-index">
      <button class="ContactFAQ-btn-gray">설문 응답 서비스</button>
      <button class="ContactFAQ-btn-gray">설문 템플릿</button>
      <button class="ContactFAQ-btn-gray">회원 정보</button>
      <button class="ContactFAQ-btn-gray">결제 / 환불</button>
    </div>
  </div>
  
</div>
</template>

<script>

export default {
  
 
}
</script>

<style>
  #FAQ-container{
    margin-top: 50px;
  }
  #FAQ-container .FAQ-contents-index{
    display: flex;
    justify-content: space-evenly;
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 40px;
  }
  #FAQ-container .FAQ-contents-index .ContactFAQ-btn-gray{
    background-color: rgb(221, 220, 220);
    border-style: none;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 1rem;
  }
  #FAQ-container .FAQ-contents-index .ContactFAQ-btn-gray:hover{
    background-color: rgb(194, 192, 192);
  }
</style>