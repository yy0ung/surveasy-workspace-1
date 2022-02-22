<template>
<div id="admin-panelSent">
정산
</div>  
<div class="admin-info-content">
  <tr>
    <th>name</th>
    <th>email</th>
    <th>phoneNumber</th>
    <th>sent</th>
    <th>sentDone</th>
  </tr>

    <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.uid" class="list" :class="{active:item.reward_current == 0}">
    <td>{{item.name}}</td>
    <td>{{item.email}}</td>
    <td>{{item.phoneNumber}}</td>
    <td>{{item.reward_current}}</td>
    <td><input type="checkbox" id="done"></td>
    <td><button @click="clearCurrent(item.uid)">정산 완료</button></td>
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
    async clearCurrent(Id){
      const db = this.$store.state.db
      const rewardRef = doc(db, "AndroidUser", Id.toString())
      await updateDoc(rewardRef, {
        reward_current : 0
      })
      
      window.alert('정산 완료')
    }
    
  },
}
</script>

<style>
.list.active {
  display: none;
}

</style>