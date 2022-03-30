<template>
<div id="admin-container">
  
<div class="admin-info-content">
  <tr id="th">
    <th>이름</th>
    <th>메일</th>
    <th>전화번호</th>
    <th>성별</th>
    <th>출생년도</th>
    <th>정산 총액</th>
    <th>유입경로</th>
    <th>마케팅 수신동의</th>
  </tr>


  <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.info[0].name">
    <td>{{item.info[0].name}}</td>
    <td>{{item.info[0].email}}</td>
    <td>{{item.info[0].phoneNumber}}</td>
    <td>{{item.info[0].gender}}</td>
    <td>{{item.info[0].birthDate.substring(0,4)}}</td>
    <td>{{item.info[0].reward_total}}</td>
    <td>{{item.info[0].inflowPath}}</td>
    <td>{{item.info[0].marketingAgree}}</td>

  </tr>
</div>
</div>

</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore'
export default {
  mounted() {
    this.$store.state.adminAppUserData = []
    this.fetchPanelInfo()
  },
  methods: {
    async fetchPanelInfo(){
      const db = this.$store.state.db
      const adminAppUserData = this.$store.state.adminAppUserData
      
      const querySnapshot = await getDocs(collection(db,"AndroidUser"))
      querySnapshot.forEach((doc) => {

        var info = []
        info.push(doc.data())

        this.fetchPanelMyList(doc.data().uid, info)

      })

      console.log(adminAppUserData)
    },

    async fetchPanelMyList(uid, info) {
      const db = this.$store.state.db
      const adminAppUserData = this.$store.state.adminAppUserData

      var respondedSurvey = []
      
      const querySnapshot = await getDocs(collection(db, "AndroidUser", uid, "UserSurveyList"))
      querySnapshot.forEach((doc) => {
          if(doc.data().isSent == false) {
            respondedSurvey.push(doc.data().id)
          }
      })
      var panel = { uid: uid, info: info, respondedSurvey : respondedSurvey }
      adminAppUserData.push(panel)
    }


  },
}
</script>

<style>
.admin-info-content th,.admin-info-content td{
  padding-left: 10px;
  padding-right: 10px;
}

</style>