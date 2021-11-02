<template>
  <div class="serviceOption-container">
    <label id="service-option-title">설문 응답 서비스</label>
      <div>
        <select class="selectbox" v-model="priceRequireHeadCount">
          <option value=0 selected disabled hidden>요구 응답수</option>
          <option :value=0>30명</option>
          <option :value=1>40명</option>
          <option :value=2>50명</option>
          <option :value=3>60명</option>
          <option :value=4>70명</option>
          <option :value=5>80명</option>
          <option :value=6>90명</option>
          <option :value=7>100명</option>
        </select>

        <select class="selectbox" v-model="priceSpendTime">
          <option value=0 selected disabled hidden>소요 시간</option>
          <option :value=0>1-3분</option>
          <option :value=1>4-6분</option>
          <option :value=2>7-10분</option>
          <option :value=3>11-15분</option>
          <option :value=4>16-20분</option>
        </select> 

        <input type="Date" class="date" :min="min" :max="getDateStr" v-model="aa" required>
        <input type="time" class="time" v-model="bb" required>
        
        

        <select class="selectbox" v-model="addENTarget">
          <option value=0 selected disabled hidden>영어 설문 여부</option>
          <option :value=0>선택 안함</option>
          <option :value=1>영어 설문(50명 이하)</option>
          <option :value=2>영어 설문(50명 초과)</option>
        </select>

        <select class="selectbox" v-model="priceIdentity">
          <option value=0 selected disabled hidden>할인 대상 여부</option>
          <option :value=0>대학생</option>
          <option :value=1>대학원생</option>
          <option :value=2>일반</option>
        </select>
        <p id="service-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>
      
        <br>
      
        <div class="show-price-container">
          <span class="service-option-totalprice-word">총 금액</span>
          <span class="service-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;
            {{ Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])
              +Number(this.$store.state.EngOptionArray[addENTarget])
              +Number(this.$store.state.TimeOptionArray[timeOptionCal]) }}원</span>
        </div>
      
        <div>
          <router-link to="/serviceinputform">
          <button class="goServiceInputForm-btn" @click="setOption1()">설문 정보 입력하러 가기</button>
          </router-link>
        </div>
    </div>

    
</div>
</template>


<script>

export default {
  data() {
    return {
      currentTime : new Date(),
      priceIdentity:0,
      priceSpendTime:0,
      priceRequireHeadCount:0,
      addENTarget:0,
      timeOption:0,

      price: 0,
      identity: '',
      spendTime: '',
      requiredHeadCount: '',
      ENTarget: '',
      dueTime: '',

      today: new Date().toISOString().substring(0,10),
      min: new Date().toISOString().substring(0,10),

      aa:'',
      bb:'',
      cc: this.aa+' '+this.bb,
      dd: new Date()
      
    
    
      
    }
  },
  computed :{
    getDateStr(){
      var today = new Date()
      var a = today.setDate(today.getDate()+7)
      var m = new Date(a)
      var max = m.toISOString().substring(0,10) 
      return max
    },
    getTimeStr(){
      var time = new Date()
      var utc = time.getTime() + (time.getTimezoneOffset() *60 *1000)
      var kr_diff = 9*60*60*1000
      var krr = new Date(utc+(kr_diff))
      var now = krr.toString().substring(16,21)
      console.log(now);
      return now
      

    },
    timeOptionCal(){
      var ab = this.aa + ' ' + this.bb
      var asdf = new Date(ab).getTime()
      var hourGap = parseInt((asdf - this.dd.getTime())/3600000) 
      var hourOptionIndex = 0
      if (hourGap >= 18 && hourGap < 24){
        hourOptionIndex = 1
      } else if (hourGap >= 24 && hourGap < 36){
        hourOptionIndex = 2
      } else if (hourGap >= 36 && hourGap < 48){
        hourOptionIndex = 3
      } else if (hourGap >= 48 && hourGap < 72){
        hourOptionIndex = 4
      } else if (hourGap >= 72){
        hourOptionIndex = 5
      }
      return hourOptionIndex
      
    }
  },
  methods: {    
    setOption1() {
      this.timeOption = this.timeOptionCal;

      this.price = Number(this.$store.state.priceTable[this.priceIdentity][this.priceSpendTime][this.priceRequireHeadCount])
      +Number(this.$store.state.EngOptionArray[this.addENTarget])
      +Number(this.$store.state.TimeOptionArray[this.timeOption]);
      
      this.requiredHeadCount = String(this.$store.state.priceTextTable[0][this.priceRequireHeadCount]);
      this.spendTime = String(this.$store.state.priceTextTable[1][this.priceSpendTime]);
      this.dueTime = String(this.$store.state.priceTextTable[2][this.timeOption]);
      this.ENTarget = String(this.$store.state.priceTextTable[3][this.addENTarget]);
      this.identity = String(this.$store.state.priceTextTable[4][this.priceIdentity]);
      
      
      

      
      this.$store.commit('setSurveyMutation1', {price: this.price, requiredHeadCount: this.requiredHeadCount, 
      spendTime: this.spendTime, dueTime: this.dueTime, ENTarget: this.ENTarget, identity: this.identity});

      
      console.log(this.$store.state.localSurveyState.price);
      console.log(this.$store.state.localSurveyState.identity);
      console.log(this.$store.state.localSurveyState.spendTime);
      console.log(this.$store.state.localSurveyState.requiredHeadCount);
      console.log(this.$store.state.localSurveyState.ENTarget);
      console.log(this.$store.state.localSurveyState.dueTime);
      
    }
  },
  
   
}
</script>


<style>
.serviceOption-container {
  position: sticky;
  top: 108px;
  z-index: 1;
  width: 506px;
  height: 496px;
  border-radius: 10px;
  margin: 80px 100px 139px 0px;
  display: flex;
  flex-direction: column;
  background-color: rgb(231, 231, 231);
  border-radius: 10px;
}
#service-option-title {
  text-align: left;
  margin: 40px 0 15px 50px;
  color: #0CAE02;
  font-size: 20px;
  font-weight: bold;
}
.selectbox {
  margin: 10px;
  padding: 5px;
  width: 310px;
  height: 30px;
  background-color: rgb(231, 231, 231);
  font-size: 15px;
  cursor: pointer;
}
.selectbox option {
  background-color: rgb(238, 238, 238);
}
#service-option-notice {
  text-align: left;
  color: #0CAE02;
  font-size: 11px;
  margin: 1px 0 0 40px;
}
.show-price-container {
  margin-top: 10px;
  padding: 15px;
  text-align: right;
  color:#0CAE02;
}
.service-option-totalprice-word {
  font-size: 18px;
}
.service-option-totalprice-price {
  margin-right: 25px;
  font-size: 25px;
  font-weight: bold;
}
.goServiceInputForm-btn {
  width: 70%;
  height: 25px;
  margin: 20px;
  color:#0CAE02;
  background-color: rgb(231, 231, 231);
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
}

</style>