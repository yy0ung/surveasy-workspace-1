<template>
<div id="adminDetail-container">
  <div>
    <h4>{{id}}</h4>
  </div>
  <div class="reward-input">
    *참여보상 설정<br>
    <input type="number" placeholder="reward" v-model="reward" required>
  </div>
  <div class="notification">
    *알림 제목 설정<br>
    <textarea type="text" placeholder="알림 제목" v-model="notiTitle" required class="fcm-contents"></textarea><br>
    *알림 내용 설정<br>
    <textarea type="text" placeholder="알림 내용" v-model="notiContent" required class="fcm-contents"></textarea>
  </div>
  <div class="notice">
    패널 유의사항<br>
    <textarea type="text" placeholder="패널 유의사항" v-model="noticeToPanel" class="notice-text"></textarea>
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

    async fetchLastIDChecked() {
    const db = this.$store.state.db
    const lastIDChecked= []
    const docRef = doc(db,"lastID", "lastIDChecked") 
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      lastIDChecked.push(docSnap.data())
      return lastIDChecked[0].lastIDChecked
    }
  },

    async uploadInfo(){
      const db = this.$store.state.db
      const surveyRef = doc(db,"surveyData",this.id.toString())
      await updateDoc(surveyRef, {
        panelReward: parseInt(this.reward),
        noticeToPanel : this.noticeToPanel
      })

      var docN = doc(db, "NotificationData",this.id.toString())
      await setDoc(docN, {
        title : this.notiTitle,
        body : this.notiContent
      })

      var lastIDChecked = await this.fetchLastIDChecked()
      var lastIDRef = doc(db,"lastID","lastIDChecked")
      var idDocref = doc(db, "surveyData", this.id.toString())
      await updateDoc( idDocref, {
        progress : 2,
        lastIDChecked : lastIDChecked
      })
      await updateDoc (lastIDRef, {
        lastIDChecked : (lastIDChecked + 1)
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
.fcm-contents, .notice-text{
  width: 300px;
}
.reward-input,  .notice, .fcm-contents{
  margin-bottom: 30px;
}
</style>