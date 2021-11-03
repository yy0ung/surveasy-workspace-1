<template>
  <div class="link-modal" v-if="showLinkIframe">
    <div class="link-modal-contentsbox">
      <h2 class="link-modal-title">설문 링크 확인하기
        <button class="modal-close-button" @click="$emit('closeIframe')"><i class="fas fa-times"></i></button>
      </h2>
      <div class="link-modal-container">
        <iframe :src='iframe()' width="500" height="300"></iframe> 
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
  background-color: rgba(255, 255, 255, 0.469);
  display: table;
}
.link-modal-contentsbox {
  width: 500px;
  height: 400px;
  margin: 200px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}
</style>