<template>
<div class="ServiceOption">
  <div class="serviceOption-container">
      <div id="service-option-title">설문 응답 서비스</div>
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
          <li class="hasTitleOption">
            <span class="option-title">마감기한 지정</span>
            <input type="Date" class="date" :min="min" :max="getDateStr" v-model="aa" required> 
            <input type="time" class="time" v-model="bb" required>
            <p class="warn-msg">마감날짜와 마감시간 중 공란이 존재할 경우 <br> 설문 게시가 어려울 수 있습니다.</p>
          </li>
          
          <li class="hasTitleOption">
            <span class="option-title">영어설문</span> 
            <label class="switch">
              <input v-model="addENTarget" @click="EngOptionCal" type="checkbox" class="EngRadio" name="Eng">
              <span class="slider"></span>
            </label>
            <span class="Eng-text">{{ this.EngText }}</span>
          </li>
          
    
        
          <select class="selectbox" v-model="priceIdentity">
            <option :value=0 selected disabled hidden>대학생 / 대학원생 할인</option>
            <option :value=1>대학생입니다.</option>
            <option :value=2>대학원생입니다.</option>
            <option :value=3>할인대상이 아닙니다.</option>
          </select>
          <p id="service-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>
        
          <br>
        
          <div class="show-price-container">
            <span class="service-option-totalprice-word">총 금액</span>
            <span class="service-option-totalprice-price">
              {{ priceToString(Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])
                +Number(this.$store.state.EngOptionArray[EngOptionCal])
                +Number(this.$store.state.TimeOptionArray[timeOptionCal])) }}원</span>
          </div>
        
          <div>
            
            <button class="goServicePay-btn" @click="setOption1()">설문 정보 입력하러 가기</button>
            
          </div>
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

      ex: 0,

      today: new Date().toISOString().substring(0,10),
      min: new Date().toISOString().substring(0,10),

      aa:'12:00:00',
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
      // console.log(now);
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
      } else if (hourGap <18) {
        hourOptionIndex = 6
      }

      // console.log('time', hourOptionIndex)
      return hourOptionIndex
    }, 
    EngOptionCal() {
      var EngIndex = 0
      var HeadCount = this.priceRequireHeadCount
      var Eng = this.addENTarget
      if(Eng==false) {
        EngIndex = 0
        this.EngText = "영어 설문이 아닙니다."
      }
      else if((HeadCount<=3) && (Eng==true)) {
        EngIndex = 1
        this.EngText = "영어 설문입니다."
      }
      else if((HeadCount>3) && (Eng==true)) {
        EngIndex = 2
        this.EngText = "영어 설문입니다."
      }
      return EngIndex
    }
  },
  methods: {    
    setOption1() {
      
      if((this.priceIdentity==0) || (this.priceSpendTime==0) || (this.priceRequireHeadCount==0) || (this.timeOptionCal==0) ) {
        alert("모든 옵션을 입력해주세요.")
      }

      else if(this.timeOptionCal==6) {
        alert("마감 기한은 최소 18시간 이상부터 선택 가능합니다.")
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
      
      
        this.$store.commit('setSurveyMutation1', {price: this.price, beforeCouponPrice: this.price, requiredHeadCount: this.requiredHeadCount, 
        spendTime: this.spendTime, dueTime: this.dueTime, ENTarget: this.ENTarget, identity: this.identity, dueDate: this.aa, dueTimeTime: this.bb});

        this.$store.commit('setSurveyDueTime', {dueDate: this.aa, dueTime: this.bb})

        this.$store.commit('setCouponDiscountEmpty')
        this.$store.commit('setPointDiscountEmpty')
        

        if(this.$store.state.loginState.isLoggedIn==false) {
          alert('로그인이 필요한 서비스입니다.')
          this.$store.state.notLoggedInService = false
          // console.log('notLoggedInService')
          this.$router.push('/login')
          
        }
        if(this.$store.state.loginState.isLoggedIn==true) {
          
          this.$router.push('/servicepay');
          // console.log('isLoggedInService')
        }
        
      

        }
        
      },
      priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    
 
    }     
  
  }
</script>

<style>
.ServiceOption {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: auto;
  max-width: 500px;
  min-width: 500px;
  height: 5468px;
  
}
.serviceOption-container {
  position: sticky;
  top: 108px;
  z-index: 1;
  height: 536px;
  border-radius: 10px;
  margin: 80px 80px 135px 10px;
  background-color: #EEEEEE;
  border-radius: 10px;
}
#service-option-title {
  text-align: left;
  color: #0CAE02;
  font-size: 20px;
  font-weight: bold;
  margin: 30px 0 30px 30px;
}
.selectbox {
  margin: 8px;
  padding: 5px;
  width: 330px;
  height: 30px;
  background-color: #EEEEEE;
  font-size: 15px;
  cursor: pointer;
}
.selectbox:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
}
.selectbox option {
  background-color: #EEEEEE;
}
.hasTitleOption {
  text-align: left;
  margin: 10px 0 8px 0;
  display: block;
  
}
.hasTitleOption .option-title {
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  font-size: 14px;
  font-weight: bolder;
  margin: 10px 0 0 41px;
}
.hasTitleOption .date {
  width: 135px;
  height: 22px;
  margin-left: 6px;
  margin-right: 3px;
  margin-bottom: 6px;
  border: none;
}
.hasTitleOption .date:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
}
.hasTitleOption .time {
  width: 105px;
  height: 22px;
  border: none;
}
.hasTitleOption .time:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
  
}
.hasTitleOption .Eng-text {
  font-size: 13px;
  color: rgb(137, 135, 135);
}

#service-option-notice {
  text-align: left;
  color: rgba(219, 21, 21, 0.822);
  font-size: 11.5px;
  margin: 1px 0 0 42px;
  font-weight: 300;
}
.show-price-container {
  margin-top: 10px;
  padding: 15px;
  text-align: right;
  color:#0CAE02;
}
.show-price-container  .service-option-totalprice-word {
  position: absolute;
  top: 380px;
  left: 160px;
  font-size: 18px;
}
.show-price-container  .service-option-totalprice-price {
  position: absolute;
  top: 375px;
  left: 263px;
  margin: 0 25px 0 0;
  font-size: 25px;
  font-weight: bold;
}
.goServicePay-btn {
  padding: 5px 70px;
  margin-top: 60px;
  color:#0CAE02;
  background-color: #EEEEEE;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
.goServicePay-btn:hover{
  color: white;
  background: #0AAB00;
}


/* Eng switch */
.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
  margin-left: 45px;
  margin-right: 10px;
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
  bottom: 2.5px;
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
.warn-msg{
  color: rgba(219, 21, 21, 0.822);
  font-weight: 300;
  font-size: 0.7rem;
  text-align: left;
  margin-left: 130px;
  margin-top: 0;
}

</style>