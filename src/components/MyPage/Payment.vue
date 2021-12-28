<template>
  <div class="mypage">
    
    <div>
      <p>{{this.$store.state.currentUserUploadInfo2}}</p>
      <div class="spinner" v-if="show==0">
        <i class="fas fa-spinner"></i>
          불러오는 중
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
      
      <div class="sur-box" v-for="item in (currentUserUploadIndexInfo2)" :key="item.title" >
        <p class="su-title">{{item.title}} <span class="gray">{{item.price}}원</span></p>
        <div class="su-contents">
          <div class="con1">
            <p class="su-">진행단계</p>
            <p class="su-">답변 수</p>
          </div>
          <div class="con2">
            <p class="light">진행단계 admin에서 가져오기</p>
            <p class="light">{{item.requiredHeadCount}}</p>
          </div>
          <div class="con3">
            <p class="su-">결제 날짜</p>
            <p class="su-">설문 기한</p>
          </div>
          <div class="con4">
            <p class="light">{{item.uploadTime}}</p>
            <p class="light">{{item.dueTime}}</p>
          </div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { collection, getDocs, getDoc, doc } from '@firebase/firestore'
export default {
  data(){
    return {
      currentUserUploadIndexInfo:[],
      currentUserUploadIndexInfo2:[],
      show:0,
      
      
    }
  },
  mounted(){
    this.fetchMyPayment()

  },

  methods:{
    async fetchMyPayment(){
      const db = this.$store.state.db
      const currentUserUploadIndex = this.$store.state.currentUser['uploadIndex']
      

      for (var index in currentUserUploadIndex){
        
        var docRef = doc(db, "adminRequired", currentUserUploadIndex[index].toString())
        
        var docSnap = await getDoc(docRef)
        

        if (docSnap.exists()) {
          
          this.currentUserUploadIndexInfo.push(docSnap.data())
          
        }
      }

      this.currentUserUploadIndexInfo2 = this.currentUserUploadIndexInfo,
      this.show=1
    }
  }

}
</script>

<style>
.spinner{
  text-align: center;
  font-size: 1.4rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: #0AAC00;
  margin-top: 300px;
}
.sur-box{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 5px #0000000D;
  border-radius: 15px;
  width: 650px;
  margin-left: 50px;
  height: 180px;
}
.sur-box .su-title{
  color: #0AAC00;
  padding-top: 30px;
  padding-left: 40px;

}
.sur-box .gray{
  color: black;
  font-weight: 300;
  margin-left: 50px;
}
.su-contents{
  padding-left: 40px;
  display: flex;
  
}
.con2{
  margin-right: 150px;
}
.con1, .con3{
  margin-right: 20px;
}
.light{
  font-weight: 300;
}


</style>