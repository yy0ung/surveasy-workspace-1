<template>
  <div>
    <div v-if="this.$store.state.isAdmin == false">
      <input v-model="passInput" type="text" placeholder="AdminPassword">
      <br>
      Admin Password
      <button @click="adminCheck">확인하기</button>
    </div>
    
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
              <th>주문 날짜</th>
              <th>업로더</th>
              <th>업로더 이메일</th>
              <th>업로더 identity</th>
              <th>선택한 identity 옵션</th>
              <th>progress</th>
              <th>설문 진행단계 변경</th>
              
            </tr>

            <tr v-for="item in (this.$store.state.adminData)" :key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.orderNum}}</td>
              <td>{{item.title}}</td>
              <td>{{item.price}}</td>
              <td>{{item.requiredHeadCount}}</td>
              <td>{{item.uploadDate}}</td>
              <td>{{item.uploader}}</td>
              <td>{{item.uploaderEmail}}</td>
              <td>{{item.uploaderIdentity}}</td>
              <td><button @click="updateApproved(item)">결제 확인</button></td>
              <td>{{item.adminApproved}}</td>
              <td>{{item.dueDate}}</td>
              <td>{{item.dueTimeTime}}</td>
              <td>{{item.progress}}</td>
              <td><button class="progress-button"  @click="changeProgress1(item.id)">1</button> <button class="progress-button" @click="changeProgress2(item.id)">2</button> <button class="progress-button" @click="changeProgress3(item.id)">3</button></td>
              

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
            <th>변경</th>
          </tr>

          <tr v-for="item in (this.$store.state.adminDataB2B)" :key="item.name">
            <td>{{item.company}}</td>
            <td>{{item.email}}</td>
            <td>{{item.name}}</td>
            <td>{{item.isresponded}}</td>
            <td><button @click="B2BRespond(item)">변경</button></td>

          </tr>
        </table>
      </div>

      <div>
        <h1>검수후에수정가능하게~</h1>
      </div>

      <div>
        <h1>리스트 데이터 추가하기</h1>

        <div>
          <div>
            <input type="text" placeholder="설문 제목" v-model="UploadInputData.title">
          </div>
          <div>
            <input type="text" placeholder="설문 업로더" v-model="UploadInputData.uploader">  
          </div>
          <div>
            <input type="text" placeholder="설문 주제" v-model="UploadInputData.theme">  
          </div>
          <div>
            <input type="text" placeholder="요구 응답 수" v-model="UploadInputData.requiredHeadCount">
          </div>
          <div>
            <input type="text" placeholder="예상 소요시간" v-model="UploadInputData.spendTime">  
          </div>
          <div>
            <input type="text" placeholder="설문 기관" v-model="UploadInputData.surveyInstitute">
          </div>
          <div>
            <input type="text" placeholder="설문 링크" v-model="UploadInputData.surveyLink">         
          </div>
          <div>
            <input type="text" placeholder="설문 대상" v-model="UploadInputData.target">         
          </div>
        </div>

        <button @click="addPastData(this.UploadInputData)">리스트에 추가하기</button>
      </div>

      <hr>
      <div>
        <h2>템플릿 서비스 응답 구역</h2>

        <table>
          <tr>
            <th>주문</th>
            <th>name</th>
            <th>uploader</th>
            <th>type</th>
            <th>응답여부</th>
            <th>date</th>
            <th>응답여부변경</th>
          </tr>

          <tr v-for="item in (this.$store.state.adminDataTemplate)" :key = "item.name">
            <td>{{item.identifyTime}}</td>
            <td>{{item.name}}</td>
            <td>{{item.uploader}}</td>
            <td>{{item.type}}</td>
            <td>{{item.isresponded}}</td>
            <td>{{item.uploadDate}}</td>
            <th><button @click="templateRespond(item)">변경</button></th>

          </tr>
        </table>
      </div>
      
    </div>
  </div>
</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
//어드민 페이지 접근을 어떻게 해야할지 고민중..
//일단은 어드민 주소는 접근은 가능하되 비번을 맞게 쳐야 뒤에 부분들이 보이게 하려고함.
export default {
data(){
  return{
    passInput:'',
    nowDate: Date.now(),
    val:'',

    UploadInputData:{
      title:'',
      theme:'',
      requiredHeadCount:'',
      spendTime:'',
      pastData: true,
      surveyInstitute:'',
      surveyLink: '',
      uploader:'',
      target:'',

      
    },
  }
},

methods:{
  adminCheck(){
    if (this.passInput == this.$store.state.AdminPassword) {
      alert('ok')
      this.$store.commit('setAdminState')
      this.fetchAdminData()
      console.log(this.$store.state.userData)
    } else {
      alert('check it again')
    }
  },

  async fetchAdminData(){
    const db = this.$store.state.db
    const adminData = this.$store.state.adminData
    const adminDataIdentity = this.$store.state.adminDataIdentity
    const adminDataB2B = this.$store.state.adminDataB2B
    const adminDataTemplate = this.$store.state.adminDataTemplate
    // 설문 확인 데이터 받기
    const querySnapshot = await getDocs(collection(db,"adminRequired"))
    querySnapshot.forEach((doc) => {
      adminData.push(doc.data())
    })

    const sorted = adminData.sort(function(a,b){return b.id - a.id })
    this.$store.state.adminData = sorted

    // 신분 전환 요청 데이터 받기
    const querySnapshot2 = await getDocs(collection(db, "identityVerifyRequired"))
    querySnapshot2.forEach((doc) => {
      adminDataIdentity.push(doc.data())
    })

    const querySnapshot3 = await getDocs(collection(db, "B2BData"))
    querySnapshot3.forEach((doc) => {
      adminDataB2B.push(doc.data())
    })

    const querySnapshot4 = await getDocs(collection(db, "TemplateData"))
    querySnapshot4.forEach((doc) => {
      adminDataTemplate.push(doc.data())
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

  async addPastData(dataset){
    var db = this.$store.state.db
    var localLastID = this.$store.state.lastID[0].lastID

    await setDoc(doc(db, "adminRequired", localLastID.toString()), {

      id : localLastID,
      title : dataset.title,
      theme : dataset.theme,
      requiredHeadCount: dataset.requiredHeadCount,
      spendTime : dataset.spendTime,
      pastData : dataset.pastData,
      surveyInstitute : dataset.surveyInstitute,
      surveyLink : dataset.surveyLink,
      uploader : dataset.uploader,
      progress : 3,
      target: dataset.target,
      dueDate:"2021-12-31",
      dueTimeTime:"00:00"
      

      // surveyTitle:'',
      // theme:'',
      // requireHeadCount:'',
      // spendTime:'',
      // pastData: true,
      // surveyInstitute:'',
      // surveyLink: '',
      // uploader:''
    })

    var idDocref = doc(db, "lastID", "lastID")
    
    await updateDoc(idDocref, {
      lastID : (localLastID + 1)
    })

    console.log('완료')
  },

  async changeProgress1(targetID){
    var db = this.$store.state.db
    var idDocref = doc(db, "adminRequired", targetID.toString())
    await updateDoc( idDocref, {
      progress : 1
    })
    window.alert('완료')
  },

  async changeProgress2(targetID){
    var db = this.$store.state.db
    var idDocref = doc(db, "adminRequired", targetID.toString())
    await updateDoc( idDocref, {
      progress : 2
    })
    window.alert('완료')
  },

  async changeProgress3(targetID){
    var db = this.$store.state.db
    var idDocref = doc(db, "adminRequired", targetID.toString())
    await updateDoc( idDocref, {
      progress : 3
    })
    window.alert('완료')
  },

  async templateRespond(item){
    var db = this.$store.state.db
    var templateDocref = doc(db, "TemplateData", item.identifyTime.toString())
    await updateDoc(templateDocref, {
      isresponded: true
    })
    window.alert('완료')
  },

  async B2BRespond(item){
    var db = this.$store.state.db
    var B2BDocref = doc(db, "B2BData", item.company.toString())
    await updateDoc(B2BDocref, {
      isresponded : true
    })
    window.alert('완료')
  },
  
  
  
  
},

computed:{
  dueDate(){
    
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
.progress-button{
  color: white;
  background-color: cornflowerblue;
  border: 0;
}

</style>