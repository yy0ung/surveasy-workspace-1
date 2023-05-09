<template>
  <div v-if="memoModal==true" class="memo-modal">
    <div class="memo-contentsbox">
      <div id="p2-top">
        <div @click="$emit('closeM')" class="memo-close"><i class="fas fa-times"></i></div>
        <p class="memo-title">메모장</p>
      </div>
      
      <div id="memo-container">
        <div id="memo-id"><div>ID :  {{id_memo}}</div></div>

        
      </div>
      <button id="memo-fin-btn" @click="postMemo()">메모 업로드하기</button>
      
    </div>
      
  </div>
</template>

<script>
import AdminWebOrderVue from './AdminWebOrder.vue'
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore'

export default {
  name: AdminWebOrderVue,
  props: {
    memoModal : {
      typeof: Boolean,
      require: true,
      default: false
    },

    id_memo: { typeof: Number }

  },

  data() {
    return {
      reward : "",
      noticeToPanel : "",
      link : "",
      newDuetimetime : ""
    }
  },

  methods: {
    async postMemo() {

    }
  }
}
</script>

<style>
.memo-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 3140px;
  background-color: rgba(255, 255, 255, 0.02);
  display: table;
  transition: opacity .3s ease;
}
.memo-contentsbox {
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  width: 700px;
  height: 530px;
  margin: 150px auto;
  padding-top: 15px;
  padding-bottom: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(56, 56, 56, 0.042);
  transition: all .3s ease;
  z-index: 2;
}
#p2-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
.memo-title {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 25px;
  font-weight: bold;
  margin: 5px;
  color:#444444;
}
#memo-id {
  font-family: 'Noto Sans KR', sans-serif;
  color:#0CAE02;
  font-size: 18px;
}
.memo-close {
  display: flex;
  flex-direction: row;
  justify-content: right;
  cursor: pointer;
  color:#444444;
}

#memo-fin-btn {
  padding: 5px 70px;
  margin: 37px 180px 0px 180px;
  color:#0CAE02;
  background-color: #FFFFFF;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
#memo-fin-btn:hover{
  color: white;
  background: #0AAB00;
}
</style>