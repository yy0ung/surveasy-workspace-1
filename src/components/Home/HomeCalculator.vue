<template>
  <div class="home-calculator" v-if="showCalculator">
    <div class="home-calculator-contentsbox">
      <h2>가격계산기
        <button class="modal-close-button" @click="$emit('close')">X</button>
      </h2> 
      <div class="calc-option-container">
        <label id="service-option-title">옵션선택</label>
        <div>
          <select class="selectbox" id="select1" v-model="priceIdentity">
            <option :value=0>대학생</option>
            <option :value=1>대학원생</option>
            <option :value=2>일반</option>
          </select>
          <p id="calc-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>

          <select class="selectbox" id="select2" v-model="priceSpendTime">
            <option :value=0>1-3분</option>
            <option :value=1>4-6분</option>
            <option :value=2>7-10분</option>
            <option :value=3>11-15분</option>
            <option :value=4>16-20분</option>
          </select>

          <select class="selectbox" id="select3" v-model="priceRequireHeadCount">
            <option :value=0>30명</option>
            <option :value=1>40명</option>
            <option :value=2>50명</option>
            <option :value=3>60명</option>
            <option :value=4>70명</option>
            <option :value=5>80명</option>
            <option :value=6>90명</option>
            <option :value=7>100명</option>
          </select>
          <br>

          <span>설문 마감일자 선택</span>
            <input type="Date" :value="today" :min="min" :max="getDateStr" >
            <input type="time" :value="getTimeStr">
        <div>

        영어 설문 여부
        <input type="radio" v-model="addENTarget" :value=0 name="enTarget">선택 안함<br>
        <input type="radio" v-model="addENTarget" :value=1 name="enTarget">영어 설문(50명 이하)<br>
        <input type="radio" v-model="addENTarget" :value=2 name="enTarget">영어 설문(50명 초과)
      </div>
      
      <br>
      
        <div class="show-price-container">
          <span class="service-option-totalprice-word">총 금액</span>
          <span class="service-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;{{Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])+Number(this.$store.state.EngOptionArray[addENTarget])}}원</span>
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

      price: 0,
      identity: '',
      spendTime: '',
      requiredHeadCount: '',
      ENTarget: '',

      today: new Date().toISOString().substring(0,10),
      min: new Date().toISOString().substring(0,10),
    
      
      
    }
  },
  computed:{
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

    }
  },
   methods: {    
    setOption1() {
      this.price = Number(this.$store.state.priceTable[this.priceIdentity][this.priceSpendTime][this.priceRequireHeadCount])+Number(this.$store.state.EngOptionArray[this.addENTarget]);
      this.identity = String(this.$store.state.priceTextTable[0][this.priceIdentity]);
      this.spendTime = String(this.$store.state.priceTextTable[1][this.priceSpendTime]);
      this.requiredHeadCount = String(this.$store.state.priceTextTable[2][this.priceRequireHeadCount]);
      this.ENTarget = String(this.$store.state.priceTextTable[3][this.addENTarget]);

      
      this.$store.commit('setSurveyMutation1', {price: this.price, identity: this.identity, spendTime: this.spendTime,
      requiredHeadCount: this.requiredHeadCount, ENTarget: this.ENTarget});

      
      console.log(this.$store.state.localSurveyState.price);
      console.log(this.$store.state.localSurveyState.identity);
      console.log(this.$store.state.localSurveyState.spendTime);
      console.log(this.$store.state.localSurveyState.requiredHeadCount);
      console.log(this.$store.state.localSurveyState.ENTarget);
      
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
  width: 800px;
  height: 600px;
  margin: 200px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.modal-close-button {
  float: right;
  color: black;
  font-size: 20px;
  background-color: #fff;
  border: none;
  cursor: pointer;
}
.calc-option-container {
  height: 500px;
  border-radius: 10px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  background-color: rgb(231, 231, 231);
  border-radius: 10px;
}
.calc-option-container #calc-option-notice {
  font-size: 12px;
  color: #0CAE02;
  margin: 5px 0 5px 75px;
}
.calc-goServiceInputForm-btn {
  width: 70%;
  height: 25px;
  margin: 2px;
  color:#0CAE02;
  background-color: rgb(231, 231, 231);
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
}
</style>