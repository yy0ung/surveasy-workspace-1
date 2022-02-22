<template>
<div id="admin-panelSent">
정산
</div>  
<div class="admin-info-content">
  <tr>
    <th>name</th>
    <th>email</th>
    <th>phoneNumber</th>
<<<<<<< HEAD
    <th>responded survey ID</th>
=======
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
    <th>sent</th>
    <th>sentDone</th>
  </tr>

<<<<<<< HEAD
    <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.info[0].uid" class="list" :class="{active:item.info[0].reward_current == 0}">
    <td>{{item.info[0].name}}</td>
    <td>{{item.info[0].email}}</td>
    <td>{{item.info[0].phoneNumber}}</td>
    <td>{{item.respondedSurvey}}</td>
    <td>{{item.info[0].reward_current}}</td>
    <td><input type="checkbox" id="done"></td>
    <td><button @click="sentFin(item.info[0].uid, item.respondedSurvey)">정산 완료</button></td>
=======
    <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.uid" class="list" :class="{active:item.reward_current == 0}">
    <td>{{item.name}}</td>
    <td>{{item.email}}</td>
    <td>{{item.phoneNumber}}</td>
    <td>{{item.reward_current}}</td>
    <td><input type="checkbox" id="done"></td>
    <td><button @click="clearCurrent(item.uid)">정산 완료</button></td>
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
  </tr>
 
</div>
</template>

<script>
import { getFirestore,collection, getDocs, query, doc, where, setDoc, getDoc, updateDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      
    }
  },
  created() {
<<<<<<< HEAD
    this.$store.state.adminAppUserData = []
    this.fetchPanelInfo()
  },
  methods: {

    sentFin(Id, respondedSurvey) {
      this.clearCurrent(Id)
      this.updateIsSent(Id, respondedSurvey)
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

=======
    this.$store.state.adminAppUserSentData = []
    this.fetchPanelSentInfo()
  },
  methods: {
    async fetchPanelSentInfo(){
      const db = this.$store.state.db
      const adminAppUserSentData = this.$store.state.adminAppUserSentData
      
      const querySnapshot = await getDocs(collection(db,"AndroidUser"))
      querySnapshot.forEach((doc) => {
        adminAppUserSentData.push(doc.data())
      })
      
    },
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
    async clearCurrent(Id){
      const db = this.$store.state.db
      const rewardRef = doc(db, "AndroidUser", Id.toString())
      await updateDoc(rewardRef, {
        reward_current : 0
      })
      
      window.alert('정산 완료')
<<<<<<< HEAD
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
            respondedSurvey.push(doc.data().id)
          }
      })
      var panel = { uid: uid, info: info, respondedSurvey : respondedSurvey }
      adminAppUserData.push(panel)
    }

=======
    }
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
    
  },
}
</script>

<style>
.list.active {
  display: none;
}

</style>