<template>
<div id="mypage-container">
  
  <div class="top-button">
    <button>패널</button>
    <button>의뢰자</button>
    
  </div>
  <div class="back-same">
  
  <span class="title">안녕하세요, <span id="green">{{this.$store.state.currentUser['nickname']}}</span>님 </span>
  <router-link to="/serviceidentity" class="go-link">대학(원)생 인증하러가기 ></router-link>
  <div class="mypage-contents">
  <!-- <p>{{this.$store.state.currentUser}}</p> -->
  <div class="mypage-router-link-container">
    <router-link to="/mypage/dashboard" class="mypage-router-link">대시보드</router-link>
    <router-link to="/mypage/payment" class="mypage-router-link">주문 내역</router-link>
    <router-link to="/mypage/couponpoint" class="mypage-router-link">쿠폰/적립금</router-link>
    <router-link to="/mypage/myinfo" class="mypage-router-link">나의 정보</router-link>
  
  </div>
  <div class="mypage-router-view-container">
    <router-view></router-view>
  </div>
  
</div>
</div>
</div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0,0)
  },
}
</script>

<style>
#mypage-container{
  width: 1190px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
}
.title{
  font-size: 2rem;
  margin-right: 20px;
  margin-left: 80px;
  padding-top: 50px;
  font-family: 'Noto Sans KR', sans-serif;
  
}
#green{
  color: #0AAC00;
}
.top-button{
  text-align: left;
}
.top-button button{
  width: 100px;
  padding: 10px 10px;
  background-color: #EEEEEE;
  border: none;
  font-family: 'Noto Sans KR', sans-serif;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  

}
#mypage-container .back-same{
  padding-top: 80px;
  width: 1190px;
  margin: auto;
  background: #EEEEEE 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 9px #0000001F;
  text-align: left;
  font-family: 'Noto Sans KR', sans-serif;
}

.mypage-contents {
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
  
  
}

.mypage-router-link-container{
  width: 100px;
  height: 1500px;
  
  font-size: 1rem;
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
  width: 800px;
  
}
</style>