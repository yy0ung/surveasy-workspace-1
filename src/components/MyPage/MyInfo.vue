<template>
        <div class="col-lg-12 pt-4 mx-2">
        <h5>나의 정보</h5>
      </div>
  <div class="col-xl-12">
      <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
      <p class="text-primary">회원 정보</p>
      <hr>
      <div class="row p-3">
        <span class="col-auto">이메일</span>
        <span class="col"></span>
        <span class="col-auto">{{this.$store.state.loginState.currentUser['email']}}</span>
      </div>
      <div class="row p-3">
        <span class="col-auto">이름</span>
        <span class="col"></span>
        <span class="col-auto">{{this.$store.state.loginState.currentUser['name']}}</span>
      </div>
      <div class="row p-3">
        <span class="col-auto">휴대폰 번호</span>
        <span class="col"></span>
        <span class="col-auto">{{this.$store.state.loginState.currentUser['phoneNumber']}}</span>
      </div>
      <div class="row p-3">
        <span class="col-auto">생년월일</span>
        <span class="col"></span>
        <span class="col-auto">{{this.$store.state.loginState.currentUser['birth']}}</span>
      </div>
      <div class="row p-3">
        <span class="col-auto">할인대상</span>
        <span class="col"></span>
        <span class="col-auto">{{this.$store.state.PointUserData[0].identity}}</span>
      </div>
      <hr>
      <ul class="text-right pt-3">
      <li>*회원정보 수정을 원하실 경우<u><a class="text-primary" href="http://pf.kakao.com/_xfialK/chat" target="_blank">서베이지 카카오톡 채널</a></u>로 문의 바랍니다.</li>
      </ul>
      </div>
    </div>
    <div class="col-xl-12">
      <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
      <span class="text-primary">이벤트혜택 수신 설정 (마케팅 정보)</span>
      <hr>
      <div class="row">
            <ul>
            <li>*구매 정보, 회원정보 수정, 공지, CS 알림은 수신설정에 상관없이 발송됩니다.</li>
            </ul>
            <div class="form-check m-2 col-6"> 
              <input class="form-check-input" type="checkbox" name="message" v-model="marketingTF.marketingSMS"> SMS / 카카오톡
            </div>
            <div class="form-check m-2 col-6"> 
              <input class="form-check-input" type="checkbox" name="mail" v-model="marketingTF.marketingEmail"> 이메일
            </div>
            <div class="text-center pt-2">
              <a class="btn btn-primary w-30" @click="marketingAgree(this.marketingTF)">저장</a>
           </div>
      </div>
      </div>
      </div>
      <!-- 회원탈퇴 7일 내에 재로그인 <- 어떤 방식으로 할건지 -->
      <div class="row">
        <div class="col-xl-12">
        <div class="text-right m-2">
        <router-link to="/withdraw"><a class="btn btn-outline-primary">회원 탈퇴하기 ></a></router-link>
        </div>
        </div>
      </div>
</template>

<script>

import {doc, collection, getDocs, updateDoc, setDoc} from 'firebase/firestore'


export default {
  data(){
    return {
      // identityRequest: '',
      marketingTF:{
        marketingSMS: false,
        marketingEmail: false
      },

      identity: ''
      
    }
  },

  mounted() {
    this.fetchUserData_point()
  },


  methods: {
    async fetchUserData(){
      const db = this.$store.state.db
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      
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


    // async sendRequestVerifyIdentity(requestInfo) {
    //   const db = this.$store.state.db
    //   const currentUser = this.$store.state.loginState.currentUser

    //   if(this.$store.state.loginState.currentUser.identity == 'default' && this.$store.state.loginState.currentUser.identity_request == false) {
    //     // console.log(this.$store.state.loginState.currentUser.identity)


    //     await setDoc(doc(db, "identityVerifyRequired", currentUser.email.toString()), {
    //       requestIdentity: requestInfo.request,
    //       requestApproved: false,
    //       requestName: currentUser.name,
    //       requestEmail : currentUser.email
        
    //     })
    //     await updateDoc(doc(db, "userData", currentUser.email.toString()), {
    //       identity_request: true
        

    //   }).then(
    //     alert("요청이 전송되었습니다 !")
    //   )
    //   this.$store.state.userData = []
    //     await this.fetchUserData()
    //     // console.log(this.$store.state.loginState.currentUser.identity_request)
    //   }
    //   else {
    //     alert('이미 인증을 완료하셨습니다.')
    //   }
    // },

    async marketingAgree(TF) {
      const db = this.$store.state.db
      const currentUser = this.$store.state.loginState.currentUser
      await updateDoc(doc(db, "userData", currentUser.email.toString()), {
        marketingSMS : TF.marketingSMS,
        marketingEmail : TF.marketingEmail
      }).then(
        alert('저장되었습니다.')
      )

    },

    
  },


}
</script>

<style>
#myinfo-container{
  min-width: 1190px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Noto Sans KR', sans-serif;
  padding-bottom:50px;
}
.top-box, .bottom-box{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #0000000D;
  border-radius: 15px;
  opacity: 1;
  width: 650px;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 50px;
  padding-left: 50px;
  padding-top: 25px;
  padding-bottom: 25px;
}
.green-title{
  color: #0AAC00;
  font-size: 1rem;
  margin-bottom: 25px;
}
.info-title{
  font-size: 0.9rem;
  display: flex;
  margin-bottom: 25px;
}
.info-detail{
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 25px;
}
.info-content{
  display: flex;
  
}
.info-contents1{
  margin-right: 100px;
}
.btn-info{
  font-family: 'Noto Sans KR', sans-serif;
  padding: 7px 20px;
  font-size: 0.95rem;
  border: 1px solid #11AC04;
  border-radius: 26px;
  opacity: 1;
  color: #0AAC00;
  background-color: white;
  margin-top: 10px;

}
.btn{
  text-align: center;
}
.btn-info:hover{
  color: white;
  background-color: #0AAC00;
}
.top-box{
  margin-bottom: 30px;
}
.info-detail-gray{
  margin-left: 10px;
  color: #848484;
  font-size: 0.8rem;
  margin-top: 2px;
}
.info-contents .input-{
  font-weight: 300;
  font-size: 0.9rem;
  margin-bottom: 20px;
}
.more{
  margin-left: 600px;  
  
}
.edit-ment{
  font-size: 0.8rem;
  text-align: center;
  color: #848484;
}
/* #middle-select{
  border-radius: 10px;
  width: 250px;
  height: 28px;
  margin-bottom: 20px;
  padding: 3px 5px;
  font-family: 'Noto Sans KR', sans-serif;
  border: 0.1px solid black;
}
.middle-box .green-title{
  margin-top: 10px;
  
} */
.mi-detail{
  font-size: 0.8rem;
}
/* .mi-btn{
  font-family: 'Noto Sans KR', sans-serif;
  border: 1px solid #0AAC00;
  border-radius: 10px;
  opacity: 1;
  font-size: 0.8rem;
  padding: 5px 10px;
  color: #0AAC00;
  background-color: white;
  margin-left: 20px;
}
.mi-btn:hover{
  color: white;
  background-color: #0AAC00;
} */
#info-green{
  color: #0AAC00;
}
.mi-detail{
  color: #848484;
}
#k-link{
  color: black;
  text-decoration: underline;
}
</style>