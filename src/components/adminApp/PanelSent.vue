<template>

<div id="container-top">
  선택된 개수 {{sentCheckArray.length}}
  <button id="sent-all-btn" @click="sentAllFin">정산 완료</button>
</div>
 
<div class="admin-info-content">
  <tr>
    <th>이름</th>
    <th>계좌주</th>
    <th>메일</th>
    <th>전화번호</th>
    <th>참여 설문</th>
    <th>은행</th>
    <th>계좌번호</th>    
    <th>정산금액</th>
    <th>check box</th>
  </tr>

    <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.info[0].uid" class="list" :class="{active:item.info[0].reward_current == 0}">
    <td>{{item.info[0].name}}</td>
    <td>{{item.info[0].accountOwner}}</td>
    <td>{{item.info[0].email}}</td>
    <td>{{item.info[0].phoneNumber}}</td>
    <td>{{item.respondedSurvey}}</td>
    <td>{{item.info[0].accountType}}</td>
    <td>{{item.info[0].accountNumber}}</td>
    <td>{{item.info[0].reward_current}}</td>
    <td><input type="checkbox" id="done" @click="addArray(item.info[0].uid)"></td>
    <td id="sentBtn"><button @click="sentFin(item.info[0].uid, item.respondedSurvey)">정산 완료</button></td>

  </tr>
 
</div>
</template>

<script>
import { getFirestore,collection, getDocs, query, doc, where, setDoc, getDoc, updateDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      sentCheckArray :[]
      
    }
  },
  created() {
    this.$store.state.adminAppUserData = []
    this.fetchPanelInfo()
  },
  methods: {

    sentFin(Id, respondedSurvey) {
      this.clearCurrent(Id)
      this.updateIsSent(Id, respondedSurvey)
    },
    //array에 넣기, 체크 박스 false 되면 리스트에서 빼기
    async addArray(Id){
      if(this.sentCheckArray.includes(Id)){
        this.sentCheckArray = this.sentCheckArray.filter((e) => e !== Id)
        console.log(this.sentCheckArray)
      }else{
        this.sentCheckArray.push(Id)
        console.log(this.sentCheckArray)
      }
    },

    async sentAllFin(){
      const db = this.$store.state.db
      for(var i=0; i<this.sentCheckArray.length; i++){
        var respondedSurvey = []
      
        const querySnapshot = await getDocs(collection(db, "AndroidUser", this.sentCheckArray[i], "UserSurveyList"))
        querySnapshot.forEach((doc) => {
          if(doc.data().isSent == false) {
            console.log("survey list : " + doc.data().lastIDChecked)
            respondedSurvey.push(doc.data().lastIDChecked.toString())
          }
      })

        this.clearCurrent(this.sentCheckArray[i])
        this.updateIsSent(this.sentCheckArray[i], respondedSurvey)

      }
    },
    
    async updateIsSent(Id, respondedSurvey) {
      const db = this.$store.state.db
      const rs = respondedSurvey

      for(const item of rs) {
        console.log(item)
        var itemRef = doc(db, "AndroidUser", Id, "UserSurveyList", item.toString())
        await updateDoc(itemRef, {
          isSent : true
        })
      }
    },


    async clearCurrent(Id){
      const db = this.$store.state.db
      const rewardRef = doc(db, "AndroidUser", Id.toString())
      await updateDoc(rewardRef, {
        reward_current : 0
      })
      if(confirm("정산완료")){
        this.$router.go()
      }
     // window.alert('정산 완료')
    },

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
            console.log("survey list : " + doc.data().lastIDChecked)
            respondedSurvey.push(doc.data().lastIDChecked.toString())
          }
      })
      var panel = { uid: uid, info: info, respondedSurvey : respondedSurvey }
      adminAppUserData.push(panel)
    }

    
  },
}
</script>

<style>
.list.active {
  display: none;
}
#sentBtn{
  padding-top: 10px;
}

</style>