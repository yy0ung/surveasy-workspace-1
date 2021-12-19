<template>
  <div class="ServicePayDone">
    <img id="check-img" src='@/assets/check.png' width="182">
    <div class="paydone-title">주문 완료되었습니다!</div>

    <div class="paydone-detail">
      <p class="detail">설문은 입금 확인과 빠른 검수 후 패널들에게 전달됩니다.</p>

      <div class="table">
        <div class="line" >
          <p id="first">결제정보</p>
        </div>
        <div class="line">
          <p class="line-title" >총 결제금액</p>
          <p class="line-detail" id="green">{{ this.$store.state.localSurveyState.price }}원</p>
        </div>
        <div class="line">
          <p class="line-title">입금자</p>
          <p class="line-detail">{{ this.$store.state.localSurveyState.account_userName }}</p>
        </div>
        <div class="line">
          <p class="line-title">계좌번호</p>
          <p class="line-detail">카카오뱅크 3333-17-5341775 (장서준)</p>
        </div>
      </div>
      <p class="end-detail">설문조사의 진행 상황은 마이 페이지에서 확인하실 수 있습니다. <br>
        문의 사항은 카카오채널 @surveasy로 보내주세요.</p>
    </div>
    <div class="paydone-contentsbox">
      <ul id="paydone-subtitle">결제 정보</ul>
      <ul class="paydone-detail">
        <div id="paydone-detail-text">총 결제 금액</div> 
        <div id="paydone-detail-value-green">{{ this.$store.state.localSurveyState.price }} 원</div>
      </ul>
      <ul class="paydone-detail">
        <div id="paydone-detail-text">입금자</div> 
        <div id="paydone-detail-value">{{ this.$store.state.localSurveyState.account_userName }}</div>
      </ul>
      <ul class="paydone-detail">
        <div id="paydone-detail-text">계좌번호</div> 
        <div id="paydone-detail-value">카카오뱅크 3333-17-5341775 (장서준)</div>
      </ul>
    </div>
    <div class="paydone-notice">설문조사의 진행 상황은 마이 페이지에서 확인하실 수 있습니다.</div>
    <div class="paydone-notice">문의 사항은 카카오채널 @surveasy로 보내주세요.</div>
    <br>
    <router-link to="/mypage"><button class="goMyPage-btn">마이 페이지 가기</button></router-link>
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
.ServicePayDone {
  font-family: 'Noto Sans KR';
  height: 900px;
  padding: 110px;
  
}
.table{
  display: inline-block;
  background-color: #EEEEEE;
  border-radius: 15px;
  padding: 40px 50px;
}
.table .line{
   display: flex;
   justify-content: space-between;
  
}
.line .line-title{
  margin-right: 90px;
  font-weight: 500;
}
.line #first{
  font-weight: bold;
  font-size: 1.1rem;
}
.line #green{
  color: #0AAB00;
}
.line p{
  font-weight: 500;
}
.line .iine-detail{
  margin-left: 20px;
  font-weight: 500;
}
.paydone-title {
  font-family: 'Noto Sans KR';
  font-size: 25px;
  font-weight: bold;

  margin: 30px 0 30px 0;

  color: #000000;
}
.paydone-green {
  font-family: 'Noto Sans KR';
  font-size: 17px;

  font-weight: lighter;

  line-height: 28px;
  color: #0CAE02;
}
.paydone-contentsbox {
  display: inline-block;
  width: 506px;
  height: 296px;
  margin: 30px;
  background: #EEEEEE 0% 0% no-repeat padding-box;
  border-radius: 15px;
}
#paydone-subtitle {
  font-size: 20px;
  margin-top: 53px;
  margin-bottom: 30px;
}
.paydone-detail {
  display: flex;
  flex-direction: row;
}
.paydone-contentsbox ul {
  display: flex;
  justify-content: space-between;
  font-family: 'Noto Sans KR';
  text-align: left;
  color: black;
  font-size: 17px;
  margin-bottom: 30px;
  padding-left: 45px;
}
#paydone-detail-value {
  display: inline-block;
  text-align: right;
}
#paydone-detail-value-green {
  font-family: 'Noto Sans KR';
  color: #0CAE02;
  font-weight: bold;
  margin-right: 55px;
}
#paydone-detail-value {
  font-family: 'Noto Sans KR';
  font-weight: normal;
  margin-right: 55px;
}
.paydone-notice {
  font-family: 'Noto Sans KR';
  font-size: 17px;
  color: #000000;
  margin-top: 10px;
}
.detail{
  font-weight: 400;
  color:#0AAB00;
  margin-bottom: 40px;
}
.goMyPage-btn {
  padding: 10px 30px;
  margin: 50px;

  border: 1px solid #0AAB00;
  border-radius: 24px;
  opacity: 1;
  background-color: white;
  color: #0AAB00;
  font-family: 'Noto Sans KR';
  font-size: 1.2rem;
  font-weight: normal;

}
.goMyPage-btn:hover{
  background-color: #0AAB00;
  color:white;
}
.end-detail{
  font-weight: 400;
  margin-top: 60px;
}
</style>