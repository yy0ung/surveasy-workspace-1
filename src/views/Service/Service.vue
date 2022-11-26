<template>
  <div class="service-container">
    <div class="service-detail">
      <ServiceActivePannel/>
      <ServiceDetail />
    </div>
      <ServiceOption />
  </div>
  
</template>

<script>
import ServiceDetail from '../../components/Service/Service1/ServiceDetail.vue'
import ServiceOption from '../../components/Service/Service1/ServiceOption.vue'
import ServiceActivePannel from '../../components/Service/Service1/ServiceActivePannel.vue'
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, query, where } from "firebase/firestore"

export default {
  components:{
    ServiceDetail,
    ServiceOption,
    ServiceActivePannel
  },
  mounted() {
    window.scrollTo(0,0)
    this.pannelTest()
  },
  methods: {
    //active pannel
    async pannelTest() {
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
    cnt.maleCount = maleCount
    cnt.femaleCount = femaleCount
    cnt.femaleAges = femaleAges
    cnt.maleAges = maleAges
    console.log("실행?")
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
.service-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}
</style>