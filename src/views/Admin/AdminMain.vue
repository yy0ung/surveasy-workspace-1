<template>
  <div>
    <h1>{{ passInput }}</h1>
    <input v-model="passInput" type="text" placeholder="AdminPassword">
    <br>
    Admin Password
    <button @click="adminCheck">확인하기</button>

    <p>{{passInput}}</p>
    <p>{{this.$store.state.isAdmin}}</p>
    <div v-if="this.$store.state.isAdmin">
      <p>admin이 true일때만 보이는 부분</p>
      <div>{{this.$store.state.adminData}}</div>
      <div>
        <h2>CONFIRM ME !</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>가격</th>
              <th>요구 응답</th>
              <th>마감 기한</th>
              <th>업로더</th>
              <th>결제 확인</th>
              <th>확인 여부</th>
            </tr>

            <tr v-for="item in (this.$store.state.adminData)" :key="item.title">
              <td>{{item.id}}</td>
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
              <td>{{item.requiredHeadCount}}</td>
              <td>{{item.dueTime}}</td>
              <td>{{item.uploader}}</td>
              <td><button @click="updateApproved(item)">결제 확인</button></td>
              <td>{{item.adminApproved}}</td>
            </tr>
          </table>



      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc } from 'firebase/firestore'
//어드민 페이지 접근을 어떻게 해야할지 고민중..
//일단은 어드민 주소는 접근은 가능하되 비번을 맞게 쳐야 뒤에 부분들이 보이게 하려고함.
export default {
data(){
  return{
    passInput:'',
  }
},
methods:{
  adminCheck(){
    if (this.passInput == this.$store.state.AdminPassword) {
      alert('ok')
      this.$store.commit('setAdminState')
      this.fetchAdminData()
      console.log(this.$store.state.adminData)

    } else {
      alert('check it again')
    }
  },

  async fetchAdminData(){
    const db = this.$store.state.db
    const adminData = this.$store.state.adminData
    const querySnapshot = await getDocs(collection(db,"adminRequired"))
    querySnapshot.forEach((doc) => {
      adminData.push(doc.data())
    })
      
    
  },

  async updateApproved(payload) {
    var db = this.$store.state.db
    const docref = doc(db, "adminRequired", payload.title.toString())

    await updateDoc(docref ,{
      adminApproved : true
    })
    this.$store.state.adminData = [];
    this.fetchAdminData()

  }
}

}
</script>

<style>

</style>