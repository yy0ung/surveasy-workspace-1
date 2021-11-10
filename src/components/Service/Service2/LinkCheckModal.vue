<template>
  <div class="link-modal" v-if="showLinkIframe">
    <div class="link-modal-contentsbox">
      <div class="link-modal-title">설문 링크 확인하기</div>
      <button class="modal-close-button" @click="$emit('closeIframe')"><i class="fas fa-times"></i></button>
      <div class="link-modal-container">
        <iframe :src='iframe()' width="620" height="310"></iframe> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'link-modal',
  props: { 
    showLinkIframe: {
      type: Boolean,
      require: true,
      default: false 
    }
  },

  data() {
    return {
    }
  },

  methods: {
    iframe() {
      var iframeLink = this.$store.state.checklink
      return iframeLink
    }
  }

}
</script>

<style>
.link-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.296);
  display: table;
}
.link-modal-contentsbox {
  position: relative;
  width: 660px;
  height: 420px;
  margin: 15% auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .33);
}
.link-modal-title {
  display: inline-block;
  margin: 23px 0 30px 40px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 22px;
  font-weight: bold;
}
.modal-close-button {
  margin: 10px;
}
</style>