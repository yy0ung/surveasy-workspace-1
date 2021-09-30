<template>
  <div>
    <h1>ListList</h1>
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
    <!--테이블 만들기 -->
    <table>
      <tr>
        <th>설문 ID</th>
        <th>설문 제목</th>
        <th>설문 작성자</th>
        <th>응답 수</th>
        <th>업로드 날짜</th>
      </tr>
      <tr v-for="item in (this.$store.state.surveyData)" :key="item.id">
        <td>{{item[0].id}}</td>
        <td>{{item[0].surveyTitle}}</td>
        <td>{{item[0].uploader}}</td>
        <td>{{item[0].headCount}}</td>
        <td>{{item[1].getUTCFullYear()}}.{{item[1].getUTCMonth()}}.{{item[1].getUTCDate()}}</td>
      </tr>
    </table>
    
  </div>
</template>

<script>

import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import { ref } from 'vue'




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
  }
  

}
</script>

<style>

</style>