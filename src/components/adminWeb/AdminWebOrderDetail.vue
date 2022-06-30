<template>
  <div v-if="progress2Modal==true" class="p2-modal">
    <div class="p2-contentsbox">
      <p class="p2-title">설문 상세정보 입력하기
        <button @click="$emit('close'), clear()"><i class="fas fa-times" id="calc-close"></i></button>
      </p> 

      <div><h4>{{id}}</h4></div>
      <div class="detail-col">
        *참여보상 설정<br>
        <input type="number" placeholder="reward" v-model="reward" required>
      </div>
  
      <div class="detail-col">
        패널 유의사항 (고객 입력 : {{currentNotice}} )<br>
        <textarea type="text" placeholder="패널 유의사항" v-model="noticeToPanel" class="notice-text"></textarea>
      </div>
      <div class="detail-col">
        설문 링크 수정<br>
        <input type="text" placeholder="설문 링크" v-model="link" class="notice-text">
        <a :href="link" target="_blank">링크 확인</a>
      </div>

      <div class="detail-col">
        현재 duetimetime : {{this.duetimetime}} <br>
        <input type="text" placeholder="duetimetime" v-model="newDuetimetime" class="notice-text">
      </div>

      <button @click="uploadInfo">업로드하기</button>
    </div>
  </div>
</template>

<script>
import AdminWebOrderVue from './AdminWebOrder.vue'
export default {
  name: AdminWebOrderVue,
  props: {
    progress2Modal: {
      typeof: Boolean,
      require: true,
      default: false
    }
    
  }
}
</script>

<style>
.p2-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 3140px;
  background-color: rgba(255, 255, 255, 0);
  display: table;
  transition: opacity .3s ease;
}
.p2-contentsbox {
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  width: 650px;
  height: 500px;
  margin: 150px auto;
  padding-top: 20px;
  padding-bottom: 30px;
  background-color: rgb(241, 241, 241);
  border-radius: 20px;
  box-shadow: 0 2px 2px rgba(56, 56, 56, 0.076);
  transition: all .3s ease;
  z-index: 2;
}
.detail-col {
  display: flex;
  flex-direction: row;
  margin-bottom: 35px;
}
</style>