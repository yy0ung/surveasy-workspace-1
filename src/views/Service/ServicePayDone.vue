<template>
  <div class="ServicePayDone">
    <img id="check-img" src='@/assets/check.png' width="182">
    <div class="paydone-title">주문 완료되었습니다!</div>
    <div class="paydone-green">
      설문은 입금 확인과 빠른 검수 후 패널들에게 전달됩니다.
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
  height: 900px;
  padding: 110px;
  text-align: center;
}
.paydone-title {
  font-family: 'Noto Sans KR';
  font-size: 25px;
  font-weight: bold;
  margin: 30px 0 20px 0;
  color: #000000;
}
.paydone-green {
  font-family: 'Noto Sans KR';
  font-size: 17px;
  font-weight: normal;
  margin: 10px;
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
.goMyPage-btn {
  width: 181px;
  height: 47px;
  margin: 50px;
  border: 1px solid #0CAE02;
  border-radius: 24px;
  opacity: 1;
  background-color: white;
  color: #0CAE02;
  font-family: 'Noto Sans KR';
  font-size: 19px;
  font-weight: lighter;
  cursor: pointer;
}
</style>