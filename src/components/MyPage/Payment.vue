<template>
  <div class="mypage">
    <h1>주문내역</h1>
    <div>
      <p>{{this.$store.state.currentUserUploadInfo2}}</p>
      

      <div>
        <table>
          <tr>
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

      this.currentUserUploadIndexInfo2 = this.currentUserUploadIndexInfo
    }
  }

}
</script>

<style>

</style>