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
import { arrayUnion, doc, collection, setDoc, updateDoc, getDocs } from '@firebase/firestore';
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
      // console.log('identity: ',this.uploaderIdentity)

      this.$store.commit('setSurveyMutation3', {account_userName: this.accont_userName, uploader: this.uploader, uploaderIdentity: this.uploaderIdentity})
      // console.log(this.$store.state.localSurveyState)
    },

    async payDone() {
      var PaymentEmptyNotice = [ ' 설문 제목', ' 설문 대상', ' 설문 기관', ' 설문 링크', ' 입금자명' ]

      var emptyTarget = []

      if(this.$store.state.localSurveyState.title=='' || this.$store.state.localSurveyState.target=='' || this.$store.state.localSurveyState.institute=='' 
      || this.$store.state.localSurveyState.link=='' || this.accont_userName=='') {

        var emptyTarget = []

        if(this.$store.state.localSurveyState.title=='') {
          emptyTarget.push(PaymentEmptyNotice[0])
        }

        if(this.$store.state.localSurveyState.target=='') {
          emptyTarget.push(PaymentEmptyNotice[1])
        }

        if(this.$store.state.localSurveyState.institute=='') {
          emptyTarget.push(PaymentEmptyNotice[2])
        }

        if(this.$store.state.localSurveyState.link=='') {
          emptyTarget.push(PaymentEmptyNotice[3])
        }

        if(this.accont_userName=='') {
          emptyTarget.push(PaymentEmptyNotice[4])
        }


        console.log(emptyTarget)

        alert(emptyTarget + '의 입력이 필요합니다.')
      }

      

      else {
        this.couponIsUsed()
        this.pointIsUsed()
        this.pointADD()
        this.sendToAdmin(this.$store.state.localSurveyState)
        this.$store.state.localSurveyState.coupon_use = false
        this.$store.state.localSurveyState.point_use = false
        // console.log('else')
      }

      
    },

    async couponIsUsed() {
      var db = this.$store.state.db
      if(this.$store.state.localSurveyState.selectedCoupon.code != '') {
        const docref = doc(db, "couponData", this.$store.state.localSurveyState.selectedCoupon.code)

        await updateDoc(docref, { 
          isUsed: true,
          targetSurvey: this.$store.state.localSurveyState.title
        })
      }

        this.$store.state.adminCoupon = []
        this.$store.state.myCoupon = []
        this.fetchAdminData_coupon()
      
    },

    async fetchAdminData_coupon() {
     const db = this.$store.state.db
     
     const adminCoupon = this.$store.state.adminCoupon
     
     const querySnapshot = await getDocs(collection(db, "couponData"))
     querySnapshot.forEach((doc) => {
       adminCoupon.push(doc.data())
     })

     const myCoupon = adminCoupon.filter(item => item.user===this.$store.state.loginState.currentUser.email && item.isUsed===false && item.outOfDate===false)
     this.$store.state.myCoupon = myCoupon
    //  console.log(this.$store.state.myCoupon)
   },

    async pointIsUsed() {
      var db = this.$store.state.db
      const docref = doc(db, "userData", this.$store.state.loginState.currentUser.email)

      this.$store.state.loginState.currentUser.point_current = this.$store.state.loginState.currentUser.point_current - this.$store.state.localSurveyState.pointDiscount

      //this.$store.state.localPointState.point_current = this.$store.state.currentUser.point_current
     // this.$store.state.localPointState.point_total = this.$store.state.currentUser.point_total

      await updateDoc(docref, { 
          point_current: this.$store.state.loginState.currentUser.point_current,
    
        })

      this.$store.state.userData = []
      this.fetchUserData_point()
    },
    
    async fetchUserData_point(){
      const db = this.$store.state.db
      this.$store.state.userData = []
      this.$store.state.PointUserData = []
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      const PointUserData = userData.filter(item => item.email===this.$store.state.loginState.currentUser.email)
      this.$store.state.PointUserData = PointUserData
      // console.log('***pointUser: ')
      // console.log(PointUserData[0])
      this.getPointInfo()
    },

    getPointInfo() {
      var c = this.$store.state.PointUserData[0].point_current
      var t = this.$store.state.PointUserData[0].point_total
      this.$store.state.localPointState.point_current = c
      this.$store.state.localPointState.point_total = t

      // console.log('current point: ' + this.$store.state.localPointState.point_current)
    },

    async pointADD() {
      var db = this.$store.state.db
      var currentUserEmail = this.$store.state.loginState.currentUser.email
      var point_addValue = 0
      const docref = doc(db, "userData", currentUserEmail)


      if(this.$store.state.loginState.currentUser['uploadIndex'].length<=2) {
        point_addValue = Math.floor(this.$store.state.localSurveyState.price * 0.01)
      }

      else if(this.$store.state.loginState.currentUser['uploadIndex'].length>=3 && this.$store.state.loginState.currentUser['uploadIndex'].length<=9) {
        point_addValue = Math.floor(this.$store.state.localSurveyState.price * 0.02)
      }

      else if(this.$store.state.loginState.currentUser['uploadIndex'].length>=10) {
        point_addValue = Math.floor(this.$store.state.localSurveyState.price * 0.03)
      }

      this.$store.state.loginState.currentUser.point_current = this.$store.state.loginState.currentUser.point_current + point_addValue
      this.$store.state.loginState.currentUser.point_total = this.$store.state.loginState.currentUser.point_total + point_addValue

      //this.$store.state.localPointState.point_current = this.$store.state.currentUser.point_current
      //this.$store.state.localPointState.point_total = this.$store.state.currentUser.point_total


      await updateDoc(docref, { 
          point_current: this.$store.state.loginState.currentUser.point_current,
          point_total: this.$store.state.loginState.currentUser.point_total
        })

      this.$store.state.userData = []
      this.fetchUserData_point()
    },


    async sendToAdmin(dataset) {
      var lastID = await this.fetchLastID()
      var db = this.$store.state.db
      // var localLastID = this.$store.state.lastID[0].lastID
      var currentUserEmail = await this.$store.state.loginState.currentUser.email
      var nowDate= new Date()
      var orderNum = nowDate.getFullYear().toString().substring(2,4) + (nowDate.getMonth()+1).toString() + nowDate.getDate().toString() + lastID
      
      var d = nowDate.toLocaleDateString()
      var dd = d.replace(/ /g, "")
      var ddd = dd.split('.')

      var year = ddd[0]
      var month = ddd[1]
      var day = ddd[2]

      month = month.length == 2 ? month : '0' + month
      day = day.length == 2 ? day : '0' + day

      var D = year + '-' + month + '-' + day
      
      
        await setDoc(doc(db, "surveyData", lastID.toString()), {
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
          uploaderEmail:currentUserEmail,
          
          adminApproved : dataset.adminApproved,
          uploader : dataset.uploader,
          uploadTime : new Date(),
          uploadDate : D,
          id : lastID,
          dueDate: dataset.dueDate,
          dueTimeTime: dataset.dueTimeTime,
          dueTimeTimeTime: dataset.dueTimeTimeTime,
          priceIdentity: dataset.identity,

          orderNum: orderNum,

          progress : 0

                
        })


        var idDocref = doc(db, "lastID", "lastID")
        var currentUserRef = doc(db, "userData", currentUserEmail)
        await updateDoc(idDocref, {
          lastID : (lastID + 1)
        }).then(
          // console.log('LastID 올리기 완료')
          )

        await updateDoc(currentUserRef, {
          uploadIndex: arrayUnion(lastID)
        })

        // console.log(dataset)

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

      },

      async fetchLastID(){
        const db = this.$store.state.db
        const lastID = []
        const querySnapshot = await getDocs(collection(db, "lastID"))
        querySnapshot.forEach((doc) => {
          lastID.push(doc.data())
        })
        // console.log('fetch LastID')
        // console.log(lastID[0].lastID)
        return lastID[0].lastID
      },



  },
  
  

}
</script>

<style>
.PaymentMethod {
  background: #EEEEEE 0% 0% no-repeat padding-box;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 15px;
  font-family: 'Noto Sans KR', sans-serif;
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
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #EEEEEE;
  justify-content: center;
  width: 282px;
  height: 10px;
  border-radius: 9px;
  margin-top: 20px;
  border: 1px solid rgb(187, 187, 187);
  padding: 15px;
  font-size: 14px;
 
}
#Account-input:focus{
  outline: none;
  border: 1.5px solid #0AAB00;
}
.PaymentMethod-container input::placeholder {
  text-align: left;
  font-family: 'Noto Sans KR';
  font-size: 15px;
  letter-spacing: 0px;
  color: #BCBCBC;
  opacity: 1;
}
.PaymentMethod-text {
  font-family: 'Noto Sans KR';
  font-size: 11px;
  font-weight: normal;
  margin-top: 35px;
  line-height: 19px;
}
.Payment-btn {
  background-color: #EEEEEE;
  border: 1px solid #0CAE02;
  padding: 10px 20px;
  margin-top: 20px;
  color: #0CAE02;
  font-family: 'Noto Sans KR';
  font-size: 1.1rem;
  font-weight: medium;
  border-radius: 26px;
  cursor: pointer; 
}
.Payment-btn:hover{
  color: white;
  background-color: #0AAB00;
}
</style>