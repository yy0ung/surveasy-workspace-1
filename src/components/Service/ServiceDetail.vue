<template>

<div class="serviceDetail-container">

  <div class="serviceDetail-container-child" id="WHAT-containter">
    <div>서비스 설명 WHAT</div>
  </div>

  <div class="serviceDetail-container-child" id="HOW-containter">
    <div>운영 과정 HOW</div>
  </div>

  <div class="serviceDetail-container-child" id="WHO-container">
    <div>패널 데모그래픽 WHO</div>
  </div>

  <div class="serviceDetail-container-child" id="WHY-container">
    <div>서비스의 장점/효과 WHY</div>
  </div>

  <div class="serviceDetail-container-child" id="note">
    <div>유의사항</div>
  </div>
  
</div>
</template>

<script>
export default {

}
</script>

<style>
.serviceDetail-container {
  width: 100%;
  border-radius: 10px;
  margin: 40px;
  display: flex;
  flex-direction: column;
  background-color: rgb(231, 231, 231);
  border-radius: 10px;

}
.serviceDetail-container-child {
  height: 150px;
  margin: 3px;
  padding: 50px;
  border-bottom: 1px solid grey;
}
</style>