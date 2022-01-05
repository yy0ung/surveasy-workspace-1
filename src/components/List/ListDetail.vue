<template>
  <div>
    <p>키워드</p>
    <p>{{detailSurveyData[0].keyword}}</p>
    <iframe :src="detailSurveyLink" width="1000" height="500" frameborder="0"></iframe>
    <div>
      <p>인증 사진 첨부</p>
      <input type="file" name="" id="">

      <button @click="addToRespondedArray(this.$route.params.id)">인증한것으로 바꾸기</button>
    </div>
    
  </div>
</template>

<script>
import { doc, updateDoc, arrayUnion } from 'firebase/firestore' 
export default {
  data(){
    return{
      detailID : this.$route.params.id,
      detailSurveyData : this.$store.state.surveyData[(this.$store.state.surveyData).length - this.$route.params.id],
      

    }
  },
  methods:{
    async addToRespondedArray(respondID){
      console.log('add')
      var db = this.$store.state.db
      var currentUser = this.$store.state.currentUser
      const userRef = doc(db, "userData", currentUser.email);
      
      // Set the "capital" field of the city 'DC'
      await updateDoc(userRef, {
        respondArray: arrayUnion(Number(respondID))
      });
      // this.$store.dispatch('setCurrentUser')
      console.log('add2')
    }
  },
  computed: {
    detailSurveyLink: function() {
      var survData = this.$store.state.surveyData
      return survData[(survData).length - this.$route.params.id][0].surveyLink
    }
  }
}
</script>

<style>

</style>