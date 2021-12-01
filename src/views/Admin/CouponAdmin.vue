<template>
<div class="coupon">
  <div class="coupon-register">
    <h2>쿠폰 등록</h2>
    <input v-model="couponInfo.code" type="text" placeholder="쿠폰코드 입력란">
    <br>
    <input v-model="couponInfo.name" type="text" placeholder="쿠폰이름 입력란">
    <br>
    <input v-model="couponInfo.duedate" type="date">
    <br>
    <span>할인율</span>
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
    <table>
      <tr>
        <th>쿠폰 코드</th>
        <th>쿠폰 이름</th>
        <th>유효 기간</th>
        <th>할인율</th>
        <th>등록 사용자</th>
        <th>사용 여부</th>
      </tr>

      <tr v-for="item in (this.$store.state.adminCoupon)" :key="item.code">
        <td>{{ item.code }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.duedate }}</td>
        <td>{{ item.rate }}</td>
        <td>{{ item.user }}</td>
        <td>{{ item.isUsed }}</td>
      </tr>
    </table>
  </div>

  <div class="coupon-mypage">
    <h2>쿠폰 등록하기</h2>
    <input type="text" placeholder="쿠폰 코드를 입력하시오." v-model="localCode">
    <button @click="addCoupon_user(localCode)">쿠폰 등록하기</button>
  </div>

  <div class="coupon-use">
    <h2>쿠폰 사용하기</h2>
    <h3>나의 쿠폰 리스트</h3>
    <table>
      <tr>
        <th>쿠폰 이름</th>
        <th>유효 기간</th>
        <th>할인율</th>
        <th>사용 여부</th>
      </tr>
      <tr v-for="item in (this.$store.state.myCoupon)" :key="item.isUsed">
        <td>{{ item.name }}</td>
        <td>{{ item.duedate }}</td>
        <td>{{ item.rate }}</td>
        <td>{{ item.isUsed }}</td>
      </tr>      
    </table>
    <br>
    <select v-model="selectedCoupon">
      <option v-for="item in (this.$store.state.myCoupon)" v-bind:value="{code: item.code, rate: item.rate}" :key="item">{{ item.name }}</option>
    </select>
    <button @click="useCoupon()">쿠폰 사용하기</button>
    <br>
    <div>결제금액: {{ this.price }}원</div>
    <br>
    <button @click="isUsed()">쿠폰 사용 완료</button>

    <br><br><br><br>
    <div>전달할 쿠폰을 선택하세요.</div>
    <select v-model="transferCoupon">
      <option v-for="item in (this.$store.state.myCoupon)" v-bind:value="{code: item.code, rate: item.rate}" :key="item">{{ item.name }}</option>
    </select>
    <br>
    <input type="text" v-model="receiver" placeholder="쿠폰을 받을 사용자의 이메일을 입력하시오."> 
    <br>
    <button @click="transferCP(transferCoupon)">쿠폰 전달하기</button>
  </div>
</div>



</template>

<script>
import { doc, setDoc, collection, getDocs, updateDoc } from '@firebase/firestore'
export default {
  data() {
    return {
      couponInfo: {
        code: '',
        name: '',
        duedate: '',
        rate: 0,
        user: ''
      },

      localCode: '',
      couponUser: '',

      selectedCoupon: {
        code: '',
        rate: 0
      },        
      price: 10000,
      
      receiver: '',
      transferCoupon: {
        code: '',
      },

    }
  },

  methods: {
   async addCoupon(couponInfo) {
     var db = this.$store.state.db     
    
      await setDoc(doc(db, "couponData", couponInfo.code), {
        code: couponInfo.code,
        name: couponInfo.name,
        rate: couponInfo.rate,
        duedate: couponInfo.duedate,
        user: '',
        isUsed: false
      })

      this.$store.state.adminCoupon = []
      this.fetchAdminData_coupon()

   },

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

   async addCoupon_user(localCode) {
      var db = this.$store.state.db
      var validCode = false
      const docref = doc(db, "couponData", localCode)
    
      for(var i=0 ; i<this.$store.state.adminCoupon.length ; i++) {
        if(this.$store.state.adminCoupon[i].code == localCode 
        && this.$store.state.adminCoupon[i].user=='' 
        && this.$store.state.adminCoupon[i].isUsed==false) {
          validCode = true
        }
      }

      if(validCode == true) {
        await updateDoc(docref, { 
          user: this.$store.state.currentUser.email
        })
      }

      else {
        alert('유효하지 않은 쿠폰입니다.')
      }

      this.$store.state.adminCoupon = []
      this.fetchAdminData_coupon()
    },

    useCoupon() {
      if(this.selectedCoupon.rate == 5) {
        this.price = this.price * 0.95
      }

      if(this.selectedCoupon.rate == 10) {
        this.price = this.price * 0.9
      }
      
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

    async transferCP(transferCoupon) {
      var db = this.$store.state.db
      var validCoupon = false
      const docref = doc(db, "couponData", this.transferCoupon.code)
      
    
      for(var i=0 ; i<this.$store.state.adminCoupon.length ; i++) {
        if(this.$store.state.adminCoupon[i].code == transferCoupon.code 
        && this.$store.state.adminCoupon[i].isUsed==false) {
          validCoupon = true
        }
      }

      if(validCoupon == true) {
        await updateDoc(docref, { 
          user: this.receiver
        })
        console.log(this.receiver)
      }

      else {
        alert('유효하지 않은 쿠폰입니다.')
      }

      this.receiver = ''

      this.$store.state.adminCoupon = []
      this.fetchAdminData_coupon()
    }

    

  }
}
</script>

<style>

.coupon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px;
}
.coupon-register {
  margin: 20px;
}
.coupon-list {
  margin: 20px;
}
.coupon-mypage {
  margin: 20px;
}
.coupon-use {
  margin: 20px;
}
.coupon-use input {
  width: 260px;
}
</style>