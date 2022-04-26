<template>
<div id="adminDetail-container">
  <div>
    <h4>{{id}}</h4>
  </div>
  <div class="reward-input">
    *참여보상 설정<br>
    <input type="number" placeholder="reward" v-model="reward" required>
  </div>
  
  <div class="notice">
    패널 유의사항<br>
    <textarea type="text" placeholder="패널 유의사항" v-model="noticeToPanel" class="notice-text"></textarea>
  </div>
  <div class="notice">
    설문 링크 수정<br>
    <input type="text" placeholder="설문 링크" v-model="link" class="notice-text">
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
      
      noticeToPanel : "",
      link : ""
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

      var lastIDChecked = await this.fetchLastIDChecked()
      var lastIDRef = doc(db,"lastID","lastIDChecked")
      var idDocref = doc(db, "surveyData", this.id.toString())
      var linkDocref = doc(db,"link",this.id.toString())
      await updateDoc( idDocref, {
        progress : 2,
        lastIDChecked : lastIDChecked
      })
      await updateDoc (lastIDRef, {
        lastIDChecked : (lastIDChecked + 1)
      })
      await updateDoc (linkDocref, {
        linkDocref : this.link.toString()
      })
      window.alert('업로드 완료')
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