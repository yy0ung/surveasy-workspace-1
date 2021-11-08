<template>
  <div class="home-calculator" v-if="showCalculator">
    <div class="home-calculator-contentsbox">
      <p class="calc-title">내 설문은 얼마일까?
        <button class="modal-close-button" @click="$emit('close')">X</button>
      </p> 
      <div class="calc-option-container">
          <div class="respond-content">
            <div class="calc-option-title">요구 응답 수</div>
          
          <div class="pro-one" :class="{active: priceRequireHeadCount>=0}">
            <div class="step-counter" @click="HeadCount(0)"></div>
            <div class="step-name">30명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=1}">
            <div class="step-counter" @click="HeadCount(1)"></div>
            <div class="step-name">40명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=2}">
            <div class="step-counter" @click="HeadCount(2)"></div>
            <div class="step-name">50명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=3}">
            <div class="step-counter" @click="HeadCount(3)"></div>
            <div class="step-name">60명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=4}">
            <div class="step-counter" @click="HeadCount(4)"></div>
            <div class="step-name">70명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=5}">
            <div class="step-counter" @click="HeadCount(5)"></div>
            <div class="step-name">80명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=6}">
            <div class="step-counter" @click="HeadCount(6)"></div>
            <div class="step-name">90명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount==7}">
            <div class="step-counter" @click="HeadCount(7)"></div>
            <div class="step-name">100명</div>
          </div>
        </div>

        <div class="respond-content">
            <div class="calc-option-title">소요시간</div>
          <div class="pro-one" :class="{active: priceSpendTime>=0}">
            <div class="step-counter" @click="TimeCount(0)"></div>
            <div class="step-name">1-3분</div>
          </div>
          <div class="pro-one" :class="{active: priceSpendTime>=1}">
            <div class="step-counter" @click="TimeCount(1)"></div>
            <div class="step-name">4-6분</div>
          </div>
          <div class="pro-one" :class="{active: priceSpendTime>=2}">
            <div class="step-counter" @click="TimeCount(2)"></div>
            <div class="step-name">7-10분</div>
          </div>
          <div class="pro-one" :class="{active: priceSpendTime>=3}">
            <div class="step-counter" @click="TimeCount(3)"></div>
            <div class="step-name">11-15분</div>
          </div>
          <div class="pro-one" :class="{active: priceSpendTime==4}">
            <div class="step-counter" @click="TimeCount(4)"></div>
            <div class="step-name">16-20분</div>
          </div>
          
        
        </div>
       
        <div>
          
          

        

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
      dd: new Date(),

      
      
    
    
      
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
      
    },
    HeadCount(Person){
      this.priceRequireHeadCount = Person
    },
    TimeCount(Time){
      this.priceSpendTime= Time
    }
  },
  
   
}
</script>

<style>
.home-calculator {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.524);
  display: table;
  transition: opacity .3s ease;
}
.home-calculator-contentsbox {
  font-family: 'Noto Sans KR', sans-serif;
  width: 900px;
  height: 580px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  z-index: 1;
}
.calc-title {
  color: #0AAB00;
}
.modal-close-button {
  float: right;
  color: grey;
  font-size: 20px;
  background-color: #fff;
  border: none;
  cursor: pointer;
}
.respond-content{
  display: flex;
  flex-direction: column;
  
}
.respond-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.pro-one {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.pro-one:before {
  position: absolute;
  content: "";
  border-bottom: 3px solid #ccc;
  width: 100%;
  top: 5px;
  left: -5%;
  z-index: 2;
}
.pro-one:after {
  position: absolute;
  content: "";
  border-bottom: 3px solid #ccc;
  width: 100%;
  top: 5px;
  left: 50%;
  z-index: 2;
}
.pro-one .step-counter {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ccc;
  margin-bottom: 6px;
}
.pro-one.active::after {
  position: absolute;
  content: "";
  border-bottom: 3px solid #0AAB00;
  width: 100%;
  top: 5px;
  left: 50%;
  z-index: 3;
}
.pro-one.active {
  font-weight: bold;
  color:#0AAB00;
}
.pro-one:first-child::before {
  content: none;
  border-bottom: none;
}
.pro-one:last-child::after {
  content: none;
  border-bottom: none;
}

.pro-one.active .step-counter {
  background-color: #0AAB00;
  
}
.calc-option-container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
 
  border-radius: 10px;
}
.calc-option-title {
  text-align: left;
  margin: 20px 0 15px 50px;
  color: black;
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