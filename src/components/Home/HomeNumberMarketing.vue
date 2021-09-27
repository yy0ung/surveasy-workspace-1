<template>
<div id="number-marketing-container">
  <div class="number-contents">
    <p>134명</p>
    <p>72개</p>
    <p>1시간 12분</p>
  </div>
  
</div>
</template>

<script>
export default {

}
</script>

<style>
  #number-marketing-container{
    border: 1px solid black;
    border-radius: 10px;
    margin: 20px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#number-marketing-container .number-contents{
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  font-size: 1.5rem;
}


</style>