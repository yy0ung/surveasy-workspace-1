<template>
<div id="knowhow-item-container">
  <div class="knowhow-title">
    <p>서베이지의 Easy한 설문 응답</p>
    
    <!-- 리스트에 넣고 테스트하면 꼬일까봐 일단 여기에 임시로! -->
    <button @click="toSubmit">응답인증</button>
    
  </div>
  <div class="knowhow-content">
    <span>image</span>
    <span>image</span>
    <span>image</span>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    toSubmit(){
      if(confirm('//유의사항')){
        this.$router.push('response')
      }
    }
  }
}
</script>

<style>
  #knowhow-item-container{
    margin-top: 50px;
  }
  #knowhow-item-container .knowhow-content{
    display: flex;
    justify-content: space-between;
  }
  #knowhow-item-container .knowhow-content span{
    background-color: rgb(209, 204, 204);
    padding: 70px 70px;
    margin-left: 200px;
    margin-right: 200px;
    border-radius: 10px;
  }
</style>