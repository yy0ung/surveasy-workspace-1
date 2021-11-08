<template>
  <div class="OptionInfo">
    <div class="serviceInputForm-container-option">
      <ul id="info-title">옵션 정보</ul>
        <div class="option">
          <ul id="showOption-title">요구 응답 수</ul>
          <ul id="showOption-value">{{ this.$store.state.localSurveyState.requiredHeadCount }}</ul>
        </div>
        <div class="option">
          <ul id="showOption-title">소요 시간</ul>
          <ul id="showOption-value">{{ this.$store.state.localSurveyState.spendTime }}</ul>
        </div>
        <div class="option">
          <ul id="showOption-title">마감 기한 지정</ul>
          <ul id="showOption-value">{{ this.$store.state.localSurveyState.dueTime }}</ul>
        </div>
        <div class="option">
          <ul id="showOption-title">영어 설문 여부</ul>
          <ul id="showOption-value">{{ this.$store.state.localSurveyState.ENTarget }}</ul>
        </div>
        <div class="option">
          <ul id="showOption-title">할인 대상 여부</ul>
          <ul id="showOption-value">{{ this.$store.state.localSurveyState.identity }}</ul>
        </div>            
    </div>
  </div>  
</template>

<script>
export default {

}
</script>

<style>
.OptionInfo {
  width: 920px;
  height: 400px;
  margin: 70px 5px 5px 100px;
  background-color: #EEEEEE;
  border-radius: 12px;
}
.serviceInputForm-container-option {
    width: 1300px;
    z-index: 1;
}
.serviceInputForm-container-option ul {
    text-align: left;
    font-size: 13px;
    margin: 0;
}
#info-title {
    margin: 0px 0 50px 0;
    font-size: 25px;
    font-weight: bold;
}
.option {
    margin-bottom: 20px;
}
.serviceInputForm-container-option #showOption-title {
    color: grey;
}
.serviceInputForm-container-option #showOption-value {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
}
</style>