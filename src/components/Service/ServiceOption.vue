<template>
  <div class="serviceOption-container">
    <label id="service-option-title">옵션선택</label>
      <div>
          <select class="selectbox" id="select1" v-model.number="price1" @click="calculatePrice()">
          <option disabled value=0>요구 응답수</option>
          <option selected v-for="option1 in requiredHeadCount_Options" :value=option1.value :key="option1">{{ option1.text }}</option>
        </select>

        <select class="selectbox" id="select2" v-model.number="price2" @click="calculatePrice()">
          <option disabled value=0>소요시간</option>
          <option v-for="option2 in spendTime_Options" :value=option2.value :key="option2">{{ option2.text }}</option>
        </select>

        <select class="selectbox" id="select3" v-model.number="price3" @click="calculatePrice()">
          <option disabled value=0>마감 기한 지정</option>
          <option v-for="option3 in dueTime_Options" :value=option3.value :key="option3">{{ option3.text }}</option>
        </select>

        <select class="selectbox" id="select4" v-model.number="price4" @click="calculatePrice()">
          <option disabled value=0>할인 대상 여부</option>
          <option v-for="option4 in discount_Options" :value=option4.value :key="option4">{{ option4.text }}</option>
        </select>
        <p id="service-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>
        <br>
      
        <div class="show-price-container">
          <span class="service-option-totalprice-word">총 금액</span>
        <span class="service-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;{{ totalPrice }}원</span>
        </div>
      
        <div>
          <router-link to="/serviceinputform">
          <button class="goServiceInputForm-btn" @click="getPrice(this.totalPrice)">설문 정보 입력하러 가기</button>
          </router-link>
        </div>
    </div>
</div>
</template>


<script>

export default {
  data() {
    return {
      requiredHeadCount: '',
      spendTime: '',
      dueTime: '',
      discount: '',
    
      totalPrice: 0,
      price1: 0,
      price2: 0,
      price3: 0,
      price4: 0,
      
      requiredHeadCount_Options: [ {value: 1000, text: '30명'}, { value: 3500, text: '31명~35명'}, 
      {value: 6000, text: '36명~40명'}, {value: 8500, text: '41~45명'}, {value: 10000, text: '46~50명'} ],

      spendTime_Options: [ {value: 1000, text: '5분 이하'}, {value: 12000, text: '6분~10분'}, 
      {value: 25000, text: '11분~15분'}, {value: 41000, text: '16분~20분'} ],

      dueTime_Options: [ {value: 11000, text: '24시간 이하'}, {value: 6000, text: '24시간~48시간'}, {value: 1000, text: '48시간 이상'} ],

      discount_Options: [ {value: 2000, text: '대학생 할인'}, {value: 22000, text: '대학원생 할인'}, 
      {value: 52000, text: '대학생 및 대학원생이 아닙니다.'} ]


    
    }
  },
  methods: {
    calculatePrice() {
      this.totalPrice = this.price1 + this.price2 + this.price3 + this.price4;
    },
    getPrice(Price) {
      this.$store.commit('setSurvey', {price: Price});
    }
    
  },
  
   
}
</script>


<style scoped>
#service-option-title {
  text-align: left;
  margin: 80px 0 10px 40px;
  font-size: 12px;
  font-weight: bold;
}
.serviceOption-container {
  width: 50%;
  height: 450px;
  border-radius: 10px;
  margin: 40px;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  background-color: rgb(231, 231, 231);
  border-radius: 10px;
}
.selectbox {
  margin: 7px;
  width: 80%;
  height: 30px;
  background-color: rgb(231, 231, 231);
  font-size: 12px;
  cursor: pointer;
}
.selectbox option {
  background-color: rgb(238, 238, 238);
}
#service-option-notice {
  text-align: center;
  color: #0CAE02;
  font-size: 7px;
  margin: 1px;
}
.show-price-container {
  padding: 10px;
  text-align: right;
  color:#0CAE02;
}
.service-option-totalprice-word {
  font-size: 11px;
}
.service-option-totalprice-price {
  margin-right: 40px;
  font-size: 18px;
  font-weight: bold;
}
.goServiceInputForm-btn {
  width: 70%;
  height: 20px;
  margin: 40px;
  color:#0CAE02;
  background-color: rgb(231, 231, 231);
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 10px;
  cursor: pointer;
}

</style>