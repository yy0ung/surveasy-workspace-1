<template>
<div id="adminDetail-container">
  <div class="reward-input">
    <input type="text" placeholder="reward" v-model="reward" required>
  </div>
  <div class="notification">
    <input type="text" placeholder="알림 제목" v-model="notiTitle" required><br>
    <input type="text" placeholder="알림 내용" v-model="notiContent" required >
  </div>
  <div class="notice">
    <input type="text" placeholder="notice to panel" v-model="noticeToPanel">
  </div>

  <button @click="uploadInfo(id)">업로드하기</button>

</div>

</template>

<script>
export default {
  data() {
    return {
      id : this.$route.params.id,
      reward : "",
      notiTitle : "",
      notiContent : "",
      noticeToPanel : ""
    }
  },
  methods: {
    uploadInfo(id){
      
    }
  },
}
</script>

<style>
#adminDetail-container{
  height: 500px;
}
</style>