<template>
  <div class="WebOrder-container">
    <div id="WebOrder-title">주문 목록</div>
    
      <table id="WebOrder-table">
        <th>P</th>
        <th>P 관리</th>
        <th>lastID</th>
        <th>ID</th>
        <th>참여인원</th>
        <th>응답수</th>
        <th>D-day</th>
        <th>마감일</th>
        <th>고객명</th>
        <th>가격</th>
        <th>소요시간</th>
        <th>제목</th>
        <th>대상</th>
        <th>선택 신분</th>

        <tr v-for="item in (this.$store.state.adminDataSurvey)" :key="item.id" class="tds"
          :class="{red:item.progress==0 || item.progress==1, green: item.progress==2, gray: item.progress==3 || item.progress==4}">
          <td>{{item.progress}}</td>
          <td class="btn-progress-admin">
            <button class="progress-button1" @click="changeProgress1(item.id)">1</button> 
            <button class="progress-button2" @click="show_Modal()">2</button><AdminWebOrderDetail :progress2Modal="progress2Modal" @close="show_Modal()"></AdminWebOrderDetail>
            <button class="progress-button3" @click="changeProgress3(item.id)">3</button>
          </td>
          <td>{{item.lastIDChecked}}</td>
          <td>{{item.id}}</td>
          <td><router-link :to="`/panelproof/${item.id}`" target="_blank">{{item.respondedPanel.length}}명</router-link></td>
          <td>{{item.requiredHeadCount}}</td>
          <td>{{this.calTime(item.dueDate, item.dueTimeTime)}}</td>
          <td>{{item.dueDate}} {{item.dueTimeTime}}</td>
          <td>{{item.uploader}}</td>
          <td>{{item.price}}</td>
          <td>{{item.spendTime}}</td>
          <td><a :href="item.link" target="_blank" class="tds"
          :class="{red:item.progress==0 || item.progress==1, green: item.progress==2, gray: item.progress==3 || item.progress==4}">{{item.title}}</a></td>
          <td>{{item.target}}</td>
          <td>{{item.priceIdentity.substring(0, 4)}}</td>




        </tr>
      </table>
    <div id="WebOrder-list">

    </div>
  </div>
</template>

<script>
import { collection, query, getDocs, orderBy, limit, startAfter } from "firebase/firestore"
import AdminWebOrderDetail from './AdminWebOrderDetail.vue'


export default {
  data() {
    return {
      progress2Modal: false
    }
  },

  components: { AdminWebOrderDetail },

  mounted() {
    this.fetchSurveyData()
  },


  methods: {
    async fetchSurveyData() {
      this.$store.state.adminDataSurvey = []

      const db = this.$store.state.db
      const docRef = collection(db, "surveyData")
      const adminDataSurvey = this.$store.state.adminDataSurvey
      
      const q = query(docRef, orderBy("id", "desc"), limit(25))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if(doc.data().id > 340) adminDataSurvey.push(doc.data())
        
      })

      this.$store.state.adminDataSurvey = adminDataSurvey
      console.log(adminDataSurvey)

    },

    calTime(date,time){
      var due = new Date(date)
      var timeHour = time.substring(0,2)
      var dateDiff = due.getTime()/3600000 - Date.now()/3600000 + (timeHour-8)
      var Dday = ''
      
      
      if(dateDiff<0){
        Dday='마감'
      }
      else if(dateDiff<24 && dateDiff>1){
        Dday = Math.floor(dateDiff)+'시간 후 마감'
      }else if(dateDiff<48){
        Dday = 'D-1'
      }else if(dateDiff<72){
        Dday = 'D-2'
      }else if(dateDiff<96){
        Dday = 'D-3'
      }else if(dateDiff<120){
        Dday = 'D-4'
      }else if(dateDiff<144){
        Dday = 'D-5'
      }else if(dateDiff<168){
        Dday = 'D-6'
      }else if(dateDiff<192){
        Dday = 'D-7'
      }
      return Dday
    },



    show_Modal() {
      this.progress2Modal = !this.progress2Modal
    }


  }

}
</script>

<style>
.WebOrder-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#WebOrder-title {
  font-size: 27px;
  font-weight: bolder;
  color: black;
  margin-bottom: 15px;
}
#WebOrder-table {
  margin-top: 15px;
}
.progress-button1{
  color: white;
  background-color: rgb(243, 147, 147);
  border: 0;
  cursor: pointer;
}
.progress-button2{
  color: white;
  background-color: rgb(115, 192, 44);
  border: 0;
  cursor: pointer;
}
.progress-button3{
  color: white;
  background-color:#555454;
  border: 0;
  cursor: pointer;
}
.progress-button1:hover{
  color: white;
  background-color: rgb(211, 52, 52);
}
.progress-button2:hover{
  color: white;
  background-color: rgb(69, 140, 2);
}
.progress-button3:hover{
  color: white;
  background-color: #0c0c0c;
}
#admin-container table{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.tds.red{
  color: rgb(243, 147, 147);
}
.tds.green{
  color: rgb(115, 192, 44);
}
.tds.gray{
  color: #555454;
}
.progress-admin{
  margin-left: 50px;
}
.progress-admin{
  font-weight: bold;
}
.progress-two-container{
  position: absolute;
  height: 300px;
  width: 500px;
}
</style>