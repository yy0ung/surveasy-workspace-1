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
					<h1 class="text-white mb-3">{{panel}}명</h1>
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
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, query, where } from "firebase/firestore"

export default {
  data() {
    return {
      survey : "• • •",
      panel : "• • •",
      
    }
  },
  mounted() {
    this.surveyCount()
    this.panelCount()
  },
  methods: {
    async surveyCount(){
      const db = this.$store.state.db
      const docRef = doc(db, "lastID", "lastIDChecked")
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        
        this.survey = docSnap.data().lastIDChecked + 57 + "개"
      }
    },

    // async panelCount() {
    //   const db = this.$store.state.db
    //   const ref = collection(db, "panelData")
    //   // 패널 수 테스트
    //   const qt = query(ref, where("name", "!=", "야야야"));

    //   const qquerySnapshot = await getDocs(qt);
    //   qquerySnapshot.forEach((doc) => {
      
    //   });
    //   console.log("개수")
    //   this.panel = qquerySnapshot.size
    // },

    async panelCount() {
    let cnt = this.$store.state.activePannel
    let db = this.$store.state.db
    let now = new Date().getTime()
    var weekago = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    const ref = collection(db, "panelData")
    const q = query(ref, where("lastParticipatedDate", ">", weekago))
    var totalCount = 0
    var maleCount = 0
    var maleNames = []
    var maleAges = [0,0,0,0,0]
    var femaleNames = []
    var femaleAges = [0,0,0,0,0]
    var femaleCount = 0
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      totalCount +=1
      let gender = doc.data().gender;
      if (gender == "남") {
        maleCount += 1
        maleNames.push(doc.data().name)
        var birthDate = new Date(doc.data().birthDate)
        var dif = Math.floor((now - birthDate.getTime()) / 1000) 
        var age = Math.ceil(dif / (60 * 60 * 24 * 365))
        if (age >= 20 && age < 25) {
          maleAges[0] += 1
        } else if (age >= 25 && age < 30){
          maleAges[1] +=1 
        } else if (age >= 30 && age < 40){
          maleAges[2] +=1 
        } else if (age >= 40 && age < 50){
          maleAges[3] +=1 
        } else {
          maleAges[4] +=1 
        } 
      } else {
        femaleCount += 1
        femaleNames.push(doc.data().name)
        var birthDate = new Date(doc.data().birthDate)
        var dif = Math.floor((now - birthDate.getTime()) / 1000) 
        var age = Math.ceil(dif / (60 * 60 * 24 * 365))
        if (age >= 20 && age < 25) {
          femaleAges[0] += 1
        } else if (age >= 25 && age < 30){
          femaleAges[1] +=1 
        } else if (age >= 30 && age < 40){
          femaleAges[2] +=1 
        } else if (age >= 40 && age < 50){
          femaleAges[3] +=1 
        } else {
          femaleAges[4] +=1 
        } 
      }
  
    });
    
    cnt.totalCount = totalCount
    this.panel = totalCount
    cnt.maleCount = maleCount
    cnt.femaleCount = femaleCount
    cnt.femaleAges = femaleAges
    cnt.maleAges = maleAges
    console.log(maleAges)
    console.log(femaleAges)
    // this.totalCount = totalCount
    // this.maleAges = maleAges
    // this.maleCount = maleCount
    // this.femaleAges = femaleAges
    // this.femaleCount = femaleCount
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