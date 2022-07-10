<template>
<h1 class="admin-title">패널 정보</h1>
<div id="panelInfo-container">
<div class="admin-info-container">
  <table class="admin-table" id="admin-info-table">
    <tr id="th">
      <th>uid</th>
      <th>이름</th>
      <th>메일</th>
      <th>전화번호</th>
      <th>성별</th>
      <th>출생년도</th>
      <th>정산 총액</th>
      <th>유입경로</th>
      <th>영어 설문</th>
      <th>가구형태</th>
      <th>가구형태(ios)</th>
      <th>마케팅 수신동의</th>
    </tr>


    <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.info[0].name">
      <td>{{item.info[0].uid}}</td>
      <td>{{item.info[0].name}}</td>
      <td>{{item.info[0].email}}</td>
      <td>{{item.info[0].phoneNumber}}</td>
      <td>{{item.info[0].gender}}</td>
      <td>{{item.info[0].birthDate.substring(0,4)}}</td>
      <td>{{item.info[0].reward_total}}</td>
      <td>{{item.info[0].inflowPath}}</td>
      <td>{{item.FirstSurvey[0].EngSurvey}}</td>
      <td>{{item.FirstSurvey[0].family}}</td>
      <td>{{item.FirstSurvey[0].housingType}}</td>
      <td>{{item.info[0].marketingAgree}}</td>

      <!-- <td></td>
      <td>{{item.info[0].marketingAgree}}</td> -->

    </tr>
  </table>
  
  </div>
</div>

</template>

<script>
import { where, getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore'
export default {
  mounted() {
    this.$store.state.adminAppUserData = []
    this.fetchPanelInfo()
  },
  methods: {
    async fetchPanelInfo(){
      const db = this.$store.state.db
      const adminAppUserData = this.$store.state.adminAppUserData
      
      const querySnapshot = await getDocs(collection(db,"panelData"))
      querySnapshot.forEach((doc) => {
        var info = []
        if(doc.data().didFirstSurvey == true) {
          info.push(doc.data())
          this.fetchPanelMyList(doc.data().uid, info)
        }
      })
      
    },

    async fetchPanelMyList(uid, info) {
      const db = this.$store.state.db
      const adminAppUserData = this.$store.state.adminAppUserData

      var respondedSurvey = []
      var FirstSurvey = []
      
      const querySnapshot = await getDocs(collection(db, "panelData", uid, "UserSurveyList"))
      querySnapshot.forEach((doc) => {
          if(doc.data().isSent == false) {
            respondedSurvey.push(doc.data().id)
          }
      })

      const docRef = collection(db, "panelData", uid, "FirstSurvey")
      const querySnapshot2 = await getDocs(docRef)
      if(querySnapshot2 != null) {
        querySnapshot2.forEach((doc) => {
          FirstSurvey.push(doc.data())
          //console.log(FirstSurvey)
        })
      }
      

      var panel = { uid: uid, info: info, respondedSurvey : respondedSurvey, FirstSurvey : FirstSurvey }
      adminAppUserData.push(panel)
      //console.log(panel)
    }


  },
}
</script>

<style>
#panelInfo-container {
  padding-top: 20px;
  display: inline-block;
  justify-content: center;
  width: 80%;
}
.admin-title {
  margin: 30px 0 40px 0;
  color: #000000;
}
#admin-info-table {
  width: 100%;
}


</style>