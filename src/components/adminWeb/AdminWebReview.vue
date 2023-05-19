<template>
  <div class="WebOrder-container">
    <div id="WebOrder-title-container">
      <div class="WebOrder-title" @click="setListType(0)" :class="{black:this.listType==0, grey:this.listType==1}">리뷰 목록</div>
      <div class="WebOrder-title">|</div>
      <div class="WebOrder-title" @click="this.setListType(1)" :class="{black:this.listType==1, grey:this.listType==0}">상세 리뷰 목록</div>
    </div>


      <table id="WebOrder-table-order" class="admin-table" v-if="this.listType==0">
        <th>id</th>
        <th>설문 제목</th>
        <th>리뷰 내용</th>
        <th>별점</th>

        <tr v-for="item in (this.$store.state.adminDataReview)" :key="item.id" class="tds" :id="item.id">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.reviewDetail}}</td>
          <td>{{item.reviewGrade}}</td>
        </tr>
      </table>



      <table id="WebOrder-table-detail" class="admin-table" v-if="this.listType==1">
        <th>id</th>
        <th>설문 제목</th>
        <th>서베이지 장점 * / 기타 장점</th>
        <th>개선점</th>
        <th>응답수 충족 여부, 추가 응답 경로 *</th>
        <th>타 유료 설문 응답 서비스</th>

        <tr v-for="item in (this.$store.state.adminDataReviewDetail)" :key="item.id" class="tds" :id="item.id">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.q1}} / {{item.q1etc}}</td>
          <td>{{item.q2}}</td>
          <td>{{item.q3}}</td>
          <td>{{item.q4}}</td>
        </tr>          
      </table>


    </div>
    
</template>

<script>
import { doc, collection, query, getDoc, getDocs, updateDoc, orderBy, limit, startAfter } from "firebase/firestore"


export default {
  data() {
    return {
      listType: 0,
      reviewList: [],
      reviewDetailList: [],

      a1: ['', '빠른 시간 내에 응답을 모아줌', '내가 원하는 응답 수만큼 응답을 모아줌', '간편한 이용방법', '저렴한 가격', '잦은 이벤트', '높은 신뢰도']
    }
  },

  mounted() {
    this.fetchReview()
  },



  methods: {
    setListType(type) {
      this.listType = type;

      if(type==1) this.fetchReviewDetail()
    },


    async fetchReview() {
      this.$store.state.adminDataReview = []

      const db = this.$store.state.db
      const docRef = collection(db, "reviewData")
      
      const q = query(docRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        var item = {id: Number(doc.data().id), title: doc.data().title, reviewDetail: doc.data().reviewDetail, reviewGrade: doc.data().reviewGrade}
        this.reviewList.push(item)     
      })

      this.$store.state.adminDataReview = this.reviewList.sort((a,b) => (b.id - a.id))
    },


    async fetchReviewDetail() {
      this.$store.state.adminDataReviewDetail = []

      const db = this.$store.state.db
      const docRef = collection(db, "reviewDetailData")
      
      const q = query(docRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        var item = {id: Number(doc.data().surveyID), title: doc.data().surveyTITLE, 
                    q1: doc.data().Q1, q1etc: doc.data().Q1etc, q2: doc.data().Q2, q3: doc.data().Q3, q4: doc.data().Q4}

        this.reviewDetailList.push(item)     
      })

      this.$store.state.adminDataReviewDetail = this.reviewDetailList.sort((a,b) => (b.id - a.id))
    },


  }

}
</script>

<style>
.WebOrder-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 30px;
}
#WebOrder-title-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 27px;
  font-weight: bolder;
  color: black;
  margin-bottom: 20px;
}
.WebOrder-title {
  margin-left: 20px;
  margin-bottom: 25px;
  cursor: pointer;
  color: #9b9b9b;
  font-size: 30px;
  font-weight: lighter;
}
.WebOrder-title.black {
  font-size: 30px;
  color: #000000;
  font-weight: bold;
}
.WebOrder-title.grey {
  font-size: 30px;
  color: #9b9b9b;
  font-weight: lighter;
}
#WebOrder-table-order #WebOrder-table-detail {
  margin-top: 15px;
}
.admin-table {
  text-align: center
}
.admin-th{
  background: #a3a1a1;
}
.btn-progress-admin {
  width: 80px;
  margin: 1px;
}
.progress-buttonX{
  color: white;
  background-color: rgb(181, 181, 181);
  border: 0;
  cursor: pointer;
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
.progress-buttonX:hover{
  color: white;
  background-color: rgb(141, 141, 141);
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
.tds.green2{
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