<template>
<div id="admin-adminNotice">
공지사항
</div>  
<h4>공지사항 게시</h4>
<div class="notice-content">
  <input type="text" v-model="noticeTitle" placeholder="제목" class="notice-title"><br>
  
  <input type="text" v-model="noticeContents" placeholder="내용" class="notice-contents">
</div>
<button @click="uploadNotice">업로드하기</button>

<h4>공지사항 알림 커스터마이징</h4>
<div class="alert-notice-container">
  <input type="text" v-model="notificationTitle" placeholder="알림제목" class="notice-title"><br>
  <input type="text" v-model="notificationContent" placeholder="알림내용" class="notice-contents">
</div>
<button @click="notificationNotice">알림 보내기</button>
</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore'
export default {
  data() {
    return {
      noticeTitle : '',
      noticeContents: '',
      notificationTitle : '',
      notificationContent : ''
    }
  },
  methods: {
    async uploadNotice(){
      const db = this.$store.state.db
      var docN = doc(db, "AppNotice",this.noticeTitle.toString())
      await setDoc(docN, {
        title : this.noticeTitle,
        date : new Date(),
        content : this.noticeContents
      })
      window.alert("업로드 완료")
    },
    async notificationNotice(){
      const db = this.$store.state.db
      var docNt = doc(db, "NotificationData",this.notificationContent.toString())
      await setDoc(docNt, {
        title : this.notificationTitle,
        body : this.notificationContent
      })
      window.alert("전송 완료")
    }
  },

}
</script>

<style>
.notice-contents, .notice-title{
  width: 300px;
}
.notice-contents{
  height: 200px;
}
</style>