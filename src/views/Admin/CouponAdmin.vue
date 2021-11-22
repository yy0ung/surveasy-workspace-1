<template>
<div class="coupon">
  <div class="coupon-register">
    <h2>쿠폰 등록</h2>
    <input v-model="couponInfo.code" type="text" placeholder="쿠폰코드 입력란">
    <br>

    <span>할인%</span>
    <select v-model="couponInfo.rate">
      <option :value=5>5%</option>
      <option :value=10>10%</option>
    </select>
    <br><br>
    <button @click="addCoupon(this.couponInfo)">쿠폰 등록하기</button>
  </div>


  <div class="coupon-list">
    <h2>쿠폰 리스트</h2>
    <button @click="fetchAdminData_coupon()">쿠폰 리스트 보기</button>
    <div>{{ this.$store.state.adminCoupon }}</div>
  </div>

  <div class="coupon-use">
    <h2>쿠폰 사용하기</h2>
    <input type="text" placeholder="쿠폰 코드를 입력하시오." v-model="localCode">
    <button @click="useCoupon()">쿠폰 사용하기</button>
    <div>price: {{ this.price }}원</div>
    <br><br>
    <button>쿠폰 사용하기</button>
  </div>
</div>



</template>

<script>
import { doc, setDoc, collection, getDocs } from '@firebase/firestore'
export default {
  data() {
    return {
      couponInfo: {
        code: '',
        rate: 0,
      },

      userCode: '',
      price: 10000
    }
  },

  methods: {
   async addCoupon(dataSet) {
     var db = this.$store.state.db     
    
      await setDoc(doc(db, "couponData", dataSet.code), {
        code: dataSet.code,
        rate: dataSet.rate,
        isUsed: false
      })
   },

   async fetchAdminData_coupon() {
     const db = this.$store.state.db
     
     const adminCoupon = this.$store.state.adminCoupon
     //this.adminCoupon = []
     
     const querySnapshot = await getDocs(collection(db, "couponData"))
     querySnapshot.forEach((doc) => {
       adminCoupon.push(doc.data())
     })
   },

   useCoupon() {
     this.fetchAdminData_coupon()
     var i=0
     
     for(i=0 ; i<this.$store.state.adminCoupon.length ; i++) {
       console.log('야호')
     }


     console.log(this.$store.state.adminCoupon.length)

       
   }



  }
}
</script>

<style>

.coupon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 100px;
}
.coupon-register {
  margin: 50px;
}
.coupon-list {
  margin: 50px;
}
.coupon-use {
  margin: 50px;
}
</style>