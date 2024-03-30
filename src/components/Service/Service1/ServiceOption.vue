<template>
 <div class="container">
		<div class="row justify-content-center align-items-center">
			    <div class="shadow rounded p-3 bg-white">
            <h3 class="service-title m-3">설문 응답 서비스</h3>
			        <div class="row">
                  <div class="row form-group">
                    <div class="col-6">
                            <p class="form-title m-1">요구 응답수</p>
                            <select class="form-select m-1" v-model="priceRequireHeadCount" aria-label="Default select example">
                              <option :value=0 selected disabled hidden>요구 응답수</option>
                              <option :value=1>30명</option>
                              <option :value=2>40명</option>
                              <option :value=3>50명</option>
                              <option :value=4>60명</option>
                              <option :value=5>70명</option>
                              <option :value=6>80명</option>
                              <option :value=7>90명</option>
                              <option :value=8>100명</option>
                              <option :value=9>120명</option>
                              <option :value=10>140명</option>
                              <option :value=11>160명</option>
                              <option :value=12>180명</option>
                              <option :value=13>200명 (최대 응답수)</option>
                            </select>
                            </div>
                            <div class="col-6">
                            <p class="form-title m-1">소요 시간</p>
                            <select class="form-select m-1" v-model="priceSpendTime">
                              <option :value=0 selected disabled hidden>소요 시간</option>
                              <option :value=1>1분 이내</option>
                              <option :value=2>1-3분</option>
                              <option :value=3>4-6분</option>
                              <option :value=4>7-10분</option>
                              <option :value=5>11-15분</option>
                              <option :value=6>16-20분</option>
                            </select>
                            </div>
        </div>

          <!-- 마감 시간 -->
          <div class="form-group row">
            <p class="form-title m-1">마감시간 지정</p>
            <div class="col-6">
              <input type="Date" class="form-select m-1" :min="getDateStr_min" :max="getDateStr_max" v-model="aa" required> 
            </div>
            <div class="col-6">
              <input type="time" class="form-select m-1" v-model="bb" required>
            </div>
            <p class="warn m-2">*마감날짜와 마감시간 중 공란이 존재할 경우 설문 게시가 어려울 수 있습니다.</p>
          </div>

          <!-- 설문 대상 타겟팅 -->
          <div class="form-group row">
            <p class="form-title m-1">설문 대상</p>
            <div class="col-6">
              <select class="form-select m-1" id="target_gender" v-model="targetGenderOption">
                <option :value=0 selected disabled hidden>대상 성별</option>
                <option :value=1>성별 무관</option>
                <option :value=2>남성</option>
                <option :value=3>여성</option>
              </select>
            </div> 

            <div class="col-6">
              <select class="form-select m-1" id="target_age" v-model="targetAgeOption">
                <option :value=0 selected disabled hidden>대상 연령</option>
                <option :value=1>연령 무관</option>
                <option :value=2>연령 옵션 선택하기</option>
              </select>
            </div>          

            <div v-if="targetAgeOption==2" class="col-11" id="checkbox-container">
              <div id="checkbox-row">
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" type="checkbox" name="selectedAges" value="20-24세"> 
                  <div id="checkbox-text">20-24세</div>
                </div>
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" type="checkbox" name="selectedAges" value="40-44세">
                  <div id="checkbox-text">40-44세</div>
                </div>
              </div>

              <div id="checkbox-row">
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" @click="calculateAge" type="checkbox" name="selectedAges" value="25-29세">
                  <div id="checkbox-text">25-29세</div>
                </div>
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" @click="calculateAge" type="checkbox" name="selectedAges" value="45-49세">
                  <div id="checkbox-text">45-49세</div>
                </div>           
              </div>

              <div id="checkbox-row">
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" @click="calculateAge" type="checkbox" name="selectedAges" value="30-34세">
                  <div id="checkbox-text">30-34세</div>
                </div>
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" @click="calculateAge" type="checkbox" name="selectedAges" value="50대">
                  <div id="checkbox-text">50대</div>
                </div>           
              </div>

              <div id="checkbox-row">
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" @click="calculateAge" type="checkbox" name="selectedAges" value="35-39세">
                  <div id="checkbox-text">35-39세</div>
                </div>
                <div id="checkbox-item">
                  <input v-model="targetAgeOptionList" :true-value="[]" @click="calculateAge" type="checkbox" name="selectedAges" value="60대">
                  <div id="checkbox-text">60대</div>
                </div>           
              </div>
            </div>
                 
            <p class="warn m-2">*다음 주문 페이지에서 설문 대상 상세정보를 기입할 수 있습니다.</p>   
          </div>

          <div id="blank"></div>          

          <!-- 영어 설문 -->
          <div class="row-cols-2">
            <p class="form-title m-1">영어설문</p>
            <div id="checkbox-item-eng"> 
              <input class="form-check-input" v-model="addENTarget" @click="EngOptionCal" type="checkbox" name="Eng" id="Eng">
              <label id="checkbox-text-eng" for="Eng">{{ this.EngText }}</label>
            </div>            
          </div> 

          <div id="show-price-container">
            <span id="show-price-title">주문 금액</span>
            <span class="service-option-discountprice-price m-0 text-right">{{ this.priceToString(this.calculate_before)}}원</span>
          </div>

          <hr id="line">

          <!-- 할인 대상  -->
          <div class="row-cols-2">
            <p class="form-title m-1">대학생 / 대학원생 할인 여부</p>
            <select class="form-select m-1" id="identity" v-model="priceIdentity">
              <option :value=0 selected disabled hidden>대학생 / 대학원생 할인 여부</option>
              <option :value=1>중/고등학생입니다.</option>
              <option :value=2>대학생입니다.</option>
              <option :value=3>대학원생입니다.</option>
              <option :value=4>할인대상이 아닙니다.</option>
            </select>
          </div>

          <div id="show-price-container">
            <span id="show-price-title">할인 금액</span>
            <span class="service-option-discountprice-price m-0 text-right">
              - {{ this.priceToString(this.calculate_before - this.calculate)}}원</span>
          </div>

          <hr id="line">

          <div id="show-price-container">
            <span id="show-price-title">결제 금액</span>
            <span class="service-option-totalprice-price m-0 text-right">
              {{ this.priceToString(this.calculate)}}원</span>
          </div>

        </div>

        <div id="btn-fin">
          <div class="text-center">
            <!-- <a class="btn btn-primary w-75" @click="setOption1()">설문 정보 입력하러 가기</a> -->
            <span id="stop-temp-title"><br>재정비를 위해 잠깐 쉬어갑니다.<br>중단 기간 : 2024.03.31 ~ 2024.04.04</span>

          </div>
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

      targetAgeOption: 0,        // 1 (연령무관)   2 (옵션선택)
      targetAgeOptionList: [],   // 선택한 연령 옵션

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
    },

    calculateAge() {
      console.log(this.targetAgeOptionList)
    },


    calculate_before() {
      var p = Math.ceil(parseFloat(parseFloat(this.$store.state.priceTable[this.priceSpendTime][this.priceRequireHeadCount])
                      // * parseFloat(this.$store.state.IdentityOptionArray[this.priceIdentity])
                      * parseFloat(this.$store.state.EngOptionArray[this.EngOptionCal])
                      * parseFloat(this.$store.state.AgeOptionArray[this.targetAgeOptionList.length])
                      * parseFloat(this.$store.state.genderOptionArray[this.targetGenderOption])
                      + parseFloat(this.$store.state.TimeOptionArray[this.timeOptionCal])
                    ).toFixed(0) / 10) * 10
      
      this.price = p
      return p
    },

    calculate() {
      var p = Math.ceil(parseFloat(parseFloat(this.$store.state.priceTable[this.priceSpendTime][this.priceRequireHeadCount])
                      * parseFloat(this.$store.state.IdentityOptionArray[this.priceIdentity])
                      * parseFloat(this.$store.state.EngOptionArray[this.EngOptionCal])
                      * parseFloat(this.$store.state.AgeOptionArray[this.targetAgeOptionList.length])
                      * parseFloat(this.$store.state.genderOptionArray[this.targetGenderOption])
                      + parseFloat(this.$store.state.TimeOptionArray[this.timeOptionCal])
                    ).toFixed(0) / 10) * 10
      
      this.price = p
      return p
    }
  },
  methods: {    
    show() {
      //console.log(this.targetAgeOptionList)
    },

    setOption1() {
      
      if((this.priceIdentity==0) || (this.priceSpendTime==0) || (this.priceRequireHeadCount==0) || (this.timeOptionCal==0) || (this.targetAgeOption==0) || (this.targetGenderOption==0) ) {
        alert("모든 옵션을 입력해주세요.")
      }

      else if(this.targetAgeOption == 2 && this.targetAgeOptionList.length == 0) {
        alert("연령 옵션을 1개 이상 선택해주세요.")
      }

      else if(this.timeOptionCal==6) {
        alert("마감 기한은 최소 18시간 이상부터 선택 가능합니다.")
      }

      else {       
        this.targetAgeOptionList.sort();
        this.timeOption = this.timeOptionCal;
        this.addENTarget = this.EngOptionCal;

        this.requiredHeadCount = String(this.$store.state.priceTextTable[0][this.priceRequireHeadCount]);
        this.spendTime = String(this.$store.state.priceTextTable[1][this.priceSpendTime]);
        this.dueTime = String(this.$store.state.priceTextTable[2][this.timeOption]);
        this.ENTarget = String(this.$store.state.priceTextTable[3][this.addENTarget]);
        this.identity = String(this.$store.state.priceTextTable[4][this.priceIdentity]);

        console.log(this.targetAgeOption + " " + this.targetAgeOptionList)
      
      
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
          targetingAgeOption : this.targetAgeOption,
          targetingAgeOptionList : this.targetAgeOptionList,
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

  .text-right {
    text-align: right;
  }

  .form-select {
    color:gray;
    font-size: 0.9em;
  }

  .warn {
    color: rgb(31, 189, 0);
    font-size: 0.6em;
  }

  .form-title {
    font-weight: bold;
    color:gray;
    font-size: 1.0em;
  }

  .service-title {
    text-align: center;
    color: primary;
  }

  #blank{
    margin-bottom: 10px;
  }

  #checkbox-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;  
  }

  #checkbox-row {
    display: flex;
    flex-direction: column;
  }

  #checkbox-item-eng {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    align-items: center;
  }

  #checkbox-text-eng {
    margin-left: 7px;
    color: rgb(88, 88, 88);
    font-size: 0.85rem;
  }

  #checkbox-item {
    display: flex;
    flex-direction: row;
  }

  #checkbox-text {
    margin-left: 3px;
    color: rgb(122, 122, 122);
    font-size: 0.8rem;
  }

  #show-price-container {
    align-items: center;
    text-align: right;
    padding-right: 20px;
    margin-top: 15px;
  }

  #show-price-title {
    margin-right: 15px;
  }

  #line {
    background:rgb(205, 205, 205);
    height: 1px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 15px;
  }

  #btn-fin {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  #stop-temp-title{
    padding-top: 40px;
    margin-top: 40px;
  }
</style>