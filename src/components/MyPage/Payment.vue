<template>
  <div class="row">
    <div class="col-lg-12">
    <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
      <p>{{this.$store.state.currentUserUploadInfo2}}</p>
      <div class="spinner" v-if="show==0">
        <i class="fas fa-spinner"></i>
          불러오는 중
      </div>
      <h5>
      <span class="my-accountNum text-primary" >{{accountNum}}</span>
      <div class="empty-ment2 text-primary">{{ment}} 
       <p> <router-link to="/service" class="btn-empty text-primary">{{go}}</router-link></p>
      </div>
    </h5>
  </div>
      <!-- <div>
        <table>
          <tr v-if="show==1">
            <th>ID</th>
            <th>주문번호</th>
            <th>제목</th>
            <th>확인여부</th>
          </tr>

          <tr v-for="item in (currentUserUploadIndexInfo2)" :key="item.title">
            <td>{{item.id}}</td>
            <td>{{item.orderNum}}</td>
            <td>{{item.title}}</td>
            <td>{{item.adminApproved}}</td>
          </tr>
        </table>
      </div> -->

      <div class="rounded shadow border-green col-12 py-4 px-4 my-4" v-for="item in (currentUserUploadIndexInfo2)" :key="item">
      <div class="sur-box"  :class="{active:item.progress==3||item.progress==4||item.progress==5}">
        <h5 class="my-4 mx-1">{{item.title}}</h5>
        <div class="row">
          <span class="col"></span>
          <h5 class="col-auto label duelabel mx-3 px-4 text-right">{{priceToString(item.price)}}원</h5>
        </div>
        <hr>
          <div class="row">
            <div class="col-sm-6 mb-2">
              <span class="col-auto label contentslabel">진행단계</span>
              <span class="col-auto label m-1" v-if="item.progress==3 || item.progress==4">패널 응답 완료</span>
              <span class="col-auto label m-1" v-if="item.progress==2">결제 완료</span>
              <span class="col-auto label m-1" v-if="item.progress==0 || item.progress==1">검수 중</span>
            </div>
            <div class="col-sm-6 mb-2">
              <span class="col-auto label contentslabel">주문 날짜</span>
              <span class="col-auto label">{{item.uploadDate}}</span>
            </div>
            <div class="col-sm-6 mb-2">
              <span class="col-auto label contentslabel">답변 수</span>
              <span class="col-auto label m-1">{{item.requiredHeadCount}}</span>
            </div>
            <div class="col-sm-6">
            <span class="col-auto label contentslabel">설문 기한</span>
            <span class="col-auto label">{{item.dueDate}}</span>
            </div>
          </div>

      <div class="row">
        <div class="text-right">
        <router-link :to="`/review/${item.id}/${item.title}`" v-if="item.progress==3"><a class="btn btn-outline-primary">후기 작성하기 ></a></router-link>
        <router-link :to="`/reviewdetail/${item.id}/${item.title}`" v-if="item.progress==4"><a class="btn btn-outline-primary">후기 작성하기 ></a></router-link>
        <router-link to="/surveylist" v-if="item.progress==2"><a class="btn btn-outline-primary">설문 보러가기 ></a></router-link>
        <a class="btn btn-outline-primary" v-if="item.progress <= 1" @click="deleteSurvey(item.id)"><img width=25 src="@/assets/myPage/delete_icon.png"></a>
        </div>
      </div>    
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from '@firebase/firestore'
export default {
  data(){
    return {
      currentUserUploadIndexInfo:[],
      currentUserUploadIndexInfo2:[],
      show:0,
      ment:'',
      go:'',
      accountNum:'',
      
    }
  },
  mounted(){
    this.fetchMyPayment()

  },

  methods:{
    async deleteSurvey(id_delete) {
      const db = this.$store.state.db
      window.alert("삭제 중")
      const doc1 = doc(db, "userData", this.$store.state.loginState.currentUser['email'].toString())
      const doc2 = doc(db, "surveyData", id_delete.toString())
      var ds1 = await getDoc(doc1)
      var ds2 = await getDoc(doc2)
      if (ds1.exists() && ds2.exists()) {
        var current = ds1.data().point_current
        var total = ds1.data().point_total
        var add = ds2.data().point_add
        
        await updateDoc(doc1, {
          point_current: current - add,
          point_total: total - add
        })

        await deleteDoc(doc(db, "surveyData", id_delete.toString()))
      }
      window.alert("삭제 완료")

      this.$router.go('/mypage/dashboard')
    },
    
    async fetchMyPayment(){
      const db = this.$store.state.db
      const currentUserUploadIndex = this.$store.state.loginState.currentUser['uploadIndex']
      
      
      for (var index in currentUserUploadIndex){
        
        var docRef = doc(db, "surveyData", currentUserUploadIndex[index].toString())
        
        var docSnap = await getDoc(docRef)
        

        if (docSnap.exists()) {
          
          this.currentUserUploadIndexInfo.unshift(docSnap.data())
          
        }
      }

      this.currentUserUploadIndexInfo2 = this.currentUserUploadIndexInfo;
      if (this.currentUserUploadIndexInfo2.length==0){
        this.ment = '아직 업로드한 설문이 없습니다.'
        this.go = '설문 업로드하러 가기 >'
        this.accountNum = ''
      }
      else {
        this.accountNum = '입금 계좌: 카카오뱅크 3333-11-5235460 (송다예)'
      }
      this.show=1
    },


    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    }
  }
  

}
</script>

<style>
</style>