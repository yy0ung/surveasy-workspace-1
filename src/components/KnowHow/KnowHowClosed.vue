<template>
  <div class="knowhow-closed-container">
    <div class="knowhow-closed-notice">
      <div><img class="knowhow-checkimg" src="@/assets/check.png" width="130"></div>
      <div class="knowhow-green">설문 노하우 페이지 준비중입니다.</div>
      <div class="knowhow-black">서베이지의 다양한 설문 노하우를 기대해주세요!</div>
      <div class="knowhow-email-text">설문 노하우 서비스 출시 후 소식을 받아보고 싶으신가요? <br> 하단에 이메일 주소를 남겨주세요.</div>
      <div><input class="knowhow-email-input" placeholder="이메일 주소를 입력해주세요"><button class=" knowhow-email-btn">소식 받기 신청</button></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.knowhow-closed-container {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 85px;
  background-color: rgba(255, 255, 255, 0.755);
  display: table;
  transition: opacity .3s ease;
}
.knowhow-closed-notice {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 630px;
  height: 450px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  box-shadow: 0px 0px 20px #00000026;
  font-family: 'Noto Sans KR', sans-serif;
}
.knowhow-checkimg {
  margin-top: 50px;
  margin-bottom: 20px;
}
.knowhow-green {
  color: #0AAB00;
  font-size: 25px;
  margin-bottom: 10px;
}
.knowhow-black {
  font-size: 16px;
}
.knowhow-email-text {
  color: #bbbbbb;
  font-size: 15px;
  margin-top: 20px;
  font-weight: lighter;
}
.knowhow-email-input {
  margin: 10px;
  width: 200px;
  height: 30px;
  font-size: 13px;
  padding-left: 8px;
  border: 1px solid #0AAB00;

}
.knowhow-email-btn {
  width: 120px;
  height: 30px;
  color: #0AAB00;
  background-color: white;
  border: 1px solid #0AAB00;
  border-radius: 15px;
  cursor: pointer;
}
</style>