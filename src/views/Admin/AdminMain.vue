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
      
      <div>
        <!-- <p>{{computedAdmin}}</p> -->
        <h2>CONFIRM ME !</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>주문번호</th>
              <th>제목</th>
              <th>가격</th>
              <th>요구 응답</th>
              <th>마감 기한</th>
              <th>업로더</th>
              <th>업로더 identity</th>
              <th>결제 확인</th>
              <th>확인 여부</th>
              <th>duetime</th>
              
            </tr>

            <tr v-for="item in (this.$store.state.adminData)" :key="item.title">
              <td>{{item.id}}</td>
              <td>{{item.orderNum}}</td>
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
              <td>{{item.requiredHeadCount}}</td>
              <td>{{item.dueTime}}</td>
              <td>{{item.uploader}}</td>
              <td>{{item.uploaderIdentity}}</td>
              <td><button @click="updateApproved(item)">결제 확인</button></td>
              <td>{{item.adminApproved}}</td>


              <td>{{item.dueTimeTimeTime}}</td>
              

            </tr>
          </table>
          <p>{{dueDate}}</p>



      </div>
      <hr>
      <div>
        <h1>신분 인증 요청 !!!</h1>
        <hr>
        
        <table>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>요청 identity</th>
            <th>수락 여부</th>
            <th>수락하기</th>
          </tr>

          <tr v-for="item in (this.$store.state.adminDataIdentity)" :key="item.requestName">
            <td>{{item.requestName}}</td>
            <td>{{item.requestEmail}}</td>
            <td>{{item.requestIdentity}}</td>
            <td>{{item.requestApproved}}</td>
            <td><button @click="requestIdentityApprove(item)">확인</button></td>

          </tr>
        </table>
      </div>

      <div>
        <h1>B2B ~!~!~!</h1>
       
        <table>
          <tr>
            <th>company</th>
            <th>email</th>
            <th>name</th>
            <th>응답 여부</th>
          </tr>

          <tr v-for="item in (this.$store.state.adminDataB2B)" :key="item.name">
            <td>{{item.company}}</td>
            <td>{{item.email}}</td>
            <td>{{item.name}}</td>
            <td>{{item.isresponded}}</td>

          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
//어드민 페이지 접근을 어떻게 해야할지 고민중..
//일단은 어드민 주소는 접근은 가능하되 비번을 맞게 쳐야 뒤에 부분들이 보이게 하려고함.
export default {
data(){
  return{
    passInput:'',
    nowDate: Date.now(),
    val:''
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
    const adminDataIdentity = this.$store.state.adminDataIdentity
    const adminDataB2B = this.$store.state.adminDataB2B
    // 설문 확인 데이터 받기
    const querySnapshot = await getDocs(collection(db,"adminRequired"))
    querySnapshot.forEach((doc) => {
      adminData.push(doc.data())
    })

    // 신분 전환 요청 데이터 받기
    const querySnapshot2 = await getDocs(collection(db, "identityVerifyRequired"))
    querySnapshot2.forEach((doc) => {
      adminDataIdentity.push(doc.data())
    })

    const querySnapshot3 = await getDocs(collection(db, "B2BData"))
    querySnapshot3.forEach((doc) => {
      adminDataB2B.push(doc.data())
    })
      
    
  },

  async updateApproved(payload) {
    var db = this.$store.state.db
    const docref = doc(db, "adminRequired", payload.id.toString())

    await updateDoc(docref ,{
      adminApproved : true
    })
    this.$store.state.adminData = [];
    this.fetchAdminData()

  },

  async requestIdentityApprove(payload){
    var db = this.$store.state.db
    const docref = doc(db, "userData", payload.requestEmail.toString())
    

    await updateDoc(docref, {
      identity: payload.requestIdentity
    })

    await deleteDoc(doc(db, "identityVerifyRequired", payload.requestEmail.toString())).then(alert('ok')) 
  },

  
  
  
},

computed:{
  dueDate(){
    var date = this.$store.localSurveyState.dueDate
    var time = this.$store.localSurveyState.dueTime
    var milli = new Date(date+" "+time);

    var diff = milli.getTime() - Date.now()
    var due = diff/3600000
      
      
      if(due<24){
        val =  "D-1"
      }else if(due<48){
        val =  "D-2"
      }else{
        val =  "진행중"
      }
      console.log(val)
      return val
  }
    
  }


}
</script>

<style>

</style>