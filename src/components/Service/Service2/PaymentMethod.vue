<template>
  <div class="PaymentMethod">
    <div class="PaymentMethod-container">
      <ul id="PaymentMethod-title">결제 방법</ul>
      <ul>
        <span id="Account-title">입금 계좌</span>
        <span id="Account-address">카카오뱅크 3333-17-5341775 (장서준)</span>
      </ul>
      
      <ul><div><input v-model="accont_userName" @change="setOption3()" id="Account-input" placeholder="입금자명"></div></ul>
      
      <ul>
        <div class="PaymentMethod-text">
          입금 시, 메세지/입금자명에 "서베이지 아이디" 또는
          <br>"설문 주제"를 꼭 써주세요.
          <br><br>
          대학(원)생 인증을 완료하셔야 대학(원)생 할인이 적용됩니다.
          <br>아직 인증을 완료하지 않으셨다면, 카카오채널에서 완료해주세요.
          <p>{{ this.$props.title }}</p>
        </div>
      </ul>
      <button class="Payment-btn" @click="payDone()">결제하기</button>
    </div>
  </div>  
</template>

<script>
import { arrayUnion, doc, setDoc, updateDoc } from '@firebase/firestore';
export default {
  data() {
    return {
      accont_userName: '',
      uploader: '',
      uploaderIdentity: '',

    }
  },

  methods: {
    setOption3() {
      this.uploader = this.$store.state.loginState.currentUser.name
      this.uploaderIdentity = this.$store.state.loginState.currentUser.identity
      console.log('identity: ',this.uploaderIdentity)

      this.$store.commit('setSurveyMutation3', {account_userName: this.accont_userName, uploader: this.uploader, uploaderIdentity: this.uploaderIdentity})
      console.log(this.$store.state.localSurveyState)
    },

    payDone() {
      if(this.$store.state.localSurveyState.title=='' || this.$store.state.localSurveyState.target=='' || this.$store.state.localSurveyState.institute=='' || this.$store.state.localSurveyState.link=='') {
        alert('필수 설문 정보를 모두 입력해주세요.')
        console.log('if')
      }

      else {
        this.couponIsUsed()
        this.pointIsUsed()
        this.pointADD()
        this.sendToAdmin(this.$store.state.localSurveyState)
        this.$store.state.localSurveyState.coupon_use = false
        this.$store.state.localSurveyState.point_use = false
        console.log('else')
      }

      
    },

    async couponIsUsed() {
      var db = this.$store.state.db
      const docref = doc(db, "couponData", this.$store.state.localSurveyState.selectedCoupon.code)

      await updateDoc(docref, { 
          isUsed: true,
          targetSurvey: this.$store.state.localSurveyState.title
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

    async pointIsUsed() {
      var db = this.$store.state.db
      const docref = doc(db, "userData", this.$store.state.currentUser.email)

      this.$store.state.currentUser.point_current = this.$store.state.currentUser.point_current - this.$store.state.localSurveyState.pointDiscount

      //this.$store.state.localPointState.point_current = this.$store.state.currentUser.point_current
     // this.$store.state.localPointState.point_total = this.$store.state.currentUser.point_total

      await updateDoc(docref, { 
          point_current: this.$store.state.currentUser.point_current,
    
        })

      this.$store.state.userData = []
      this.fetchUserData()
    },
    
    async fetchUserData(){
      const db = this.$store.state.db
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      
    },

    async pointADD() {
      var db = this.$store.state.db
      var currentUserEmail = this.$store.state.currentUser.email
      var point_addValue = 0
      const docref = doc(db, "userData", currentUserEmail)

      if(this.$store.state.currentUser['uploadIndex'].length<=2) {
        point_addValue = Math.floor(this.$store.state.localSurveyState.price * 0.01)
      }

      else if(this.$store.state.currentUser['uploadIndex'].length>=3 && this.$store.state.currentUser['uploadIndex'].length<=9) {
        point_addValue = Math.floor(this.$store.state.localSurveyState.price * 0.02)
      }

      else if(this.$store.state.currentUser['uploadIndex'].length>=10) {
        point_addValue = Math.floor(this.$store.state.localSurveyState.price * 0.03)
      }

      this.$store.state.currentUser.point_current = this.$store.state.currentUser.point_current + point_addValue
      this.$store.state.currentUser.point_total = this.$store.state.currentUser.point_total + point_addValue

      //this.$store.state.localPointState.point_current = this.$store.state.currentUser.point_current
      //this.$store.state.localPointState.point_total = this.$store.state.currentUser.point_total


      await updateDoc(docref, { 
          point_current: this.$store.state.currentUser.point_current,
          point_total: this.$store.state.currentUser.point_total
        })

      this.$store.state.userData = []
      this.fetchUserData()
    },


    async sendToAdmin(dataset) {
      var db = this.$store.state.db
      var localLastID = this.$store.state.lastID[0].lastID
      var currentUserEmail = await this.$store.state.loginState.currentUser.email
      var nowDate= new Date()
      var orderNum = nowDate.getFullYear().toString().substring(2,4) + (nowDate.getMonth()+1).toString() + nowDate.getDate().toString() + localLastID
      
      var d = nowDate.toLocaleDateString()
      var dd = d.replace(/ /g, "")
      var ddd = dd.split('.')

      var year = ddd[0]
      var month = ddd[1]
      var day = ddd[2]

      month = month.length == 2 ? month : '0' + month
      day = day.length == 2 ? day : '0' + day

      var D = year + '-' + month + '-' + day
      
      
        await setDoc(doc(db, "adminRequired", localLastID.toString()), {
          price : dataset.price,
          beforeCouponPrice : dataset.beforeCouponPrice,
          couponDiscount : dataset.couponDiscount,
          requiredHeadCount : dataset.requiredHeadCount,
          spendTime: dataset.spendTime,
          dueTime: dataset.dueTime,
          ENTarget: dataset.ENTarget,

          title: dataset.title,
          target: dataset.target,
          institute : dataset.institute,
          link : dataset.link,
          notice : dataset.notice,
          
          account_userName : dataset.account_userName,
          uploaderIdentity: dataset.uploaderIdentity,
          
          adminApproved : dataset.adminApproved,
          uploader : dataset.uploader,
          uploadTime : new Date(),
          uploadDate : D,
          id : localLastID,
          dueDate: dataset.dueDate,
          dueTimeTime: dataset.dueTimeTime,
          dueTimeTimeTime: dataset.dueTimeTimeTime,

          orderNum: orderNum,

          progress : 0

                
        })


        var idDocref = doc(db, "lastID", "lastID")
        var currentUserRef = doc(db, "userData", currentUserEmail)
        await updateDoc(idDocref, {
          lastID : (localLastID + 1)
        })

        await updateDoc(currentUserRef, {
          uploadIndex: arrayUnion(localLastID)
        })

        console.log(dataset)

        if(this.$store.state.localSurveyState.identity=='할인 대상이 아닙니다.' ) {
          this.$router.push('/servicepaydone')
        }

        else {
          this.$router.push('/serviceidentity')
        }
        
        this.$store.state.localSurveyState.couponDiscount = 0

        this.$store.dispatch('setCurrentUser', {
            payload: this.$store.state.loginState.currentUser.email
          })

        this.$store.state.localSurveyState.pointDiscount = 0

      }



  },
  
  

}
</script>

<style>
.PaymentMethod {
  background: #EEEEEE 0% 0% no-repeat padding-box;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 15px;
}
.PaymentMethod-container {
  width: 380px;
  padding-top: 20px;
  z-index: 1;
}
.PaymentMethod-container ul{
  text-align: left;
  font-size: 13px;
  margin: 0;
  padding-left: 45px;
}
#PaymentMethod-title {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  margin: 27px 0 30px 0;
  font-size: 19px;
  font-weight: bold;
}
#Account-title {
  font-family: 'Noto Sans KR', sans-serif;
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-right: 33px;
}
#Account-input {
  font-family: 'Noto Sans KR';
  background-color: #EEEEEE;
  justify-content: center;
  width: 282px;
  height: 10px;
  margin-top: 20px;
  border: 1px solid rgb(187, 187, 187);
  padding: 15px;
  font-size: 14px;
  font-weight: lighter;
}
#Account-input:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
}
.PaymentMethod-container input::placeholder {
  text-align: left;
  font-family: 'Noto Sans KR' normal;
  font-size: 15px;
  letter-spacing: 0px;
  color: #BCBCBC;
  opacity: 1;
}
.PaymentMethod-text {
  font-family: 'Noto Sans KR' lighter;
  font-size: 11px;
  font-weight: normal;
  margin-top: 35px;
  line-height: 19px;
}
.Payment-btn {
  background-color: #EEEEEE;
  border: 1px solid #0CAE02;
  width: 110px;
  height: 40px;
  margin-top: 20px;
  color: #0CAE02;
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: medium;
  border-radius: 26px;
  cursor: pointer; 
}
</style>