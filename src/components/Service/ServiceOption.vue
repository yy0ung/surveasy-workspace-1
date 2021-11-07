<template>
  <div class="serviceOption-container">
    <label id="service-option-title">설문 응답 서비스</label>
      <div>
        <select class="selectbox" v-model="priceRequireHeadCount">
          <option :value=0 selected disabled hidden>요구 응답수</option>
          <option :value=1>30명</option>
          <option :value=2>40명</option>
          <option :value=3>50명</option>
          <option :value=4>60명</option>
          <option :value=5>70명</option>
          <option :value=6>80명</option>
          <option :value=7>90명</option>
          <option :value=8>100명</option>
        </select>

        <select class="selectbox" v-model="priceSpendTime">
          <option :value=0 selected disabled hidden>소요 시간</option>
          <option :value=1>1-3분</option>
          <option :value=2>4-6분</option>
          <option :value=3>7-10분</option>
          <option :value=4>11-15분</option>
          <option :value=5>16-20분</option>
        </select> 

        <br>
        <span>마감 기한</span>
        <input type="Date" class="date" :min="min" :max="getDateStr" v-model="aa" required>
        <input type="time" class="time" v-model="bb" required>
        
        <br>
        <span>영어설문 여부</span>
          <label class="switch">
            <input v-model="addENTarget" @click="EngOptionCal()" type="checkbox" class="EngRadio" name="Eng">
            <span class="slider"></span>
          </label>
          <span>{{ this.EngText }}</span>
  
        <br>
        <select class="selectbox" v-model="priceIdentity">
          <option :value=0 selected disabled hidden>할인 대상 여부</option>
          <option :value=1>대학생</option>
          <option :value=2>대학원생</option>
          <option :value=3>일반</option>
        </select>
        <p id="service-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>
      
        <br>
      
        <div class="show-price-container">
          <span class="service-option-totalprice-word">총 금액</span>
          <span class="service-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;
            {{ Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])
              +Number(this.$store.state.EngOptionArray[EngOptionCal])
              +Number(this.$store.state.TimeOptionArray[timeOptionCal]) }}원</span>
        </div>
      
        <div>
          
          <button class="goServiceInputForm-btn" @click="setOption1()">설문 정보 입력하러 가기</button>
          
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

      EngText: '',

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
    }, 
    EngOptionCal() {
      var EngIndex = 0
      var HeadCount = this.priceRequireHeadCount
      var Eng = this.addENTarget
      if(Eng==false) {
        EngIndex = 0
        this.EngText = "선택 안함"
      }
      else if((HeadCount<=3) && (Eng==true)) {
        EngIndex = 1
        this.EngText = "영어 설문"
      }
      else if((HeadCount>3) && (Eng==true)) {
        EngIndex = 2
        this.EngText = "영어 설문"
      }
      console.log(EngIndex)
      return EngIndex
    }
  },
  methods: {    
    setOption1() {
      if((this.priceIdentity==0) || (this.priceSpendTime==0) || (this.priceRequireHeadCount==0) || (this.timeOptionCal==0)) {
        alert("필수 옵션을 모두 입력해주세요.")
      }
      else {
        
        this.timeOption = this.timeOptionCal;
        this.addENTarget = this.EngOptionCal;

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

        this.$router.push('/serviceinputform');
      


        console.log(this.$store.state.localSurveyState.price);
        console.log(this.$store.state.localSurveyState.identity);
        console.log(this.$store.state.localSurveyState.spendTime);
        console.log(this.$store.state.localSurveyState.requiredHeadCount);
        console.log(this.$store.state.localSurveyState.ENTarget);
        console.log(this.$store.state.localSurveyState.dueTime);
      }
    
 
    }     
  
  }
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



/* Eng switch */
.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 3px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #0CAE02;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(16px);
}

</style>