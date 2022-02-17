<template>
<div id="adminApp-continer">
  <div class="admin-index">
    <router-link to="/adminapp/panelsent">정산</router-link>
    <router-link to="/adminapp/panelinfo">패널 정보</router-link>
    <router-link to="/adminapp/notice">공지사항</router-link>
    <router-link to="/adminapp/panelproofhome">패널 설문 인증</router-link>
  </div>

  <div class="admin-view-container">
    <router-view></router-view>
  </div>

</div>  
</template>

<script>

export default {




}
</script>

<style>
.admin-view-container{
  height: 1000px;
}

</style>