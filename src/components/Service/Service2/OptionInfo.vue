<template>
      <div class="pt-1">
        <div class="shadow rounded bg-white p-4">
        <div class="row">
          <div class="col-12"><h3>옵션 정보</h3><hr></div>
        <div class="col-4">
          <p class="form-title">요구 응답 수</p>
          <p class="showOption-value">{{ this.$store.state.localSurveyState.requiredHeadCount }}</p>
        </div>
        <div class="col-4">
          <p class="form-title">소요 시간</p>
          <p class="showOption-value">{{ this.$store.state.localSurveyState.spendTime }}</p>
        </div>
        <div class="col-4">
          <p class="form-title">마감 기한 지정</p>
        <p class="showOption-value">{{ this.$store.state.localSurveyState.dueDate }}    {{ this.$store.state.localSurveyState.dueTimeTime }}</p>
        </div>
        <div class="col-4">
          <p class="form-title">영어 설문 여부</p>
          <p class="showOption-value">{{ this.$store.state.localSurveyState.ENTarget }}</p>
        </div>
        <div class="col-4">
          <p class="form-title">대학생 및 대학원생 할인</p>
          <p class="showOption-value">{{ this.$store.state.localSurveyState.identity }}</p>
        </div>
      </div> 
          </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>
.showOption-value {
  color:#0CAE02;
}
</style>