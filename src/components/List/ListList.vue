<template>
  <div id='list-view-container'>
    <!--테이블 만들기 -->
    <h2 id='list-table-title'>업로드 된 설문</h2>
    <table id='list-table'>
      <tr>
        <th>설문 ID</th>
        <th>설문 제목</th>
        <th>설문 작성자</th>
        <th>응답 수</th>
        <th>업로드 날짜</th>
      </tr>
      <tr v-for="item in sortedSurveyData" :key="item.id">
        <td>{{item[0].id}}</td>
        <td>{{item[0].surveyTitle}}</td>
        <td>{{item[0].uploader}}</td>
        <td>{{item[0].headCount}}</td>
        <td>{{item[1].getUTCFullYear()}}.{{item[1].getUTCMonth()}}.{{item[1].getUTCDate()}}</td>
      </tr>
    </table>

    

    <br>
    ID <input type="text" v-model="dataSet.id">
    <br>
    isDone <input type="checkbox" v-model="dataSet.isDone" value="isDone">
    <br>
    keyword <input type="text" v-model="dataSet.keyword">
    <br>
    paidPrice <input type="number" v-model="dataSet.paidPrice">
    <br>
    spendTime <input type="number" v-model="dataSet.spendTime" placeholder="spendTime">
    <br>
    requireHeadCount <input type="number" v-model="dataSet.requireHeadCount">
    <br>
    surveyInstitute <input type="text" v-model="dataSet.surveyInstitute">
    <br>
    uploader <input type="text" v-model="dataSet.uploader">
    <br>
    surveyTitle <input type="text" v-model="dataSet.surveyTitle">
    <br>
    surveyLink <input type="text" v-model="dataSet.surveyLink">
    <br>

    uploadTime과 dueTime은 현재시간과 현재시간 + 7일

    <br>
    <button @click="addData(this.dataSet)">submit</button>
    
    <hr> 
    
  </div>
</template>

<script>

import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import { ref } from 'vue'
import { orderBy } from 'lodash'




export default {
  data(){
    
    return{
      dataSet : {
        isDone: false,
        headCount: 0,
        keyword: [],
        paidPrice: 0,
        dueTime: 'time',
        spendTime: 0,
        requireHeadCount: 0,
        surveyInstitute: '',
        surveyLink: 'www.naver.com',
        surveyTitle: '',
        uploadTime:'time',
        uploader:'',
        id:0
      }
      
    }
  },
  
  methods:{
    async addData(dataSet){
      var db = this.$store.state.db
      var uploadTime = new Date()
      var dueTime = new Date()
      
      dueTime.setDate(dueTime.getDate() + 7)
      await setDoc(doc(db, "surveyData", dataSet.id),{
        id: dataSet.id,
        isDone: dataSet.isDone,
        uploader: dataSet.uploader,
        surveyTitle: dataSet.surveyTitle,
        surveyLink: dataSet.surveyLink,
        surveyInstitute: dataSet.surveyInstitute,
        headCount: dataSet.headCount,
        paidPrice: dataSet.paidPrice,
        spendTime: dataSet.spendTime,
        keyword: dataSet.keyword,
        requireHeadCount: dataSet.requireHeadCount,
        uploadTime: uploadTime,
        dueTime: dueTime
        
      })
      this.$router.go('/')
    }
  },
  computed:{
    sortedSurveyData(){
      return orderBy(this.$store.state.surveyData, this.$store.state.surveyData.id, "desc")
    }
  }
  

}
</script>

<style>
#list-table{
  border: 0px solid black;
  width: 70%;
  margin: auto;
  border-spacing: 0;
  
}

#list-table td{
  border-bottom: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
  
}

#list-table th{
  border-bottom: 1px solid green;
  padding-bottom: 20px;
  color: green;
}
#list-table-title {
  width: 70%;
  border: 0px solid black;
  margin: auto;
  text-align: left;
  padding-bottom: 60px;
  padding-top: 100px;
}

#list-view-container{
  
  
}
</style>