<template>
<div id="admin-panelInfo">
패널 정보
</div>  

<div class="admin-info-content">
  <tr>
    <th>name</th>
    <th>email</th>
    <th>phoneNumber</th>
  </tr>

  <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.name">
    <td>{{item.name}}</td>
    <td>{{item.email}}</td>
    <td>{{item.phoneNumber}}</td>
  </tr>
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
        adminAppUserData.push(doc.data())
      })
    }
  },
}
</script>

<style>

</style>