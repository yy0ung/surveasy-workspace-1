<template>

<div id="number-marketing-container">
  <div class="number-contents">
    <p><span id="number-bold">675명</span>
      <br>
      <br>
      <span id="number-none">현재 대기 중인 패널</span>
    </p>
    <p><span id="number-bold" >{{survey}}</span>
      <br>
      <br>
      <span id="number-none">지금까지 설문 응답 서비스를 </span>
      <br>
      <span id="number-none">이용한 의뢰 개수</span>
    </p>
    <p><span id="number-bold">1시간 12분</span>
      <br>
      <br>
      <span id="number-none">50개 응답까지 걸린 최단 시간 </span>
      <br>
      <span id="number-none">(실사례이나, 모든 설문에 해당되지는 않음)</span>
    </p>
  </div>
  <div>
    <table>
      <tr>
        <th></th>
        <th>남</th>
        <th>여</th>
      </tr>
      <tr>
        <td>10대</td>
        <td>{{ maleAges[0] }}</td>
        <td>{{ femaleAges[0] }}</td>
      </tr>
      <tr>
        <td>20대</td>
        <td>{{ maleAges[1] }}</td>
        <td>{{ femaleAges[1] }}</td>
      </tr>
      <tr>
        <td>30대</td>
        <td>{{ maleAges[2] }}</td>
        <td>{{ femaleAges[2] }}</td>
      </tr>
      <tr>
        <td>40대</td>
        <td>{{ maleAges[3] }}</td>
        <td>{{ femaleAges[3] }}</td>
      </tr>
      <tr>
        <td>50대이상</td>
        <td>{{ maleAges[4] }}</td>
        <td>{{ femaleAges[4] }}</td>
      </tr>
      <tr>
        <td>합계</td>
        <td>{{ maleCount }}</td>
        <td>{{ femaleCount }}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, query, where } from "firebase/firestore"

export default {
  data() {
    return {
      survey : "• • •",
      totalCount : 0,
      maleCount: 0,
      femaleCount: 0,
      maleAges: [],
      femaleAges : []
    }
  },
  mounted() {
    this.surveyCount()
    this.panelTest()
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

    async panelTest() {
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
          if (age < 20) {
            maleAges[0] += 1
          } else if (age >= 20 && age < 30){
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
          if (age < 20) {
            femaleAges[0] += 1
          } else if (age >= 20 && age < 30){
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
      console.log("남 ->", maleCount)
      console.log(maleNames)
      console.log(femaleNames)
      console.log("여 ->", femaleCount)
      console.log("활성패널 수")
      console.log(maleAges)
      this.totalCount = totalCount
      this.maleAges = maleAges
      this.maleCount = maleCount
      this.femaleAges = femaleAges
      this.femaleCount = femaleCount
    }
  },

}
</script>

<style>
#number-marketing-container{
  background: #0AAC00 0% 0% no-repeat padding-box;
  
  margin-top: 60px;
  border:none;
  border-radius: 24px;
  

}
#number-marketing-container .number-contents{
  margin-left: 0px;
  margin-right:0;
  display: flex;
  justify-content: space-evenly;
  padding-top: 90px;
  color: #fff;
  padding: 60px 40px;
  
}

#number-marketing-container #number-none{
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  

}

#number-marketing-container #number-bold{
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 4rem;
  font-weight: 900;
}



</style>