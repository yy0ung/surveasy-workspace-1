<template>
<div>
<div id="mycoupon-container">
  <div class="mycoupon-title">쿠폰</div>
  <div class="mycoupon-container">
    <span class="code-title">쿠폰코드</span>
    <input class="code-input" type="text" placeholder="쿠폰 코드를 입력해주세요." v-model="localCode">
    <button class="code-add-btn" @click="addCoupon_user(localCode)">쿠폰 등록</button>
  </div>

  <div class="mycoupon-list">
    <div class="mycoupon-list-detail" v-for="item in (this.$store.state.myCoupon)" :key="item.code">
      <div class="mycoupon-list-name">{{ item.name }}</div> 
      <div class="mycoupon-list-duedate">D-{{ item.duediff }} &nbsp; ({{ item.duedate }}까지)</div> 
    </div>
  </div>
</div>

<div id="mypoint-container">
  <div class="mycoupon-title">적립금</div>
  <div class="mypoint-container">
    <div class="mypoint-list">
      <ul>
        <div class="point-text">현재 적립금</div>
        <div class="point-value">{{ this.$store.state.loginState.currentUser.point_current }}원</div>
      </ul>
      <ul>
        <div class="point-text">사용한 적립금</div>
        <div class="point-value">{{ point_used }}원</div>
      </ul>
      <ul>
        <div class="point-text">누적 적립금</div>
        <div class="point-value">{{ this.$store.state.loginState.currentUser.point_total }}원</div>
      </ul>
    </div>
    <div class="mypoint-notice">
      - 구매 후기 작성 시 적립금 500원이 지급됩니다. <br>
      - 적립금은 결제 금액이 10,000원 이상일 때만 사용 가능하며, <br>
      &nbsp; 서비스 금액의 10%까지만 사용 가능합니다.
    </div>
  </div>

  <!-- 
  <div class="mypoint-table">
    <table>
      <tr>
        <th>상태</th>
        <th>적립금</th>
        <th>적립 내용</th>
        <th>주문 번호</th>
        <th>적용 일시</th>
      </tr>
      <tr>
        <td>적립</td>
        <td>+310원</td>
        <td>서비스 이용</td>
        <td>211104-49</td>
        <td>2021.11.04</td>
      </tr>  
      <tr>
        <td>사용</td>
        <td>-500원</td>
        <td>서비스 결제</td>
        <td>211104-49</td>
        <td>2021.11.04</td>
      </tr>     
    </table>
  </div>
  -->

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

      point_used : this.$store.state.loginState.currentUser.point_total - this.$store.state.loginState.currentUser.point_current

    }
  },

  methods: {
   async addCoupon(couponInfo) {
    var db = this.$store.state.db 
    var due = new Date(couponInfo.duedate)
    var diff = Math.floor((due.getTime() - Date.now()) / (24*60*60*1000))
    
      await setDoc(doc(db, "couponData", couponInfo.code), {
        code: couponInfo.code,
        name: couponInfo.name,
        rate: couponInfo.rate,
        duedate: couponInfo.duedate,
        duediff: diff,
        user: '',
        isUsed: false,
        outOfDate: false
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

     const myCoupon = adminCoupon.filter(item => item.user===this.$store.state.currentUser.email && item.isUsed===false && item.outOfDate===false)
     this.$store.state.myCoupon = myCoupon
     console.log(this.$store.state.myCoupon)
     this.check_outOfDate()
   },

   async check_outOfDate() {
      var db = this.$store.state.db
    
      for(var i=0 ; i<this.$store.state.myCoupon.length ; i++) {
        const docref = doc(db, "couponData", this.$store.state.myCoupon[i].code) 
        var duedate = this.$store.state.myCoupon[i].duedate
        var due = new Date(duedate + ' 24:00:00')
        var diff = due.getTime()/3600000 - Date.now()/3600000
        var diffdate = Math.floor(diff/24)
  
        console.log(due.getTime()/3600000)
        console.log(Date.now()/3600000)
        console.log(diff)
        console.log(diffdate)
        await updateDoc(docref, { 
            duediff: diffdate
          })
        
        if(diff<0) {
          await updateDoc(docref, { 
            outOfDate: true
          })
        }
      }
   },


   async addCoupon_user(localCode) {
      var db = this.$store.state.db
      var validCode = false
      const docref = doc(db, "couponData", localCode)
    
      for(var i=0 ; i<this.$store.state.adminCoupon.length ; i++) {
        if(this.$store.state.adminCoupon[i].code == localCode 
        && this.$store.state.adminCoupon[i].user=='' 
        && this.$store.state.adminCoupon[i].isUsed==false
        && this.$store.state.adminCoupon[i].outOfDate==false) {
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
        && this.$store.state.adminCoupon[i].isUsed==false && this.$store.state.adminCoupon[i].outOfDate==false) {
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
#mycoupon-container{
  font-family: 'Noto Sans KR', sans-serif;
  margin-left: 50px;
  margin-right: auto;
  margin-bottom: 70px;
}
.mycoupon-title {
  margin-bottom: 15px;
}
.mycoupon-container{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #0000000D;
  border-radius: 12px;
  opacity: 1;
  width: 710px;
  height: 40px;
  margin-bottom: 15px;
  padding-top: 17px;
  padding-bottom: 15px;
}
.code-title {
  font-size: 14px;
  margin-left: 40px;
  margin-right: 40px;
}
.mycoupon-container input {
  width: 145px;
  height: 15px;
  padding: 10px;
  border: 1.5px solid #cacaca;
  border-radius: 4px;
  opacity: 1;
  color: #cacaca;
  font-size: 14px;
}
.mycoupon-container input::placeholder {
  color: #cacaca;
  font-size: 12px;
  font-weight: normal;
}
.mycoupon-container input:focus{
  outline: none;
  border: 1.5px solid #cacaca;
}
.code-add-btn {
  background-color: white;
  border: 1px solid #0AAC00;
  width: 90px;
  height: 40px;
  margin-left: 290px;
  color: #0AAC00;
  font-size: 12px;
  font-weight: 800;
  border-radius: 26px;
  cursor: pointer; 
}
.mycoupon-list {
  display: flex;
  flex-wrap: wrap;
}
.mycoupon-list-detail {
  width: 175px;
  height: 60px;
  background-color: white;
  margin: 10px 12px 10px 0;
  padding: 27px;
  border-radius: 12px;
  box-shadow: 0px 0px 5px #0000000D;
}
.mycoupon-list-name {
  font-size: 16px;
  color: #0AAC00;
}
.mycoupon-list-duedate {
  font-size: 13px;
  margin-top: 15px;
}
#mypoint-container {
  margin-left: 50px;
  margin-right: auto;
  margin-bottom: 30px;
}
.mypoint-container {
  display: flex;
  flex-direction: row;
}
.mypoint-list {
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 110px;
  background-color: white;
  margin: 10px 20px 40px 0;
  padding: 27px;
  border-radius: 12px;
  box-shadow: 0px 0px 5px #0000000D;
}
.mypoint-list ul {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  margin: 3px 5px 20px 5px;
}
.point-text {
  font-size: 14px;
}
.point-value {
  color: #0AAC00;
  font-size: 14px;
}
.mypoint-notice {
  color: rgb(163, 163, 163);
  font-size: 13px;
  font-weight: normal;
  padding: 15px;
} 
.mypoint-table {
  border-collapse: collapse;
  text-align: center;
  font-size: 13px;
  font-weight: lighter;
  color: rgb(163, 163, 163);
}
.mypoint-table th {
  width: 120px;
  height: 30px;
  padding: 0;
  border-bottom: 1.7px solid rgb(163, 163, 163);
}
.mypoint-table td {
  width: 120px;
  height: 30px;
}

</style>