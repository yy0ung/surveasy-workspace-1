<template>
<div id="main-content-container">
  <p>서베이를 이지하게<br> 서베이지 </p>
  <div class="HomeMainContent-btns">
    <button class="HomeMainContent-btn" id="response-btn">설문 응답 서비스</button>
    <button class="HomeMainContent-btn" id="calculator-btn">가격 계산기</button>
  </div>
  
  

  
</div>
</template>


<script>
export default {

}
</script>

<style>
#main-content-container{
  border: 1px solid black;
  border-radius: 10px;
  margin: 20px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
}

#main-content-container p {
  padding-left: 50px;
  font-size: 30px;
  text-align: left;
}

#main-content-container .HomeMainContent-btns{
  display: flex;
  justify-items: left;
  padding-left: 50px;
  
}

#main-content-container #response-btn{
  margin-right: 15px;
}

</style>