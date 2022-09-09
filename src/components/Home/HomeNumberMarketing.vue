<template>
<div class="number-marketing">
	<div class="container">
		<div class="row justify-content-center align-items-center">
			<div class="col-lg-6 m-5">
				<div class="section-title text-center">
        </div>
			</div>
		</div>
		<div class="row justify-content-center">
      <div class="col-lg-4 col-md-6">
				<div class="number-marketing-card block text-center">
					<h1 class="text-white mb-3">{{survey}}</h1>
          <hr class="text-white m-0" style="width: 100%">
					<h4 class="text-white mt-4">지금까지 진행된 리서치 수</h4>
          <p class="text-white">* 설문 응답 수집, 인터뷰이 모집, 베타테스터 모집</p>
				</div>
			</div>
			<div class="col-lg-4 col-md-6">
				<div class="number-marketing-card block text-center">
					<h1 class="text-white mb-3">134명</h1>
          <hr class="text-white m-0" style="width: 100%">
					<h4 class="text-white mt-4">리서치 참여를 기다리는 패널 수</h4>
				</div>
			</div>
			<div class="col-lg-4 col-md-6">
				<div class="number-marketing-card block text-center">
					<h1 class="text-white mb-3">4.7점</h1>
          <hr class="text-white m-0" style="width: 100%">
					<h4 class="text-white mt-4">서비스 평균 만족도</h4>
				</div>
			</div>
    </div>
		</div>
</div>
</template>

<script>
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"

export default {
  data() {
    return {
      survey : "• • •",
      
    }
  },
  mounted() {
    this.surveyCount()
  },
  methods: {
    async surveyCount(){
      const db = this.$store.state.db
      const docRef = doc(db, "lastID", "lastIDChecked")
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        
        this.survey = docSnap.data().lastIDChecked + 57 + "개"
      }
      
    }
  },

}
</script>

<style>
.number-marketing {
  background-color: #0AAC00;

  padding: 50px;
}

.number-marketing-card {
  background-color: #0AAC00;
  width:350px;
  height: 250px;
  margin:auto;
  
}
</style>