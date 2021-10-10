<template>
<div class="mypage-container">
  
  <!-- <p>{{this.$store.state.currentUser}}</p> -->
  <div class="mypage-router-link-container">
    <router-link to="/mypage/payment" class="mypage-router-link">결제 내역</router-link>
    
    <router-link to="/mypage/myinfo" class="mypage-router-link">나의 정보</router-link>
    
  </div>
  <div class="mypage-router-view-container">
    <router-view></router-view>
  </div>
  
</div>
</template>

<script>
export default {

}
</script>

<style>
.mypage {
  border: 1px solid black;
}

.mypage-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 200px;
  
}

.mypage-router-link-container{
  width: 200px;
  height: 1000px;
  border: 1px solid black;
  font-size: 30px;
  text-align: left;
}

.mypage-router-link{
  padding-bottom: 50px;
  display: block;
  text-decoration-line: none;
}

.mypage-router-link.active{
  text-decoration-color: cadetblue;
}


.mypage-router-view-container{
  width: 1000px;
  border: 1px solid black;
}
</style>