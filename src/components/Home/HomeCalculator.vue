<template>
  <div class="home-calculator" v-if="showCalculator">
    <div class="home-calculator-contentsbox">
      <h2 class="calc-title">가격계산기
        <button class="modal-close-button" @click="$emit('close')">X</button>
      </h2> 
      <div class="calc-option-container">
        <label id="calc-option-title">옵션선택</label>
        <div>
          <select class="selectbox" v-model="priceRequireHeadCount">
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
          <option :value=0>1-3분</option>
          <option :value=1>4-6분</option>
          <option :value=2>7-10분</option>
          <option :value=3>11-15분</option>
          <option :value=4>16-20분</option>
        </select> 

        <input type="Date"  :min="min" :max="getDateStr" v-model="aa">
        <input type="time"  v-model="bb">
        
        <div>영어 설문 여부
          <input type="radio" v-model="addENTarget" :value=0 name="enTarget">선택 안함<br>
          <input type="radio" v-model="addENTarget" :value=1 name="enTarget">영어 설문(50명 이하)<br>
          <input type="radio" v-model="addENTarget" :value=2 name="enTarget">영어 설문(50명 초과)
        </div>

        <select class="selectbox" v-model="priceIdentity">
          <option :value=0>대학생</option>
          <option :value=1>대학원생</option>
          <option :value=2>일반</option>
        </select>
        <p id="calc-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>
      
        <br>
      
        <div class="calc-show-price-container">
          <span class="calc-option-totalprice-word">총 금액</span>
          <span class="calc-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;
            {{ Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])
              +Number(this.$store.state.EngOptionArray[addENTarget])
              +Number(this.$store.state.TimeOptionArray[timeOptionCal]) }}원</span>
        </div>
      
        <div>
          <router-link to="/serviceinputform">
          <button class="calc-goServiceInputForm-btn" @click="setOption1()">설문 정보 입력하러 가기</button>
          </router-link>
        </div>
    </div>

    
</div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'home-calculator',
  props: {
    showCalculator: {
      type: Boolean,
      require: true,
      default: false
    }
  },
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
.home-calculator {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.524);
  display: table;
  transition: opacity .3s ease;
}
.home-calculator-contentsbox {
  width: 500px;
  height: 500px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.calc-title {
  color: grey;
}
.modal-close-button {
  float: right;
  color: grey;
  font-size: 20px;
  background-color: #fff;
  border: none;
  cursor: pointer;
}
.calc-option-container {
  width: 500px;
  height: 420px;
  border-radius: 10px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  background-color: rgb(231, 231, 231);
  border-radius: 10px;
}
#calc-option-title {
  text-align: left;
  margin: 20px 0 15px 50px;
  color: #0CAE02;
  font-size: 18px;
  font-weight: bold;
}
.calc-option-container #calc-option-notice {
  font-size: 12px;
  color: #0CAE02;
  margin: 0;
}
.calc-show-price-container {
  text-align: right;
  color:#0CAE02;
}
.calc-option-totalprice-word {
  font-size: 18px;
}
.calc-option-totalprice-price {
  margin-right: 25px;
  font-size: 25px;
  font-weight: bold;
}
.calc-goServiceInputForm-btn {
  width: 70%;
  height: 25px;
  margin: 15px;
  color:#0CAE02;
  background-color: rgb(231, 231, 231);
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
}
</style>