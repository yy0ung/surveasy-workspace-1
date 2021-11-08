<template>
  <div class="SurveyInfo">
    <div class="serviceInputForm-container-survey">
      <div class="survey-info">
        <ul id="info-title">설문 정보</ul>         

          <ul id="info-detail">
            <ul class="info-detail-text">설문 제목</ul>
            <ul class="info-detail-input"><input type="text" v-model="title" placeholder="예) 쓰레기 분리수거에 대한 대학생 인식조사(최대 20자)" required></ul>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 대상</ul>
            <ul class="info-detail-input"><input type="text" v-model="target" placeholder="예) 20대 여성, 1인 가구" required></ul>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 기관</ul>
            <ul class="info-detail-input"><input type="text" v-model="institute" placeholder="예) OO학교 ㅁㅁ수업, @@학회, **기업" required></ul>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 링크</ul>
            <ul class="info-detail-input"><input type="text" v-model="link" placeholder="링크가 잘 작동하는지 꼭 확인해주세요." required></ul>
          </ul>
          <ul><button class="link-check-btn" @click="showLinkModal()">링크 확인</button></ul>
            <LinkCheckModal :showLinkIframe="showLinkIframe" @closeIframe="showLinkModal()" />
          <ul id="info-detail">
            <ul class="info-detail-text">설문 참여시 유의사항 (선택)</ul>
            <ul class="info-detail-input"><input type="text" v-model="notice" placeholder="예) PC참여 권장, 외부 링크 이동 필요"></ul>
          </ul>              
      </div>
    </div>

  </div>
</template>

<script>
import LinkCheckModal from './LinkCheckModal.vue'
export default {
  data() {
        return {
            title: '',
            target: '',
            institute: '',
            link: '',
            notice:'',

            showLinkIframe: false,
        }
  },

  components: { LinkCheckModal },

  methods: {
    showLinkModal() {
      this.showLinkIframe = !this.showLinkIframe
      this.$store.state.checklink = this.link
    },

    setOption2() {
      this.$store.commit('setSurveyMutation2', {title: this.title, target: this.target, institute: this.institute, link: this.link, notice: this.notice});
    }
  }

}
</script>

<style>
.SurveyInfo {
  width: 920px;
  height: 600px;
  margin: 30px 5px 100px 100px;
  background-color: #EEEEEE;
  border-radius: 12px;
}
.serviceInputForm-container-survey {
    width: 2000px;
    z-index: 1;
}
.survey-info {
    text-align: left;
}
.survey-info .info-detail {
    display: flex;
    flex-direction: column;
}
#info-detail ul {
    display: inline-block;
}
.survey-info .info-detail-text {
    width: 140px;
    padding: 0;
    text-align: left;
    font-weight: bold;
}
.survey-info input {
    width: 650px;
    border: none;
    margin: 7px;
    padding: 5px;
    font-size: 18px;
}
.link-check-btn {
    background-color: #0CAE02;
    border: #0CAE02;
    height: 30px;
    color: white;
    border-radius: 10px;
    margin-left: 750px;
    cursor: pointer;   
}
</style>