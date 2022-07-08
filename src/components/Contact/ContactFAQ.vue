<template>
<div id="FAQ-container">
  <div class="FAQ-router-link-container">
    <div class="FAQ-router-link"><button @click="button(0)" class="FAQ-btn" id="left" :class="{active:this.$store.state.FAQbutton==0}">설문 응답 서비스</button></div>
    <div class="FAQ-router-link"><button @click="button(1)" class="FAQ-btn" :class="{active:this.$store.state.FAQbutton==1}">설문 템플릿</button></div>
    <div class="FAQ-router-link"><button @click="button(2)" class="FAQ-btn" :class="{active:this.$store.state.FAQbutton==2}">회원 정보</button></div>
    <div class="FAQ-router-link"><button @click="button(3)" class="FAQ-btn" :class="{active:this.$store.state.FAQbutton==3}">결제 / 환불</button></div>
  </div>
  
</div>
</template>

<script>

export default {
  methods:{
    button(num){
      this.$store.state.FAQbutton=num
    }
  }
 
}
</script>

<style>
  #FAQ-container{
    margin-top: 80px;
    max-width: 1190px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 30px;
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
   #FAQ-container .FAQ-router-link-container .FAQ-btn.active {
    background-color: #0AAC00;
     color:#ffff;
}

 
</style>