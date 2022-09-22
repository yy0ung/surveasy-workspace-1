<template>
   <div class="container">
		<div class="row justify-content-center align-items-center">
			    <div class="shadow rounded p-3 bg-white">
            <h3 class="service-title m-3">설문 응답 서비스</h3>
			        <div class="row">
                  <div class="row form-group">
                    <div class="col-6">
                            <p class="form-title m-1">요구 응답수</p>
                            <select class="form-select m-1" v-model="priceRequireHeadCount" aria-label="Default select example">
                              <option :value=0 selected disabled hidden>요구 응답수</option>
                              <option :value=1>30명</option>
                              <option :value=2>40명</option>
                              <option :value=3>50명</option>
                              <option :value=4>60명</option>
                              <option :value=5>70명</option>
                              <option :value=6>80명 (최대 응답수)</option>
                            </select>
                            </div>

                            <div class="col-6">
                            <p class="form-title m-1">소요 시간</p>
                            <select class="form-select m-1" v-model="priceSpendTime">
                              <option :value=0 selected disabled hidden>소요 시간</option>
                              <option :value=1>1-3분</option>
                              <option :value=2>4-6분</option>
                              <option :value=3>7-10분</option>
                              <option :value=4>11-15분</option>
                              <option :value=5>16-20분</option>
                            </select>
                            </div>
        </div>
          <div class="form-group row">
            <p class="form-title m-1">마감시간 지정</p>
            <div class="col-6">
              <input type="Date" class="form-select m-1" :min="getDateStr_min" :max="getDateStr_max" v-model="aa" required> 
            </div>
            <div class="col-6">
            <input type="time" class="form-select m-1" v-model="bb" required>
            </div>
            <p class="warn m-2">*마감날짜와 마감시간 중 공란이 존재할 경우 설문 게시가 어려울 수 있습니다.</p>
            </div>
          <!-- 설문 대상 타겟팅 관련 -->
          <div class="form-group row">
            <p class="form-title m-1">설문 대상</p>
              <div class="col-6">
              <select class="form-select m-1" id="target_age" v-model="targetAgeOption">
              <option :value=0 selected disabled hidden>대상 연령</option>
              <option :value=1>전 연령</option>
              <option :value=2>20대</option>
              <option :value=3>20세 이상 24세 이하</option>
              <option :value=4>25세 이상 29세 이하</option>
              <option :value=5>20세 이상 39세 이하</option>
              <option :value=6>20세 이상 49세 이하</option>
            </select>
            </div>
            <div class="col-6">
            <select class="form-select m-1" id="target_gender" v-model="targetGenderOption">
              <option :value=0 selected disabled hidden>대상 성별</option>
              <option :value=1>성별 무관</option>
              <option :value=2>남성</option>
              <option :value=3>여성</option>
            </select>
            </div>
            <p class="warn m-2">*다음 주문 페이지에서 설문 대상 상세정보를 기입할 수 있습니다.</p>   
          </div>
          <div class="row">
            <div class="col-6">
            <p class="form-title m-1">대학생 / 대학원생 할인 여부</p>
            <select class="form-select m-1" v-model="priceIdentity">
            <option :value=0 selected disabled hidden>대학생 / 대학원생 할인 여부</option>
            <option :value=1>대학생입니다.</option>
            <option :value=2>대학원생입니다.</option>
            <option :value=3>할인대상이 아닙니다.</option>
            </select>
            </div>
            <div class="col-6">
            <p class="form-title m-1">영어설문</p>
            <div class="form-check m-2"> 
              <input class="form-check-input" v-model="addENTarget" @click="EngOptionCal" type="checkbox" name="Eng" id="Eng">
              <label class="Eng-text" for="Eng">{{ this.EngText }}</label>
            </div>
            </div>
            <p class="warn m-1">*결제 페이지에서 대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>
            </div>
          <div class="show-price-container">
            <p class="service-option-totalprice-word m-0 text-right">총 금액</p>
            <p class="service-option-totalprice-price m-0 text-right">
              {{ priceToString(Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])
                +Number(this.$store.state.EngOptionArray[EngOptionCal])
                +Number(this.$store.state.TimeOptionArray[timeOptionCal])) }}원</p>
          </div>
            </div>
            <div class="text-center">
            <a class="btn btn-primary w-50" @click="setOption1()">설문 정보 입력하러 가기</a>
          </div>
            </div>
            </div>   
</div>

<div class="TemplateOption">
  <div class="TemplateOption-container">
      <div id="TemplateOption-title">설문 템플릿 서비스</div>
          <li>
            <div class="Template-option-text">템플릿 <span class="temp-green">*</span></div>
            <select class="selectbox" v-model="templateData.type">
              <option :value=0>1. 사용경험 설문조사</option>
              <option :value=1>2. 인식 설문조사</option>
            </select> 
          </li>

          <li>
            <div class="Template-option-text">이름 <span class="temp-green">*</span></div>
            <input v-model="templateData.name">
          </li>

          <li>
            <div class="Template-option-text">이메일 주소 <span class="temp-green">*</span></div>
            <input v-model="templateData.email">
          </li>

          <li>
            <div class="Template-option-text">서베이지에게 원하는 템플릿이 있으면 작성해주세요.</div>
            <input v-model="templateData.etc">
          </li>

          <div>
            <button class="Template-btn" @click="templateFin(templateData)">템플릿 신청</button>
            <TemplateFinModal :showTempModal="showTempModal" @closeTemplateModal="closeTemplateModal()" />
          </div>
      </div>
</div>
  
</template>


<script>
import { setDoc, doc } from 'firebase/firestore';
import TemplateFinModal from './TemplateFinModal.vue'
export default {
  data() {
    return {
      templateData: {
        type: 0,
        name: '',
        email: '',
        etc: ''
      },

      typeText: '',

      showTempModal: false
      

    }
    
  },

  components: { TemplateFinModal },


  methods: {
    templateFin(inputData) {
      if(this.$store.state.loginState.isLoggedIn==false) {
        alert('로그인이 필요한 서비스입니다.')
          this.$store.state.notLoggedInTemplate = false
          this.$router.push('/login')
      }

      else if(inputData.name=='' || inputData.email=='') {
        alert('필수항목을 모두 입력해주세요.')
      }

      else {

        // console.log('input fin')
        if(inputData.type == 0) {
          this.typeText = '1. 사용경험 설문조사'
        }
        else if(inputData.type == 1) {
          this.typeText = '2. 인식 설문조사'
        }

        // 템플릿 신청 날짜 계산
        var time = new Date().toISOString()
        


        var dddd= time.split('T')
        var ddddd = dddd[0]
        
        var dddddd= ddddd.split('-')

        
        var year = dddddd[0]
        var month = dddddd[1]
        var day = dddddd[2]
        month = month.length == 2 ? month : '0' + month
        day = day.length == 2 ? day : '0' + day
        var D = year + '-' + month + '-' + day


        if(this.$store.state.isLoggedIn==false) {
          alert('로그인이 필요한 서비스입니다.')
          this.$store.state.notLoggedInTemplate = false
          this.$router.push('/login')
        }

        else {
          this.$store.commit('setTemplateMutation', {type: this.typeText, name: inputData.name, email: inputData.email, etc: inputData.etc, uploader: this.$store.state.loginState.currentUser.name, uploadDate: D, identifyTime: time})
          this.addTemplateData(this.$store.state.localTemplateState)
        }
      }
    },

    async addTemplateData(templateData) {
        var db = this.$store.state.db

        await setDoc(doc(db, "TemplateData", templateData.identifyTime.toString()), {
          type: templateData.type,
          name: templateData.name,
          email: templateData.email,
          etc: templateData.etc,
          isresponded: false,
          uploader: templateData.uploader,
          uploadDate: templateData.uploadDate,
          identifyTime: templateData.identifyTime
        })

        this.closeTemplateModal()
    },
      
    closeTemplateModal() {
      this.showTempModal = !this.showTempModal 
    },   
  
  }
}
</script>

<style>
.TemplateOption {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: auto;
  max-width: 500px;
  min-width: 500px;
  height: 5468px;
  font-family: 'Noto Sans KR', sans-serif;
}
.TemplateOption-container {
  font-family: 'Noto Sans KR';
  position: sticky;
  top: 108px;
  z-index: 1;
  height: 555px;
  border-radius: 10px;
  margin: 80px 80px 135px 10px;
  background-color: #EEEEEE;
  border-radius: 10px;
  width: 410px;
}
#TemplateOption-title {
  text-align: left;
  color: #0CAE02;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 30px 0 27px 35px;
}
.TemplateOption-container li {
  text-align: left;
  margin-bottom: 12px;
  display: block;
}
.Template-option-text {
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  font-size: 14px;
  font-weight: normal;
  margin: 20px 0 0 35px;
  padding: 0;
}
.temp-green {
  color: #0AAB00;
}
.TemplateOption-container select {
  margin: 13px 0 0 35px;
  padding: 5px;
  width: 190px;
  height: 45px;
  padding: 10px;
  background-color: #EEEEEE;
  font-size: 14px;
  cursor: pointer;
  border: 0.75px solid #BCBCBC;
  border-radius: 4px;
}
.TemplateOption-container select:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
}
.TemplateOption-container select option {
  background-color: #EEEEEE;
}

.TemplateOption-container input {
  width: 325px;
  height: 42px;
  margin: 10px 0 0 35px;
  padding-left: 13px;
  background-color: #EEEEEE;
  border: 0.75px solid #BCBCBC;
  opacity: 1;
  border-radius: 4px;
}
.Template-option input:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
}
.Template-btn {
  font-family: 'Noto Sans KR', sans-serif;
  width: 120px;
  height: 40px;
  margin-top: 20px;
  color:#0AAC00;
  background-color: #EEEEEE;
  border: 1.5px solid #0AAC00;
  border-radius: 30px;
  font-size: 15px;
  cursor: pointer;
}
.Template-btn:hover{
  color: white;
  background-color: #0AAC00;
}


</style>