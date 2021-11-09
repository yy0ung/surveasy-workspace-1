<template>
  <div class="SurveyInfo">
    <div class="SurveyInfo-container">
      <div class="survey-info">
        <ul id="info-title">설문 정보</ul>

          <ul id="info-detail">
            <ul class="info-detail-text">설문 제목</ul>
            <div class="info-detail-input"><input type="text" v-model="title" @change="setOption2()"  placeholder="예) 쓰레기 분리수거에 대한 대학생 인식조사 (최대 20자)" required></div>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 대상</ul>
            <div class="info-detail-input"><input type="text" v-model="target" @change="setOption2()" placeholder="예) 20대 여성, 1인 가구" required></div>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 기관</ul>
            <div class="info-detail-input"><input type="text" v-model="institute" @change="setOption2()" placeholder="예) OO학교 ㅁㅁ수업, @@학회, **기업" required></div>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 링크</ul>
            <div class="info-detail-input"><input type="text" v-model="link" @change="setOption2()" placeholder="링크가 잘 작동하는지 꼭 확인해주세요." required><button class="link-check-btn" @click="showLinkModal()">링크 확인</button></div>
          </ul>
          <span></span>
            <LinkCheckModal :showLinkIframe="showLinkIframe" @closeIframe="showLinkModal" />
          <ul id="info-detail">
            <ul class="info-detail-text">설문 참여시 유의사항 (선택)</ul>
            <div class="info-detail-input"><input type="text" v-model="notice" @change="setOption2()" placeholder="예) PC참여 권장, 외부 링크 이동 필요"></div>
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
      this.$store.commit('setSurveyMutation2', {title: this.title, institute: this.institute, 
        target: this.target, link: this.link, notice: this.notice });

        console.log(this.$store.state.localSurveyState)
    }
  },



}
</script>

<style>
.SurveyInfo {
  width: 900px;
  height: 620px;
  margin: 25px 0 100px 110px;
  background-color: #EEEEEE;
  border-radius: 12px;
}
.SurveyInfo-container {
  width: 1300px;
  padding: 25px;
  z-index: 1;
}
.survey-info {
    text-align: left;
}
.SurveyInfo-container #info-title {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  margin: 7px 0 38px 0;
  font-size: 19px;
  font-weight: bold;
}
.survey-info .info-detail {
    display: flex;
    flex-direction: column;
    
}
#info-detail ul {
  display: inline-block;
}
.survey-info .info-detail-text {
  width: 300px;
  padding: 0;
  margin: 0 0 5px 6px;
  color: black;
  text-align: left;
  font-size: 14px;
  
}
.survey-info input {
  font-family: 'Noto Sans KR';
  background-color: #EEEEEE;
  width: 630px;
  height: 10px;
  margin-bottom: 10px;
  border: 1px solid rgb(187, 187, 187);
  padding: 15px;
  font-size: 14px;
  font-weight: lighter;
  
}
.survey-info input::placeholder {
  color: rgb(187, 187, 187);
  
}
.link-check-btn {
  background-color: #EEEEEE;
  border: 1px solid #0CAE02;
  width: 90px;
  height: 40px;
  margin-left: 20px;
  color: #0CAE02;
  font-weight: 800;
  border-radius: 30px;
  cursor: pointer;   
}
</style>