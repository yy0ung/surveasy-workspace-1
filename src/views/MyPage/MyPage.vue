<template>
<div id="mypage-container">
  
  <div class="top-button">
    <button >의뢰자</button>
    <button id="client">패널</button>
    
  </div>
  <div class="back-same" v-if="this.$store.state.myPage==1">
    <div class="from">

   
  <div class="img">
    <span class="grade-img" v-if="grade<=2"><img src="@/assets/myPage/gradeOne.png" width="85"></span>
    <span class="grade-img" v-if="grade>=3&&grade<=9"><img src="@/assets/myPage/gradeTwo.png" width="85"></span>
    <span class="grade-img" v-if="grade>=10"><img src="@/assets/myPage/gradeThree.png" width="85"></span>
  </div>
  <div class="title">
    안녕하세요, <span id="green">{{this.$store.state.loginState.currentUser['name']}}</span>님 
  </div>
  <div class="go-link">
    <router-link to="/serviceidentity_mypage" class="go-link">대학(원)생 인증하러가기 ></router-link>
  </div>
   </div>
      
    
  
  <div class="mypage-contents">
  <!-- <p>{{this.$store.state.currentUser}}</p> -->
  <div class="mypage-router-link-container">
    <router-link to="/mypage/dashboard" class="mypage-router-link" @click="button(0)" :class="{active:color==0}">대시보드</router-link>
    <router-link to="/mypage/payment" class="mypage-router-link" @click="button(1)" :class="{active:color==1}">주문 내역</router-link>
    <router-link to="/mypage/couponpoint" class="mypage-router-link" @click="button(2)" :class="{active:color==2}">쿠폰/적립금</router-link>
    <router-link to="/mypage/myinfo" class="mypage-router-link" @click="button(3)" :class="{active:color==3}">나의 정보</router-link>
  
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
  data() {
    return {
      
      color: 0,
      grade : this.$store.state.loginState.currentUser['uploadIndex'].length
    }
  },
  methods: {
    button(num){
      this.color=num
    },
  },
 
  mounted() {
    window.scrollTo(0,0)
  
    
  }
}
</script>

<style>
#mypage-container{
  width: 1190px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  margin-bottom: 100px;
}
.mypage-router-link.active{
  color: #0AAC00;
}
.from{
  display: flex;
  
}
.title{
  font-size: 2rem;
  margin-right: 20px;
  padding-top: 20px;
  margin-left: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  
}
.img{
  padding-left: 100px;
  
}
.go-link{
  padding-top: 40px;
  margin-left: 10px;
}
#client{
  background-color: white;
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
  border: 0.5px solid #EEEEEE;
  font-family: 'Noto Sans KR', sans-serif;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-bottom: 0.5px;
  

}
#mypage-container .back-same{
  padding-top: 70px;
  width: 1190px;
  margin: auto;
  height: auto;
  background: #EEEEEE 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 9px #0000001F;
  text-align: left;
  font-family: 'Noto Sans KR', sans-serif;
  padding-bottom: 50px;

}

.mypage-contents {
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
  
  
}

.mypage-router-link-container{
  width: 120px;
  height: 700px;
  
  font-size: 1rem;
  text-align: left;
  
}

.mypage-router-link{
  padding-bottom: 30px;
  padding-left: 30px;
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