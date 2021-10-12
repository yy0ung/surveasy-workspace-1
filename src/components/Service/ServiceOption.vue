<template>
  <div class="serviceOption-container">
    <label id="service-option-title">옵션선택</label>
      <div>

      <select class="selectbox" id="select1" v-model="priceIdentity">
        <option :value=0>대학생</option>
        <option :value=1>대학원생</option>
        <option :value=2>일반</option>
      </select>
      <p id="service-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>

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
#service-option-title {
  text-align: left;
  margin: 70px 0 15px 55px;
  font-size: 20px;
  font-weight: bold;
}
.serviceOption-container {
  width: 50%;
  height: 500px;
  border-radius: 10px;
  margin: 80px;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  background-color: rgb(231, 231, 231);
  border-radius: 10px;
}
.selectbox {
  margin: 10px;
  padding: 5px;
  width: 80%;
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
  font-size: 12px;
  margin: 1px 0 0 60px;
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
  margin-right: 40px;
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