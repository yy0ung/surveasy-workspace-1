<template>
<div id="FAQ-container">
  <div class="FAQ-router-link-container">
    <router-link to="/contact/respondService" class="FAQ-router-link"><button class="FAQ-btn" id="left">설문 응답 서비스</button></router-link>
    <router-link to="/contact/template" class="FAQ-router-link"><button class="FAQ-btn">설문 템플릿</button></router-link>
    <router-link to="/contact/memberInfo" class="FAQ-router-link"><button class="FAQ-btn">회원 정보</button></router-link>
    <router-link to="/contact/payment" class="FAQ-router-link"><button class="FAQ-btn">결제 / 환불</button></router-link>
  </div>
  <div class="FAQ-router-view-container">
    <router-view></router-view>
  </div> 
</div>
</template>

<script>

export default {
  
 
}
</script>

<style>
  #FAQ-container{
    margin-top: 80px;
    max-width: 1190px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 100px;
  }
  #FAQ-container .FAQ-router-link-container{
    display: flex;
    justify-content: center;
    
  }
   #FAQ-container .FAQ-router-link-container .FAQ-btn{
     margin-bottom: 15px;
     font-family: 'Noto Sans KR', sans-serif;
     width: 250px;
     height: 77px;
     font-size: 1.1rem;
     background-color: #EEEEEE;
     border: none;
     border-left: 1px solid #cac6c6;
     
   }
   #FAQ-container .FAQ-router-link-container .FAQ-btn:hover{
     background-color: #0AAC00;
     color:#ffff;
   }
    #FAQ-container .FAQ-router-link-container #left{
      border-left: none;
      
    }
    #FAQ-detail-container{
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 400;
      max-width: 1000px;
      margin-right: auto;
      margin-left: auto;
      text-align: left;
    }
    #FAQ-detail-container .title{
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      margin-top: 45px;
    }
   #FAQ-detail-container .detail{
     background: #EEEEEE 0% 0% no-repeat padding-box;
     border-radius: 15px;
     padding: 24px 47px;
   }
   #FAQ-container .FAQ-router-link-container a.router-link-exact-active {
  color: #76917a;
}

 
</style>