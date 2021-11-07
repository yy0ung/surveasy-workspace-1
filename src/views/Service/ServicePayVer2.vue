<template>
  <h2>송금 안내 페이지</h2>

  <button @click="surveyUplooad()">송금 완료</button>
</template>

<script>
import { doc, setDoc } from "firebase/firestore"
export default {
  methods: {
    async surveyUpload() {
      var db = this.$store.state.db

      await setDoc((doc(db, "surveyData"))), {
        paidprice: this.$store.state.localSurveyState.price,
        headCount: this.$store.state.localSurveyState.requiredHeadCount,
        spendTime: this.$store.state.localSurveyState.spendTime,
        surveyTitle: this.$store.state.localSurveyState.title,
        surveyInstitute: this.$store.state.localSurveyState.institute,
        surveyLink: this.$store.state.localSurveyState.link,
      }

    }
  }
}
</script>

<style>

</style>