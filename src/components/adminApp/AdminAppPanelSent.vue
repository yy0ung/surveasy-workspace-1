<template>
  <div id="container-top">
    <div class="sent-container">
      <div class="sent-title">개별 정산</div>
      <p>선택된 개수 : {{sentCheckArray.length}}개 <button id="sent-all-btn" @click="sentAllFin(sentCheckArray)">{{sentCheckArray.length}}개 정산하기</button></p>
    </div>
    
    <!-- 내가 다 없애버리면 너가 테스트 못할 거 같아서 아직 나는 테스트 안했어! -->
    <div class="sent-container">
      <div class="sent-title">전체 정산</div>
      <div id="sent-all-content-container">
        <div>
          <input type="checkbox" id="done" @click="appendAllList"> {{allList.length}}개 모두 선택됨
          <div id="sent-onlyFS">( onlyFs : {{onlyFS}} / {{allCount}}명 )</div>
        </div>
        <button id="sent-all-btn" @click="sentAllFin(allList)">{{allList.length}}개 정산하기</button>
      </div>
    </div>
    
    
    
  </div>
 
  <div id="sent-list">
    <div class="admin-info-content">
      <div id="sent-loading" v-if="this.$store.state.adminAppUserData.length==0">불러오는 중</div>
      <table class="admin-table" >
        <tr>
          <th>uid</th>
          <th>이름</th>
          <th>계좌주</th>
          <th>메일</th>
          <th>전화번호</th>
          <th>참여 설문</th>
          <th>은행</th>
          <th>계좌번호</th>    
          <th>정산금액</th>
          <th>check box</th>
          <th>정산</th>
        </tr>

        <tr v-for="item in (this.$store.state.adminAppUserData)" :key="item.info[0].uid" class="list" :class="{active:item.info[0].reward_current == 0}">
          <td>{{item.info[0].uid}}</td>
          <td>{{item.info[0].name}}</td>
          <td>{{item.info[0].accountOwner}}</td>
          <td>{{item.info[0].email}}</td>
          <td>{{item.info[0].phoneNumber}}</td>
          <td>{{item.respondedSurvey}}</td>
          <td>{{item.info[0].accountType}}</td>
          <td>{{item.info[0].accountNumber}}</td>
          <td>{{item.info[0].reward_current}}</td>
          <td><input class="checkbox-one" type="checkbox" id="done" @click="addArray(item.info[0].uid, item.info[0].reward_current, item.respondedSurvey)" ></td>
          <td id="sentBtn"><button @click="sentFin(item.info[0].uid, item.info[0].reward_current, item.respondedSurvey)">정산 완료</button></td>
        </tr>
      </table>
      
    </div>
  </div>

</template>

<script>
import { getFirestore,collection, getDocs, query, doc, where, setDoc, getDoc, updateDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      sentCheckArray :[],
      allList : [],
      check : false,
      allCount : 0,
      onlyFS: 0
      
    }
  },
  created() {
    this.$store.state.adminAppUserData = []
    this.fetchPanelInfo()
  },
  methods: {
    sentFin(Id, reward_current, respondedSurvey) {
      this.clearCurrent(Id, reward_current)
      this.updateIsSent(Id, respondedSurvey)
    },

    //array에 넣기, 체크 박스 false 되면 리스트에서 빼기
    async addArray(Id, reward_current, respondedSurvey){
      const item = {Id: Id, reward_current: reward_current, respondedSurvey: respondedSurvey}
      
      if(this.sentCheckArray.some(e => e.Id == Id)) {
        this.sentCheckArray = this.sentCheckArray.filter(e => e.Id != Id)
      }
      else {
        this.sentCheckArray.push({Id: Id, reward_current: reward_current, respondedSurvey: respondedSurvey})
      }
    },
    
    async sentAllFin(arr){
      const db = this.$store.state.db
      for(var i=0; i<arr.length; i++){
        
        console.log("~~~~~~~~" + arr[i].reward_current + '~~~~~~~' + arr[i].respondedSurvey)
        await this.clearCurrent(arr[i].Id, arr[i].reward_current)
        await this.updateIsSent(arr[i].Id, arr[i].respondedSurvey)
      }

      console.log("*************  정산 끝 ( ^_^ ) **************")
      
      // if (confirm("정산완료")){
      //   this.$router.go()
      // }
    },
    
    async updateIsSent(Id, respondedSurvey) {
      const db = this.$store.state.db
      const rs = respondedSurvey
      for(var i=0 ; i < rs.length ; i++) {
        console.log(rs[i])
        var itemRef = doc(db, "panelData", Id, "UserSurveyList", rs[i].toString())
        await updateDoc(itemRef, {
          isSent : true
        })
      }
    },


    async clearCurrent(Id, reward_current){
      const db = this.$store.state.db
      const rewardRef = doc(db, "panelData", Id)
      var new_reward_current = 0

      const querySnapshot = await getDoc(rewardRef)
      if(querySnapshot.exists){
        new_reward_current = querySnapshot.data().reward_current
        //console.log("+++++++++++" + new_reward_current)

      }

      await updateDoc(rewardRef, {
        reward_current : Number(new_reward_current - reward_current)
      })
      // if(confirm("정산완료")){
      //   this.$router.go()
      // }
     // window.alert('정산 완료')
    },

    async fetchPanelInfo(){
      const db = this.$store.state.db
      const adminAppUserData = this.$store.state.adminAppUserData
      const q = query(collection(db,"panelData"), where("reward_current", ">", 0))
      
      const querySnapshot = await getDocs(q)
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

      const q = query(collection(db, "panelData", uid, "UserSurveyList"), where("isSent", "==", false))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
          if(doc.data().isSent == false) {
            console.log("survey list : " + doc.data().lastIDChecked)
            respondedSurvey.push(doc.data().lastIDChecked.toString())
          }
      })
      var panel = { uid: uid, info: info, respondedSurvey : respondedSurvey }
      adminAppUserData.push(panel)
    },
    
    async appendAllList(){
      this.check = !this.check
      var lst = this.$store.state.adminAppUserData
      
      if(this.check){
        for(var i =0; i<lst.length; i++){
          this.allCount++
          if(!(lst[i].respondedSurvey.length==1 && lst[i].respondedSurvey[0]=="0")) {
            var item = {Id : lst[i].uid, reward_current : lst[i].info[0].reward_current, respondedSurvey: lst[i].respondedSurvey}
            this.allList.push(item)
            console.log(item)
          }
          else {this.onlyFS++}
        }
      }
      
      else {
        this.allList.length = 0
        this.allCount = 0
        this.onlyFS = 0
      }
      
      console.log('#######' + this.allList)
      
      
    }
    
  },
  
}
</script>

<style>
#container-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}
.sent-container {
  background: rgb(242, 242, 242);
  border-radius: 20px;
  width: 400px;
  padding: 15px;
  margin: 0 20px 20px 20px;
  text-align: center;
}
.sent-title {
  font-size: 24px;
  font-weight: bold;
  color: #343434;
}
#sent-all-content-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
}
#sent-onlyFS {
  font-size: 13px;
  font-weight: lighter;
  color: #2b2b2b;
  margin-top: 4px;
}
#sent-all-btn {
  width: 130px;
  height: 30px;
  margin-left: 50px;
  color:#247524;
  background-color: #FFFFFF;
  border: 1.5px solid #a2a2a2;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
#sent-loading {
  font-size: 30px;
  font-weight: lighter;
  color: #bcbcbc;
  margin: 70px;
  text-align: center;
}
#sent-list {
  display: inline;
  justify-content: center;
  width: 90%;
}
.admin-info-content {
  margin-top: 25px;
}
.list.active {
  display: none;
}
#sentBtn{
  padding-top: 10px;
}
</style>