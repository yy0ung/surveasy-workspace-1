<template>
<div class="shadow rounded bg-white p-4 mt-4">
      <h3>설문 정보</h3><hr>
        <div class="row">
          <div class="form-group">
            <div class="info-detail-text">설문 제목</div>
            <input class="form-control shadow-none" type="text" v-model="title" @change="setOption2()"  placeholder="예) 쓰레기 분리수거에 대한 대학생 인식조사 (40자 이내 권장)" required>
            <div class="mb-4"></div>
            <div class="info-detail-text">설문 대상</div>
            <div class="showOption-target">
              {{ this.$store.state.targetingTable[0][this.$store.state.localSurveyState.targetingAgeOption] }} 
              , {{ this.$store.state.targetingTable[1][this.$store.state.localSurveyState.targetingGender] }}
            </div>
            <div class="showOption-target" v-if="this.$store.state.localSurveyState.targetingAgeOption==2">
              <div id="showOption-target-age-item" v-for="item in (this.$store.state.localSurveyState.targetingAgeOptionList)" :key="item">{{item}}</div>
            </div>
            <div class="mb-4"></div>
            <div class="info-detail-text">설문 대상 상세 정보 (선택)</div>
            <input class="form-control shadow-none" type="text" v-model="target" @change="setOption2()" placeholder="예) 재학생, 1인가구, 특정 서비스 이용 경험이 있는 분" required>
            <div class="info-detail-notice">*서베이지 패널은 20대 위주로 구성되어 있으며, 특정 상세 설문 대상의 경우,<br> 해당되는 패널이 적어 설문 응답 수집에 어려움이 있을 수 있다는 점 유의해주시기 바랍니다.</div>
            <div class="mb-4"></div>
            <div class="info-detail-text">설문 기관</div>
          <input class="form-control shadow-none" type="text" v-model="institute" @change="setOption2()" placeholder="예) OO학교 ㅁㅁ수업, @@학회, **기업" required>
          <div class="mb-4"></div> 
          <div class="info-detail-text">설문 링크</div>
          <input class="form-control shadow-none" type="text" v-model="link" @change="setOption2()" placeholder="링크 입력 시, 단축 url이 아니며 'https://'를 포함한 주소를 입력해주세요." required><a class="btn-outline-primary" :href="link" target="_blank">링크 확인</a>
            <LinkCheckModal :showLinkIframe="showLinkIframe" @closeIframe="showLinkModal" />
            <div class="mb-4"></div> 
            <div class="info-detail-text">설문 참여시 유의사항 (선택)</div>
          <input class="form-control shadow-none" type="text" v-model="notice" @change="setOption2()" placeholder="예) PC참여 권장, 외부 링크 이동 필요">
          </div>
      </div>
    </div>
</template>

<script>
import LinkCheckModal from './LinkCheckModal.vue'
export default {
  mounted() {
    // for(var i=0 ; i<this.$store.state.localSurveyState.targetingAgeOptionList.length ; i++) {
    //   console.log(this.$store.state.localSurveyState.targetingAgeOptionList[i])
    // }
    // console.log(this.$store.state.localSurveyState.targetingAgeList)
  },

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
  .showOption-target{
    display: flex;
    flex-direction: row;
    color:#0AAB00;
  }
  #showOption-target-age-item {
    color: #ffffff;
    background: #0AAB00;
    border-radius: 7px;
    margin-top: 5px;
    margin-right: 8px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 0.85rem;
  }
  .info-detail-notice{
    margin-top: 5px;
    font-size: 0.8em;
  }
</style>