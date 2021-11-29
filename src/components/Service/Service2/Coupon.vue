<template>
  <div class="Coupon">
    <div class="Coupon-container">
      <ul id="Coupon-title">쿠폰 적용</ul>

      <ul id="Coupon-detail">
        <ul class="Coupon-detail-text">쿠폰</ul>
          <select class="Coupon-selectbox" v-model="selectedCoupon">
            <option class="Coupon-option" v-for="item in (this.$store.state.myCoupon)" v-bind:value="{code: item.code, rate: item.rate}" :key="item">{{ item.name }}</option>
          </select>
          <button class="Coupon-btn" @click="useCoupon()">쿠폰 적용</button>
      </ul>

    </div>
    </div>  
</template>

<script>
import { doc, setDoc, collection, getDocs, updateDoc } from '@firebase/firestore'
export default {
  data() {
    return {
      selectedCoupon: '',

      selectedCoupon: {
        code: '',
        rate: 0
      }, 
    }
  },

  methods: {
    async fetchAdminData_coupon() {
     const db = this.$store.state.db
     
     const adminCoupon = this.$store.state.adminCoupon
     
     const querySnapshot = await getDocs(collection(db, "couponData"))
     querySnapshot.forEach((doc) => {
       adminCoupon.push(doc.data())
     })

     const myCoupon = adminCoupon.filter(item => item.user===this.$store.state.currentUser.email && item.isUsed===false)
     this.$store.state.myCoupon = myCoupon
     console.log(this.$store.state.myCoupon)
   },

    async isUsed() {
      var db = this.$store.state.db
      const docref = doc(db, "couponData", this.selectedCoupon.code)

      await updateDoc(docref, { 
          isUsed: true
        })

      this.$store.state.adminCoupon = []
      this.fetchAdminData_coupon()
    },

    useCoupon() {
      this.$store.state.localSurveyState.beforeCouponPrice = this.$store.state.localSurveyState.price
      
      if(this.selectedCoupon.rate == 5) {
        this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.05
        this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price * 0.95
      }

      if(this.selectedCoupon.rate == 10) {
        this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.1
        this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price* 0.9
      }
      
      this.isUsed()
    },
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
  border: 0.75px solid #BCBCBC;
  opacity: 1;
  background-color: #EEEEEE;
  font-size: 17px;
  padding: 12px;
}
.Coupon-option {
  padding: 10px;
  font-size: 17px;
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
</style>