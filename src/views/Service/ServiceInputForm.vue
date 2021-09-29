<template>
  <div class="serviceInputForm-container">
      <div class="serviceInputForm-container-option">
          <h3>옵션 정보</h3>
          <div class="option-info">
              <ul>요구 응답 수</ul>
              <ul>소요 시간</ul>
              <ul>마감 기한 지정</ul>
          </div>
      </div>
      <div class="serviceInputForm-container-survey">
          <h3>설문 정보</h3>
          <form class="survey-info">
              <ul class="input">
                  <input type="text" id="survey-title" placeholder="설문 제목을 입력해주세요." required>
              </ul>
              <ul class="input">
                  <input type="text" id="survey-keyword" placeholder="설문 주제 키워드를 입력해주세요." required>
              </ul>
              <ul class="input">
                  <input type="text" id="survey-institution" placeholder="소속된 직장/학교를 입력해주세요." required>
              </ul>
              <ul class="input">
                  <input type="text" id="survey-link" placeholder="설문 링크를 입력해주세요." required>
              </ul>
            </form>
            <div><button class="goServicePayDone-btn">결제하기</button></div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.serviceInputForm-container {
    margin: 35px;
    border-radius: 10px;
    background-color: rgb(209, 209, 209);
    display: flex;
    flex-direction: row;
}
.serviceInputForm-container-option {
    width: 30%;
    margin-top: 15px;
}
.option-info ul {
    text-align: left;
    font-size: 10px;
}
.serviceInputForm-container-survey {
    width: 100%;
    margin-top: 15px;
}
.survey-info input {
    width: 500px;
    border: none;
    margin: 7px;
    padding: 3px;
    font-size: 7px;
}
.goServicePayDone-btn {
  width: 70px;
  height: 30px;
  margin: 40px;
  color:#0CAE02;
  background-color: rgb(209, 209, 209);
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 10px;
  cursor: pointer;
}
</style>