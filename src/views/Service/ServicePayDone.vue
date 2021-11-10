<template>
  <div class="ServicePayDone">
    <img id="check-img" src='@/assets/check.png' width="182">
    <div class="paydone-title">주문 완료되었습니다!</div>
    <div class="paydone-detail">
      설문은 빠른 검수 후 패널들에게 전달됩니다. <br>
      설문조사의 진행 상황은 마이 페이지에서 확인하실 수 있습니다. <br>
      문의 사항은 카카오채널 @surveasy로 보내주세요.
    </div>
    <router-link to="/mypage"><button class="goMyPage-btn">마이 페이지 가기</button></router-link>
  </div>

   
</template>

<script>
export default {
  
}
</script>

<style>
.ServicePayDone {
  height: 600px;
  padding: 110px;
}
.paydone-title {
  font-family: 'Noto Sans KR';
  font-size: 25px;
  font-weight: bold;
  margin: 30px 0 40px 0;
  color: #000000;
}
.paydone-detail {
  font-family: 'Noto Sans KR';
  font-size: 17px;
  font-weight: lighter;
  margin: 20px;
  line-height: 28px;
  color: #000000;
}
.goMyPage-btn {
  width: 181px;
  height: 47px;
  margin: 50px;
  border: 1px solid #11AC04;
  border-radius: 24px;
  opacity: 1;
  background-color: white;
  color: #11AC04;
  font-family: 'Noto Sans KR';
  font-size: 19px;
  font-weight: normal;
}
</style>