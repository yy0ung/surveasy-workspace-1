<template>

<div id="number-marketing-container">
  <div class="number-contents">
    <p><span id="number-bold">134명</span>
      <br>
      <br>
      <span id="number-none">현재 대기 중인 패널</span>
    </p>
    <p><span id="number-bold">72개</span>
      <br>
      <br>
      <span id="number-none">지금까지 설문 응답 서비스를 </span>
      <br>
      <span id="number-none">이용한 의뢰자</span>
    </p>
    <p><span id="number-bold">1시간 12분</span>
      <br>
      <br>
      <span id="number-none">50개 응답까지 걸린 최단 시간 </span>
      <br>
      <span id="number-none">(실사례이나, 모든 설문에 해당되지는 않음)</span>
    </p>
  </div>
  

</div>
</template>

<script>
export default {

}
</script>

<style>
#number-marketing-container{
  background: #0AAC00 0% 0% no-repeat padding-box;
  height: 400px;
  margin-top: 60px;
  border:none;
  

}
#number-marketing-container .number-contents{
  margin-left: 0;
  margin-right:0;
  display: flex;
  justify-content: space-around;
  padding-top: 80px;
  color: #fff;
  
}

#number-marketing-container #number-none{
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 25px;
  font-weight: 500;

}

#number-marketing-container #number-bold{
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 80px;
  font-weight: 900;
}



</style>