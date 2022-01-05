<template>
  <div class="home-calculator" v-if="showCalculator">
    <div class="home-calculator-contentsbox">
      <p class="calc-title">내 설문은 얼마일까?
        <button class="modal-close-button" id="cal-button" @click="$emit('close'), clear()">X</button>
      </p> 
      <div class="calc-option-container">
          <div class="respond-content">
            <span class="calc-option-title">요구 응답 수</span>
          
          <div class="pro-one" :class="{active: priceRequireHeadCount>=2}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=1}" @click="HeadCount(1)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=1}">30명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=3}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=2}" @click="HeadCount(2)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=2}">40명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=4}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=3}" @click="HeadCount(3)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=3}">50명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=5}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=4}" @click="HeadCount(4)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=4}">60명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=6}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=5}" @click="HeadCount(5)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=5}">70명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=7}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=6}" @click="HeadCount(6)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=6}">80명</div>
          </div>
          <div class="pro-one" :class="{active: priceRequireHeadCount>=8}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=7}" @click="HeadCount(7)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=7}">90명</div>
          </div>
          <div class="pro-one" id="one-last" :class="{active: priceRequireHeadCount==9}">
            <div class="step-counter" :class="{active: priceRequireHeadCount>=8}" @click="HeadCount(8)"></div>
            <div class="step-name" :class="{active: priceRequireHeadCount>=8}">100명</div>
          </div>
        </div>

        <div class="respond-content">
            <span class="calc-option-title">소요시간</span>
          <div class="pro-one" :class="{active: priceSpendTime>=2}">
            <div class="step-counter" :class="{active: priceSpendTime>=1}" @click="TimeCount(1)"></div>
            <div class="step-name" :class="{active: priceSpendTime>=1}">1-3분</div>
          </div>
          <div class="pro-one" :class="{active: priceSpendTime>=3}">
            <div class="step-counter" :class="{active: priceSpendTime>=2}" @click="TimeCount(2)"></div>
            <div class="step-name" :class="{active: priceSpendTime>=2}">4-6분</div>
          </div>
          <div class="pro-one" :class="{active: priceSpendTime>=4}">
            <div class="step-counter" :class="{active: priceSpendTime>=3}" @click="TimeCount(3)"></div>
            <div class="step-name" :class="{active: priceSpendTime>=3}">7-10분</div>
          </div>
          <div class="pro-one" :class="{active: priceSpendTime>=5}">
            <div class="step-counter" :class="{active: priceSpendTime>=4}" @click="TimeCount(4)"></div>
            <div class="step-name" :class="{active: priceSpendTime>=4}">11-15분</div>
          </div>
          <div class="pro-one" id="two-last" :class="{active: priceSpendTime>=6}">
            <div class="step-counter" :class="{active: priceSpendTime>=5}" @click="TimeCount(5)"></div>
            <div class="step-name" :class="{active: priceSpendTime>=5}">16-20분</div>
          </div>
          
        
        </div>
       
        <div>
          <div class="date-content">
            <div class="calc-option-title">마감기한 지정</div>
            <div class="date-select">
              <input type="Date"  :min="min" :max="getDateStr" v-model="aa" required>
              <input type="time"  v-model="bb" required>
            </div>
          </div>
        
          <div class="eng-content">
            <div class="calc-option-title">영어설문</div>
            <label class="switch">
              <input v-model="addENTarget" @click="EngOptionCal" type="checkbox" class="EngRadio" name="Eng">
              <span class="slider"></span>
            </label>
            <span class="Eng-text">{{ this.EngText }}</span>
          </div>
       
        <div class="discount-content">
          <div class="calc-option-title" id="margin-right">대학생/대학원생 할인</div>
               
          <div class="select-discount">
            
            <div class="radio">
              <input type="radio" id="one" name="discount" value="one" checked @click="discount(1)">
               <label for="one">대학생입니다.</label>
            </div>

            <div class="radio">
              <input type="radio" id="two" name="discount" value="two" @click="discount(2)">
              <label for="two">대학원생입니다.</label>
            </div>

            <div>
              <input type="radio" id="three" name="discount" value="three" @click="discount(3)">
              <label for="three">할인대상이 아닙니다.</label>
            </div>
          </div>
          
        </div>
        
        
          <div class="price-content">
            <div class="calc-option-title" id="total">총 금액</div>
            <span class="service-option-totalprice-price">
              {{ priceToString(Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])
                +Number(this.$store.state.EngOptionArray[EngOptionCal])
                +Number(this.$store.state.TimeOptionArray[timeOptionCal])) }}원</span>
          </div>
        
          
           
              <button id="go-btn" @click="setOption1()">설문 업로드하러 가기</button>
        
            
            
          
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
      priceIdentity:1,
      priceSpendTime:1,
      priceRequireHeadCount:1,
      addENTarget:0,
      timeOption:0,

      price: 0,
      identity: '',
      spendTime: '',
      requiredHeadCount: '',
      ENTarget: '',
      dueTime: '',

      EngText: "영어 설문이 아닙니다.",

      ex: 0,

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
      } else if (hourGap <18) {
        hourOptionIndex = 6
      }

      console.log('time', hourOptionIndex)
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
      console.log(EngIndex)
      return EngIndex
    }
  },
  methods: {    
    setOption1() {
      
      if((this.priceIdentity==0) || (this.priceSpendTime==0) || (this.priceRequireHeadCount==0) || (this.timeOptionCal==0)) {
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


        console.log(this.$store.state.localSurveyState.price);
        console.log(this.$store.state.localSurveyState.identity);
        console.log(this.$store.state.localSurveyState.spendTime);
        console.log(this.$store.state.localSurveyState.requiredHeadCount);
        console.log(this.$store.state.localSurveyState.ENTarget);
        console.log(this.$store.state.localSurveyState.dueTime);

        if(this.$store.state.loginState.isLoggedIn==false) {
          alert('로그인이 필요한 서비스입니다.')
          this.$store.state.notLoggedInService = false
          console.log('notLoggedInService')
          this.$router.push('/login')
          
        }
        if(this.$store.state.loginState.isLoggedIn==true) {
          this.$router.push('/servicepay');
          console.log('isLoggedInService')
        }
      }
      
    },
    
    HeadCount(Person){
      this.priceRequireHeadCount = Person
    },
    TimeCount(Time){
      this.priceSpendTime= Time
    },
    discount(select){
      this.priceIdentity = select
    },
    clear(){
      this.priceIdentity = 0
      this.priceRequireHeadCount = 1
      this.priceSpendTime = 1
      this.aa = ''
      this.bb = ''
      this.addENTarget =0
    },
    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
  padding-top: 20px;
  padding-bottom: 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  z-index: 1;
}
.calc-title {
  color: #0AAB00;
  font-size: 1.18rem;
  margin-bottom: 40px;
  margin-left: 60px;
}
.modal-close-button {
  float: right;
  color: grey;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding-right: 40px;
  margin-right: 30px;
}
.respond-content {
  display: flex;
  flex-direction: row;
   
  width: 85%;
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
  left: 50%;
   
  z-index: 2;
}
.pro-one:after {
  position: absolute;
  content: "";
  border-bottom: 3px solid #ccc;
  width: 50%;
  top: 5px;
  right: -50%;
 
  z-index: 2;
}
.pro-one .step-counter {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13px;
  height: 13px;
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
.step-name.active {
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
#one-last::before{
  content: none;
   border-bottom: none;
}
#two-last::before{
  content: none;
   border-bottom: none;
}

.step-counter.active {
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
  margin: 0px 10px 25px 10px;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 50px;
  padding-left: 30px;
  
}

.calc-show-price-container {
  text-align: right;
  color:#0CAE02;
}

.calc-option-totalprice-price {
  margin-right: 25px;
  font-size: 20px;
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
.date-content, .eng-content{
  display: flex;

}
.date-content input{
  margin-right: 10px;
  padding: 5px 10px;
  
}
.discount-content {
  display: flex;

}
.radio{
  margin-right: 20px;
} 
.select-discount{
  display: flex;
  flex-direction: row;
  
}
.date-select{
  margin-left: 10px;
}
#margin-bottom{
  margin-bottom: 30px;
}
.calc-option-title{
  margin-right: 90px;
}
#margin-right{
  margin-right: 45px;
  margin-bottom: 35px;
}
.price-content {
  display: flex;
  justify-content: space-between;
  
  color: #0AAB00;
  font-weight: 500;
  background: #EAEAEA 0% 0% no-repeat padding-box;
  opacity: 1;
  width: 100%;
}
#total, .service-option-totalprice-price{
  margin-top: 25px;
  margin-bottom: 25px;
  color: #0AAB00;
}
.service-option-totalprice-price{
  margin-right: 50px;
  font-size: 1.3rem;
  font-weight: 700;
}
#go-btn{
  text-align: center;
  letter-spacing: 0px;
  color: #0AAC00;
  background: #fff;
  margin-top:20px;
  border: 1px solid #0AAC00;
  border-radius: 24px;
  opacity: 1;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 700;
  
}
#go-btn:hover{
  color: #fff;
  background: #0AAC00;
}



</style>