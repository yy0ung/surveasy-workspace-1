<template>
  <div class="Coupon">
    <div class="Coupon-container">
      <ul id="Coupon-title">쿠폰/적립금</ul>

      <ul id="Coupon-detail">
        <ul class="Coupon-detail-text">쿠폰</ul>
          <select class="Coupon-selectbox" v-model="selectedCoupon">
            <option class="select-placeholder" :value="defaultCoupon" disabled selected>사용 가능 쿠폰 {{ this.$store.state.myCoupon.length }}장</option>
            <option class="Coupon-option" v-for="item in (this.$store.state.myCoupon)" v-bind:value="{code: item.code, rate: item.rate}" :key="item">{{ item.name }}  : {{ item.duedate }} 까지</option>
          </select>
          <button class="Coupon-btn" @click="useCoupon()">쿠폰 적용</button>
      </ul>

      <ul id="Coupon-detail">
        <ul class="Coupon-detail-text">적립금</ul>
        <div class="point-detail-container">
          <div class="Point-box">보유 적립금 {{ show_point }}원<button class="pointDelete-btn" @click="deletePoint"><i class="fas fa-times"></i></button></div>
          <button class="Coupon-btn" @click="usePoint()">적립금 적용</button>
        </div>
          
          <div class="Point-notice">10,000원 이상 결제시, 결제 금액의 최대 10%까지 적립금 사용 가능</div>
      </ul>

    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      selectedCoupon: '',

      selectedCoupon: {
        code: '',
        rate: 0
      }, 

      defaultCoupon : {
        code: '',
        rate: 0
      },

      point_apply: false,
      point_delete: false

    }
  },

  methods: {
    // Coupon methods
    useCoupon() {
      if(this.$store.state.localSurveyState.coupon_use==false) {
        this.$store.state.localSurveyState.selectedCoupon = this.selectedCoupon

        this.$store.state.localSurveyState.beforeCouponPrice = this.$store.state.localSurveyState.price
      
        if(this.selectedCoupon.rate == 5) {
          this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.05
          this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price * 0.95
        }

        if(this.selectedCoupon.rate == 10) {
          this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.1
          this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price* 0.9
        }

        if(this.selectedCoupon.rate == 20) {
          this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.2
          this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price* 0.8
        }

        this.$store.state.localSurveyState.coupon_use = true
      }

      else if(this.$store.state.localSurveyState.coupon_use==true) {
        alert("쿠폰은 최대 1장까지 사용가능합니다.")
      }
      
    },
    
    // Point methods
    usePoint() {
      if(this.$store.state.localSurveyState.point_use==false) {
        if(this.$store.state.localSurveyState.beforeCouponPrice < 10000) {
          alert('적립금은 결제 금액이 10,000원 이상인 경우에만 사용 가능합니다.')
        }
        else {
          this.point_apply = true
          var maxpoint = this.$store.state.localSurveyState.beforeCouponPrice * 0.1

          if(this.$store.state.loginState.currentUser.point_current < maxpoint) {
            this.$store.state.localSurveyState.pointDiscount = this.$store.state.loginState.currentUser.point_current
            this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price - this.$store.state.localSurveyState.pointDiscount
          }

          else if(this.$store.state.loginState.currentUser.point_current >= maxpoint) {
            this.$store.state.localSurveyState.pointDiscount = maxpoint
            this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price - this.$store.state.localSurveyState.pointDiscount
          }

          this.$store.state.localSurveyState.point_use = true
        }
      }

      else if(this.$store.state.localSurveyState.point_use==true) {
        alert("이미 적립금을 적용하셨습니다.")
      }
    },

  },

  computed: {
    show_point() {
      var c = this.$store.state.loginState.currentUser.point_current

      if(this.point_apply == false) {
        return c
      }
      else {
        return c - this.$store.state.localSurveyState.pointDiscount
      }
    },

    deletePoint() {
      if(this.point_apply == true) {
        this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price + this.$store.state.localSurveyState.pointDiscount
        this.$store.state.localSurveyState.pointDiscount = 0
        this.$store.state.localSurveyState.point_use = false
        this.point_apply = false

        this.show_point()
      }
      
    }
  }

}
</script>

<style>
.Coupon {
  background: #EEEEEE 0% 0% no-repeat padding-box;
  margin-top: 20px;
  border-radius: 15px;
  opacity: 1;
}
.Coupon-container {
  width: 1123px;
  padding: 25px;
  z-index: 1;
}
.Coupon-container ul {
  text-align: left;
}
.Coupon-container #Coupon-title {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 25px 0 30px 0;
}
#Coupon-detail ul {
  display: block;
  margin-left: 3px;
}
.Coupon-detail-text {
  left: 187px;
  width: 200px;
  height: 25px;
  margin-top: 38px;
  margin-bottom: 15px;
  padding: 0;
  text-align: left;
  font-family: 'Noto Sans KR';
  font-size: 17px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.Coupon-selectbox {
  left: 190px;
  width: 707px;
  height: 55px;
  border: 0.75px solid #afafaf;
  opacity: 1;
  background-color: #EEEEEE;
  font-size: 16px;
  padding: 12px;
  text-align: left;
  font-family: 'Noto Sans KR' lighter;
  letter-spacing: 0px;
  color: #a2a0a0;
}
.Coupon-selectbox:focus {
  outline: none;
  border: 1.5px solid #0AAB00;
}
.Coupon-option {
  padding: 10px;
  font-size: 16px;
  color: #1c1c1c;
}
.Coupon-btn {
  background-color: #EEEEEE;
  border: 1px solid #0CAE02;
  width: 112px;
  height: 46px;
  margin-left: 28px;
  color: #0CAE02;
  font-size: 15px;
  font-weight: 800;
  border-radius: 26px;
  cursor: pointer;  
}
.point-detail-container {
  display: flex;
  flex-direction: row;
}
.Point-box {
  display: flex;
  justify-content: space-between;
  left: 190px;
  width: 680px;
  height: 26px;
  margin: 0;
  border: 0.75px solid #afafaf;
  opacity: 1;
  background-color: #EEEEEE;
  font-size: 16px;
  padding: 13px;
  text-align: left;
  font-family: 'Noto Sans KR' lighter;
  letter-spacing: 0px;
  color: #a2a0a0;
}
.pointDelete-btn {
  display: inline-block;
  border: none;
  color: grey;
  cursor: pointer;
}
.Point-notice {
  font-size: 15px;
  color: #a2a0a0;
  margin-top: 15px;
  margin-left: 3px;
}
</style>