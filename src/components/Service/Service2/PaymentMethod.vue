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
      <button class="Payment-btn" @click="sendToAdmin(this.$store.state.localSurveyState)">결제하기</button>
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

    }
  },

  methods: {
    setOption3() {
      this.uploader = this.$store.state.currentUser.email
      this.$store.commit('setSurveyMutation3', {account_userName: this.accont_userName, uploader: this.uploader})
      console.log(this.$store.state.localSurveyState)
    },


    async sendToAdmin(dataset) {
      var db = this.$store.state.db
      var localLastID = this.$store.state.lastID[0].lastID
      var currentUserEmail = await this.$store.state.currentUser.email
      
        await setDoc(doc(db, "adminRequired", localLastID.toString()), {
          price : dataset.price,
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
          
          adminApproved : dataset.adminApproved,
          uploader : dataset.uploader,
          uploadTime : new Date(),
          id : localLastID
                
        })

        var idDocref = doc(db, "lastID", "lastID")
        var currentUserRef = doc(db, "userData", currentUserEmail)
        await updateDoc(idDocref, {
          lastID : (localLastID + 1)
        })

        await updateDoc(currentUserRef, {
          uploadIndex: arrayUnion(localLastID)
        })

        console.log("fin")

        this.$router.push('/servicepaydone')


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
  width: 100px;
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