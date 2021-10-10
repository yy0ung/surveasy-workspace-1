<template>
  <div class="serviceInputForm-container">

      <div class="serviceInputForm-container-option">
            <ul id="info-title">옵션 정보</ul>
            <div class="option">
                <ul id="showOption-title">요구 응답 수</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.requiredheadcount }}</ul>
            </div>
            <div class="option">
                <ul id="showOption-title">소요 시간</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.spendtime }}</ul>
            </div>
            <div class="option">
                <ul id="showOption-title">마감 기한 지정</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.duetime }}</ul>
            </div>
            <div class="option">
                <ul id="showOption-title">할인 대상 여부</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.discount }}</ul>
                <ul>{{ this.$store.state.localSurveyState.title }}</ul>
                <ul>{{ this.$store.state.localSurveyState.keyword }}</ul>
                <ul>{{ this.$store.state.localSurveyState.institute }}</ul>
                <ul>{{ this.$store.state.localSurveyState.link }}</ul>
            </div>              
      </div>

        <div class="serviceInputForm-container-survey">
            <div class="survey-info">
                <ul id="info-title">설문 정보</ul>
                <ul class="input"><input type="text" v-model="title" placeholder="설문 제목을 입력해주세요." required></ul>
                <ul class="input"><input type="text" v-model="keyword" placeholder="설문 주제 키워드를 입력해주세요." required></ul>
                <ul class="input"><input type="text" v-model="institute" placeholder="소속된 직장/학교를 입력해주세요." required></ul>
                <ul class="input"><input type="text" v-model="link" placeholder="설문 링크를 입력해주세요." required></ul>
            </div>
            <div class="show-price-container2">
                <span class="service-option-totalprice-word">총 금액</span>
                <span class="service-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;{{ this.$store.state.localSurveyState.price }}원</span>
            </div>
            <button class="goServicePayDone-btn" @click="getInputForm()">결제하기</button>
        </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            title: '',
            keyword: [],
            institute: '',
            link: ''
        }
    },
    methods: {
        getInputForm() {
            this.$store.commit('setSurveyMutation2', {title: this.title, keyword: this.keyword, institute: this.institute, link: this.link});
        }
    },
  
  
}
</script>

<style>
.serviceInputForm-container {
    margin: 80px;
    padding: 70px;
    border-radius: 10px;
    background-color: rgb(231, 231, 231);
    display: flex;
    flex-direction: row;
}
.serviceInputForm-container-option {
    width: 40%;
    margin-left: 50px;
}
.serviceInputForm-container-option ul {
    text-align: left;
    font-size: 13px;
    margin: 0;
}
#info-title {
    margin: 50px 0 50px 0;
    font-size: 30px;
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


.serviceInputForm-container-survey {
    width: 100%;
}
.survey-info {
    text-align: left;
}
.survey-info input {
    width: 900px;
    border: none;
    margin: 7px;
    padding: 5px;
    font-size: 18px;

}
.show-price-container2 {
    width: 950px;
    margin-top: 30px;
    text-align: right;
    color:#0CAE02;
}
.goServicePayDone-btn {
    float: right;
    width: 100px;
    height: 30px;
    margin: 20px 190px 20px 0;
    color:#0CAE02;
    background-color: rgb(231, 231, 231);
    border: 1.5px solid #0CAE02;
    border-radius: 30px;
    font-size: 15px;
    cursor: pointer;
}
</style>