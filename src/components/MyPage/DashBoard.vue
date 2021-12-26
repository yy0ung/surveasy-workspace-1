<template>
<div id="dashboard-container">
  <div class="top">
  <div class="top-left">
    <div class="first-box">
      <p class="black-title">진행 중인 설문</p>
      <p class="green-bold">1개</p>
    </div>
    <div class="first-box">
      <p class="black-title">완료된 설문</p>
      <p class="green-bold">3개</p>
    </div>
  </div>
  <div class="top-right">
    <div class="third-box">
      <p class="black-title">쿠폰 / 적립금</p>
      <p class="green-box">쿠폰 {{ this.$store.state.myCoupon.length }}개</p>
      <p class="green-box">적립금 300원</p>
    </div>
  </div>
    
  </div>
  <div class="bottom">
    <div class="bottom-title">
      <p class="black-title">나의 설문</p>
      <p class="gray-title1">결제 금액</p>
      <p class="gray-title2">주문 상세</p>
    </div>
    <div class="bottom-list">
      <p class="list-detail">
        <span id="sur-date">날짜</span>
        <span id="sur-title">설문 제목</span>
        <span id="sur-pay">결제 금액</span>
        <span id="sur-detail">주문 상세</span>
      </p>
      <p class="list-detail">
        <span id="sur-date">날짜</span>
        <span id="sur-title">설문 제목</span>
        <span id="sur-pay">결제 금액</span>
        <span id="sur-detail">주문 상세</span>
      </p>
    </div>
  </div>
  <p class="more">더보기 ></p>
</div>
</template>

<script>
export default {

}
</script>

<style>
#dashboard-container{
  font-family: 'Noto Sans KR', sans-serif;
}
.top{
  display: flex;
  justify-content: center;
}
.top-left{
  margin-right: 20px;
}
.top .first-box{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #0000000D;
  border-radius: 15px;
  opacity: 1;
  width: 310px;
  height: 150px;
  padding-top: 10px;
  padding-left: 30px;
  margin-bottom: 15px;
}
.top .third-box{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #0000000D;
  border-radius: 15px;
  opacity: 1;
  width: 310px;
  height: 324px;
  padding-top: 10px;
  padding-left: 30px;
  
}
.green-bold{
  margin-left: 110px;
  margin-top: 15px;
  font-size: 2.5rem;
  color: #0AAC00;
  font-weight: 700;
}
.black-title{
  margin-bottom: 0;
}
.top-right .black-title{
  margin-bottom: 25px;;
}
.green-box{
  margin-left: 0;
  background: #0AAC00 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #02AF2F80;
  border-radius: 15px;
  text-align: center;
  opacity: 1;
  width: 280px;
  padding-top: 42px;
  padding-bottom: 42px;
  margin-bottom: 20px;
  color: white;
}
.bottom{
  width: 700px;
  margin: auto;
}
.bottom-title{
  display: flex;
  color: #848484;
  font-size: 0.9rem;
  margin-top: 4px;
}
.bottom-title .black-title{
  color: black;
  font-size: 1rem;
  margin-top: 12px;
}
.list-detail{
  display: flex;
  justify-content: space-between;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #0000000D;
  border-radius: 15px;
  opacity: 1;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 0.9rem;
}
#sur-title{
  margin-right: 100px;
  color: #0AAC00;
}
#sur-date{
  margin-right: -30px;
  margin-left: 30px;
}
#sur-pay{
  margin-left: 40px;
}
#sur-detail{
  text-decoration: underline;
  margin-right: 30px;
}
.gray-title1{
  margin-left: 380px;
}
.gray-title2{
  margin-left: 112px;
}
.more{
  color: #848484;
  margin-top: 50px;
  margin-left: 680px;  
  font-size: 0.9rem;
}
</style>