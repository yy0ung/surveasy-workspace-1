<template>
<div id="adminDetail-container">
  <div class="reward-input">
    <input type="number" placeholder="reward" v-model="reward" required>
  </div>
  <div class="notification">
    <input type="text" placeholder="알림 제목" v-model="notiTitle" required><br>
    <input type="text" placeholder="알림 내용" v-model="notiContent" required >
  </div>
  <div class="notice">
    <input type="text" placeholder="notice to panel" v-model="noticeToPanel">
  </div>

  <button @click="uploadInfo">업로드하기</button>

</div>

</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      id : this.$route.params.id,
      reward : 0,
      notiTitle : "",
      notiContent : "",
      noticeToPanel : ""
    }
  },
  methods: {
    async uploadInfo(){
      const db = this.$store.state.db
      const surveyRef = doc(db,"AndroidSurvey",this.id.toString())
      await updateDoc(surveyRef, {
        reward: parseInt(this.reward),
        noticeToPanel : this.noticeToPanel
      })

      var docN = doc(db, "NotificationData",this.id.toString())
      await setDoc(docN, {
        title : this.notiTitle,
        body : this.notiContent
      })
      if(confirm("업로드 성공")){
        this.$router.push("/adminmain")
      }
    },
    
  }

}
</script>

<style>
#adminDetail-container{
  height: 500px;
}
</style>