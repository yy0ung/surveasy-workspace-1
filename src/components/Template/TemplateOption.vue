<template>
  <div class="container">
		<div class="row justify-content-center align-items-center">
        <div class="shadow rounded bg-white m-3">
          <h3 class="service-title m-3">설문 템플릿 서비스</h3>
            <div class="row form-group m-3">
                  <div class="col-12 p-3">
                    <div>템플릿<span class="temp-green">*</span></div>
                    <select class="form-select form-control-text" v-model="templateData.type">
                      <option :value=0>1. 사용경험 설문조사</option>
                      <option :value=1>2. 인식 설문조사</option>
                    </select>
                    </div>
                    <div class="col-4 p-3">
                    <div>이름<span class="temp-green">*</span></div>
                    <input class="form-control form-control-text" v-model="templateData.name">
                    </div>
                    <div class="col-8 p-3">
                    <div>이메일 주소<span class="temp-green">*</span></div>
                    <input class="form-control form-control-text" v-model="templateData.email">
                    </div>
                    <div class="col-12 p-3">
                    <div>서베이지에게 원하는 템플릿이 있으면 작성해주세요.</div>
                    <input class="form-control form-control-text" v-model="templateData.etc">
                    </div>
                    <div class="text-center p-3">
                    <router-link to="/templatedone">
                    <button class="btn btn-primary" @click="templateFin(templateData)">템플릿 신청</button>
                    </router-link>
                    </div>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
import { setDoc, doc } from 'firebase/firestore';
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
</style>