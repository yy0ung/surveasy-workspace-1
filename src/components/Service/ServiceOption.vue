<template>
  <div class="serviceOption-container">
    <label id="service-option-title">옵션선택</label>
      <div>
          <select class="selectbox" id="select1" v-model.number="requiredHeadCount" @click="calculatePrice()">
          <option disabled value=0>요구 응답수</option>
          <option value=0>30명</option>
          <option value=2500>31~35명</option>
          <option value=5000>36~40명</option>
          <option value=7500>41~45명</option>
          <option value=9000>46~50명</option>
        </select>

        <select class="selectbox" id="select2" v-model.number="spendTime" @click="calculatePrice()">
          <option disabled value=0>소요시간</option>
          <option value=0>5분 이하</option>
          <option value=11000>6분~10분</option>
          <option value=24000>11분~15분</option>
          <option value=40000>16분~20분</option>
        </select>

        <select class="selectbox" id="select3" v-model.number="dueTime" @click="calculatePrice()">
          <option disabled value=0>마감 기한 지정</option>
          <option value=10000>24시간 이하</option>
          <option value=5000>24시간~48시간</option>
          <option value=0>48시간 이상</option>
        </select>

        <select class="selectbox" id="select4" v-model.number="discount" @click="calculatePrice()">
          <option disabled value=0>할인 대상 여부</option>
          <option value=5000>대학생 할인</option>
          <option value=25000>대학원생 할인</option>
          <option value=55000>대학생 및 대학원생이 아닙니다.</option>
        </select>
        <p id="service-option-notice">*대학생 및 대학원생임을 인증해야만 할인을 받으실 수 있습니다.</p>
        <br>
      
        <div class="show-price-container">
          <span class="service-option-totalprice-word">총 금액</span>
        <span class="service-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;{{ totalPrice }}원</span>
        </div>
      
        <div>
          <router-link to="/serviceinputform"><button class="goServiceInputForm-btn">설문 정보 입력하러 가기</button></router-link>
        </div>
    </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      requiredHeadCount: 0,
      spendTime: 0,
      dueTime: 0,
      discount: 0,
      totalPrice: 0
    }
  },
  methods: {
    calculatePrice() {
      var price1 = this.requiredHeadCount;
      var price2 = this.spendTime;
      var price3 = this.dueTime;
      var price4 = this.discount;
      this.totalPrice = price1 + price2 + price3 + price4;
    }
  }
   
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