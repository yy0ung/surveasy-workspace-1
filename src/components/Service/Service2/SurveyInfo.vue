<template>
  <div class="SurveyInfo">
    <div class="SurveyInfo-container">
      <div class="survey-info">
        <ul id="info-title">설문 정보</ul>

          <ul id="info-detail">
            <ul class="info-detail-text">설문 제목</ul>
            <div class="info-detail-input"><input type="text" v-model="title" @change="setOption2()"  placeholder="예) 쓰레기 분리수거에 대한 대학생 인식조사 (40자 이내 권장)" required></div>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 대상</ul>
            <div class="info-detail-input"><input type="text" v-model="target" @change="setOption2()" placeholder="예) 20대 여성, 1인 가구" required></div>
            <div class="info-detail-notice">*현재 서베이지의 패널은 20대이며, 성별/나이/학년 수준의 타깃팅만 가능합니다.</div>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 기관</ul>
            <div class="info-detail-input"><input type="text" v-model="institute" @change="setOption2()" placeholder="예) OO학교 ㅁㅁ수업, @@학회, **기업" required></div>
          </ul>
          <ul id="info-detail">
            <ul class="info-detail-text">설문 링크</ul>
            <div class="info-detail-input"><input type="text" v-model="link" @change="setOption2()" placeholder="링크 입력 시, 단축 url이 아니며 'https://'를 포함한 주소를 입력해주세요." required><a class="link-check-btn" :href="link" target="_blank">링크 확인</a></div>
            
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

        // console.log(this.$store.state.localSurveyState)
    }
  },



}
</script>

<style>
.SurveyInfo {
  background: #EEEEEE 0% 0% no-repeat padding-box;
  margin-top: 20px;
  border-radius: 15px;
  opacity: 1;
  font-family: 'Noto Sans KR', sans-serif;
}
.SurveyInfo-container {
  width: 1123px;
  padding: 30px;
  padding-top: 40px;
  z-index: 1;
  font-family: 'Noto Sans KR', sans-serif;
}
.survey-info {
  text-align: left;
}
.SurveyInfo-container #info-title {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 25px 0 30px 0;
  
}
.survey-info input:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
}
.survey-info .info-detail {
    display: flex;
    flex-direction: column;
    
}
#info-detail ul {
  display: inline-block;
}
.survey-info .info-detail-text {
  padding-left: 10px;
  width: 200px;
  height: 25px;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: left;
  font-family: 'Noto Sans KR';
  font-size: 17px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.survey-info input {
  border-radius: 9px;
  width: 680px;
  height: 40px;
  margin-left: 10px;
  padding-left: 15px;
  border: 0.75px solid #BCBCBC;
  opacity: 1;
  background-color: #EEEEEE;
  font-size: 17px;
  color: grey;
}
.survey-info input::placeholder {
  width: 600px;
  height: 25px;
  text-align: left;
  font-family: 'Noto Sans KR';
  font-size: 15px;
  letter-spacing: 0px;
  color: #BCBCBC;
  opacity: 1;
}
.info-detail-notice {
  font-family: 'Noto Sans KR', sans-serif;
  color: #848484;
  font-size: 0.85rem;
  padding-top: 5px;
  padding-left: 15px;
}
.point-notice {
  font-family: 'Noto Sans KR', sans-serif;
  color: #848484;
  font-size: 0.9rem;
  padding-top: 5px;
  padding-left: 15px;
}
.link-check-btn {
  background-color: #EEEEEE;
  border: 1px solid #0CAE02;
  padding: 7px 15px;
  font-family: 'Noto Sans KR', sans-serif;
  margin-left: 20px;
  color: #0CAE02;
  font-size: 15px;
  font-weight: 800;
  border-radius: 26px;
  cursor: pointer;   
  font-weight: 400;
}
.link-check-btn:hover{
  color: white;
  background: #0AAB00;
}
</style>