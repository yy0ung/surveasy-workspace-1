<template>
  <div id="app" :class="{backactive: this.$store.state.showModal}">
  <div class="cookies-modal" v-if="show==true">
    <p class="cookies-title">Surveasy 홈페이지는 모바일 환경 및 Safari 브라우저를 지원하지 않습니다. <span id="small-f">* Chrome, Edge, Whale 권장.</span></p>
    <p class="cookies-none" @click="setCookie">7일동안 숨기기</p>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>