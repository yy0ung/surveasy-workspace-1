<template>
<div class="ServiceOption">
  <div class="serviceOption-container">
      <div id="service-option-title"><h1>설문 응답 서비스</h1></div>
        <div>
          <select class="form-select" v-model="priceRequireHeadCount" aria-label="Default select example">
            <option :value=0 selected disabled hidden>요구 응답수</option>
            <option :value=1>30명</option>
            <option :value=2>40명</option>
            <option :value=3>50명</option>
            <option :value=4>60명</option>
            <option :value=5>70명</option>
            <option :value=6>80명 (최대 응답수)</option>
            <!-- <option :value=7>90명</option>
            <option :value=8>100명</option> -->
          </select>
          <p class="m-0">소요시간</p>
          <select class="form-select" v-model="priceSpendTime">
            <option :value=0 selected disabled hidden>소요 시간</option>
            <option :value=1>1-3분</option>
            <option :value=2>4-6분</option>
            <option :value=3>7-10분</option>
            <option :value=4>11-15분</option>
            <option :value=5>16-20분</option>
          </select> 

          <br>
          <li class="hasTitleOption">
            <span class="option-title">마감기한 지정</span>
            <input type="Date" class="date" :min="getDateStr_min" :max="getDateStr_max" v-model="aa" required> 
            <input type="time" class="time" v-model="bb" required>
            <p class="warn-msg">마감날짜와 마감시간 중 공란이 존재할 경우 <br> 설문 게시가 어려울 수 있습니다.</p>
          </li>

          <!-- 설문 대상 타겟팅 관련 -->
          <li class="hasTitleOption">
            <span class="option-title">설문 대상</span>
            
              <select class="selectbox-target" id="target_age" v-model="targetAgeOption">
              <option :value=0 selected disabled hidden>대상 연령</option>
              <option :value=1>전 연령</option>
              <option :value=2>20대</option>
              <option :value=3>20세 이상 24세 이하</option>
              <option :value=4>25세 이상 29세 이하</option>
              <option :value=5>20세 이상 39세 이하</option>
              <option :value=6>20세 이상 49세 이하</option>
            </select>
            <select class="selectbox-target" id="target_gender" v-model="targetGenderOption">
              <option :value=0 selected disabled hidden>대상 성별</option>
              <option :value=1>성별 무관</option>
              <option :value=2>남성</option>
              <option :value=3>여성</option>
            </select>
            <p id="service-option-notice">다음 주문 페이지에서 설문 대상 상세정보를 기입할 수 있습니다.</p>   
          </li>

          <li class="hasTitleOption">
            <span class="option-title">영어설문</span> 
            <label class="switch">
              <input v-model="addENTarget" @click="EngOptionCal" type="checkbox" class="EngRadio" name="Eng">
              <span class="slider"></span>
            </label>
            <span class="Eng-text">{{ this.EngText }}</span>
          </li>
          
    
        
          <select class="selectbox" v-model="priceIdentity">
            <option :value=0 selected disabled hidden>대학생 / 대학원생 할인 여부</option>
            <option :value=1>대학생입니다.</option>
            <option :value=2>대학원생입니다.</option>
            <option :value=3>할인대상이 아닙니다.</option>
          </select>

          <p id="service-option-notice">결제 페이지에서 대학생 및 대학원생임을 인증해야만</p>
          <p id="service-option-notice">할인을 받으실 수 있습니다.</p>
        
          <br>
        
          <div class="show-price-container">
            <span class="service-option-totalprice-word">총 금액</span>
            <span class="service-option-totalprice-price">
              {{ priceToString(Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceRequireHeadCount])
                +Number(this.$store.state.EngOptionArray[EngOptionCal])
                +Number(this.$store.state.TimeOptionArray[timeOptionCal])) }}원</span>
          </div>
        
          <div>
            
            <button class="goServicePay-btn" @click="setOption1()">설문 정보 입력하러 가기</button>
            
          </div>
      </div>
  </div>
</div>
  
</template>


<script>
import { arrayUnion, doc, collection, setDoc, updateDoc, getDocs } from '@firebase/firestore';
export default {
  data() {
    return {
      currentTime : new Date(),
      priceIdentity:0,
      priceSpendTime:0,
      priceRequireHeadCount:0,
      addENTarget:0,
      timeOption:0,
      targetAgeOption:0,
      targetGenderOption:0,


      price: 0,
      identity: '',
      spendTime: '',
      requiredHeadCount: '',
      ENTarget: '',
      dueTime: '',

      EngText: '',

      ex: 0,

      today: new Date().toISOString().substring(0,10),
      min: new Date().toLocaleDateString().substring(0,10),

      aa:'12:00:00',
      bb:'',
      cc: this.aa+' '+this.bb,
      dd: new Date(),

    }
  },

  mounted() {
    this.fetchUserData_point()
    this.fetchAdminData_coupon()
  },

  computed :{
    getDateStr_min(){
      var today = new Date()
      var todayPlus9 = today.setHours(today.getHours()+9)
      var todayPlus9Date = new Date(todayPlus9)
      var min = todayPlus9Date.toISOString()
      var dddd= min.split('T')
      var ddddd = dddd[0]
      //console.log(ddddd)
      var dddddd= ddddd.split('-')

      
      
      var year = dddddd[0]
      var month = dddddd[1]
      var day = dddddd[2]

      month = month.length == 2 ? month : '0' + month
      day = day.length == 2 ? day : '0' + day

      var D = year + '-' + month + '-' + day
      // console.log(D)
      return D
    },

    getDateStr_max(){
      

      var today = new Date()
      var a = today.setDate(today.getDate()+7)
      var ad = new Date(a)
      var aa = ad.setHours(ad.getHours()+9)
      var m = new Date(aa)
      
      var max = m.toISOString()
      

      var dddd= max.split('T')
      var ddddd = dddd[0]
      
      var dddddd= ddddd.split('-')

      
      var year = dddddd[0]
      var month = dddddd[1]
      var day = dddddd[2]

      month = month.length == 2 ? month : '0' + month
      day = day.length == 2 ? day : '0' + day

      var D = year + '-' + month + '-' + day
      // console.log(D)
      return D
    },

    getTimeStr(){
      var time = new Date()
      var utc = time.getTime() + (time.getTimezoneOffset() *60 *1000)
      var kr_diff = 9*60*60*1000
      var krr = new Date(utc+(kr_diff))
      var now = krr.toString().substring(16,21)
      // console.log(now);
      return now
    },
    
    timeOptionCal(){
      var ab = this.aa + ' ' + this.bb
      var asdf = new Date(ab).getTime()
      var hourGap = parseInt((asdf - this.dd.getTime())/3600000) 
      var hourOptionIndex = 0

      

      if (hourGap >= 18 && hourGap < 24){
        hourOptionIndex = 1
      } else if (hourGap >= 24 && hourGap < 36){
        hourOptionIndex = 2
      } else if (hourGap >= 36 && hourGap < 48){
        hourOptionIndex = 3
      } else if (hourGap >= 48 && hourGap < 72){
        hourOptionIndex = 4
      } else if (hourGap >= 72){
        hourOptionIndex = 5
      } else if (hourGap <18) {
        hourOptionIndex = 6
      }

      //console.log('time', hourOptionIndex)
      return hourOptionIndex
    }, 
    EngOptionCal() {
      var EngIndex = 0
      var HeadCount = this.priceRequireHeadCount
      var Eng = this.addENTarget
      if(Eng==false) {
        EngIndex = 0
        this.EngText = "영어 설문이 아닙니다."
      }
      else if((HeadCount<=3) && (Eng==true)) {
        EngIndex = 1
        this.EngText = "영어 설문입니다."
      }
      else if((HeadCount>3) && (Eng==true)) {
        EngIndex = 2
        this.EngText = "영어 설문입니다."
      }
      return EngIndex
    }
  },
  methods: {    

    setOption1() {
      
      if((this.priceIdentity==0) || (this.priceSpendTime==0) || (this.priceRequireHeadCount==0) || (this.timeOptionCal==0) ) {
        alert("모든 옵션을 입력해주세요.")
      }

      else if(this.timeOptionCal==6) {
        alert("마감 기한은 최소 18시간 이상부터 선택 가능합니다.")
      }

      else {       
        this.timeOption = this.timeOptionCal;
        this.addENTarget = this.EngOptionCal;

        this.price = Number(this.$store.state.priceTable[this.priceIdentity][this.priceSpendTime][this.priceRequireHeadCount])
        +Number(this.$store.state.EngOptionArray[this.addENTarget])
        +Number(this.$store.state.TimeOptionArray[this.timeOption]);
      
        this.requiredHeadCount = String(this.$store.state.priceTextTable[0][this.priceRequireHeadCount]);
        this.spendTime = String(this.$store.state.priceTextTable[1][this.priceSpendTime]);
        this.dueTime = String(this.$store.state.priceTextTable[2][this.timeOption]);
        this.ENTarget = String(this.$store.state.priceTextTable[3][this.addENTarget]);
        this.identity = String(this.$store.state.priceTextTable[4][this.priceIdentity]);
      
      
        this.$store.commit('setSurveyMutation1', {
          price: this.price, 
          beforeCouponPrice: this.price, 
          requiredHeadCount: this.requiredHeadCount, 
          spendTime: this.spendTime, 
          dueTime: this.dueTime, 
          ENTarget: this.ENTarget, 
          identity: this.identity, 
          dueDate: this.aa, 
          dueTimeTime: this.bb,
          targetingAge : this.targetAgeOption,
          targetingGender: this.targetGenderOption
        });

        this.$store.commit('setSurveyDueTime', {dueDate: this.aa, dueTime: this.bb})

        this.$store.commit('setCouponDiscountEmpty')
        this.$store.commit('setPointDiscountEmpty')
        

        if(this.$store.state.loginState.isLoggedIn==false) {
          alert('로그인이 필요한 서비스입니다.')
          this.$store.state.notLoggedInService = false
          // console.log('notLoggedInService')
          this.$router.push('/login')
          
        }
        if(this.$store.state.loginState.isLoggedIn==true) {
          
          this.$router.push('/servicepay');
          // console.log('isLoggedInService')
        }

        this.fetchUserData_point()
        //this.fetchAdminData_coupon()
        
      

        }
        
      },

      async fetchAdminData_coupon() {
        const db = this.$store.state.db

          this.$store.state.adminCoupon = []
          this.$store.state.myCoupon = []
        
        const adminCoupon = this.$store.state.adminCoupon
        
        const querySnapshot = await getDocs(collection(db, "couponData"))
        querySnapshot.forEach((doc) => {
          adminCoupon.push(doc.data())
        })

        const myCoupon_group_X = adminCoupon.filter(item => item.forGroup===false &&(item.user===this.$store.state.loginState.currentUser.email) && item.isUsed===false && item.outOfDate===false)
        const myCoupon_group_O = []

        const Coupon_group_O_yet = adminCoupon.filter(item => item.forGroup===true && item.isUsed===false && item.outOfDate===false)
        
        for(var i=0 ; i<Coupon_group_O_yet.length ; i++) {
            for(var j=0 ; j<Coupon_group_O_yet[i].user.length ; j++) {

              if(Coupon_group_O_yet[i].user[j].user == this.$store.state.loginState.currentUser.email && Coupon_group_O_yet[i].user[j].used == false) {
                //console.log(Coupon_group_O_yet[i])
                myCoupon_group_O.push(Coupon_group_O_yet[i])
              }

            }
          
          }

          const myCoupon = myCoupon_group_X.concat(myCoupon_group_O)
          this.$store.state.myCoupon = myCoupon
        //console.log(this.$store.state.myCoupon)
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

      priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    
 
    }     
  
  }
</script>

<style>
  .serviceOption-container {
    max-width:950px;
    margin:auto;
  }
</style>