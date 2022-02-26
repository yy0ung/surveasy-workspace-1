<template>
<div id="panelproofhome-container">
  설문 인증 홈
  <input type="text" placeholder="Survey ID" v-model="surveyID">
  
  <router-link :to="`/panelproof/${surveyID}`"><button>go</button></router-link>
</div>
</template>

<script>
export default {
  data() {
    return {
      surveyID : ''
    }
  },
  methods: {
  
  }

}
</script>

<style>

</style>