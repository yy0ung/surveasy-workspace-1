<template>
  <div id="service-active-pannel">
    <div class="content-container">
      <p class="black-bold">설문대상별 수집 가능한</p>
      <p class="green-bold">최대 응답 수</p>
      <p class="black-content">설문 대상의 연령과 성별에 따라<br>수집 가능한 최대 응답 수 입니다.
      <br>옵션 선택 시 참고해주세요.</p>
      <p class="black-content">예를들어, 20대 성별 무관 선택 시,<br>
      최대 170명의 응답을 받으실 수 있어요!</p>
    </div>
    <div class="table-container">
      <table>
        <tr>
          <th></th>
          <th>성별무관</th>
          <th>남성</th>
          <th>여성</th>
        </tr>
        <tr>
          <td>전연령</td>
          <td>{{ maleCount+femaleCount }}</td>
          <td>{{ maleCount }}</td>
          <td>{{ femaleCount }}</td>
        </tr>
        <tr>
          <td>20대</td>
          <td>{{ maleAges[0] + maleAges[1] + femaleAges[0] + femaleAges[1]}}</td>
          <td>{{ maleAges[0] + maleAges[1] }}</td>
          <td>{{ femaleAges[0] + femaleAges[1] }}</td>
        </tr>
        <tr>
          <td>20세 이상 24세 이하</td>
          <td>{{ maleAges[0] + femaleAges[0] }}</td>
          <td>{{ maleAges[0] }}</td>
          <td>{{ femaleAges[0] }}</td>
        </tr>
        <tr>
          <td>25세 이상 29세 이하</td>
          <td>{{ maleAges[1] + femaleAges[1] }}</td>
          <td>{{ maleAges[1] }}</td>
          <td>{{ femaleAges[1] }}</td>
        </tr>
        <tr>
          <td>20세 이상 39세 이하</td>
          <td>{{ maleAges[0] + maleAges[1] + maleAges[2] + femaleAges[0] + femaleAges[1] + femaleAges[2] }}</td>
          <td>{{ maleAges[0] + maleAges[1] + maleAges[2] }}</td>
          <td>{{ femaleAges[0] + femaleAges[1] + femaleAges[2] }}</td>
        </tr>
        <tr>
          <td>20세 이상 49세 이하</td>
          <td>{{ maleAges[0] + maleAges[1] + maleAges[2] + maleAges[3] + femaleAges[0] + femaleAges[1] + femaleAges[2] + femaleAges[3] }}</td>
          <td>{{ maleAges[0] + maleAges[1] + maleAges[2] + maleAges[3] }}</td>
          <td>{{ femaleAges[0] + femaleAges[1] + femaleAges[2] +femaleAges[3] }}</td>
        </tr>
        
      </table>
    </div>
  </div>  
</template>

<script>
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, query, where } from "firebase/firestore"
export default {
  data(){
    return {
      totalCount : 0,
      maleCount: 0,
      femaleCount: 0,
      maleAges: [],
      femaleAges : []
    }
  },
  mounted() {
    this.panelTest()
  },
  methods: {
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
  

}
}
</script>


<style>
#service-active-pannel{
  width: auto;
  margin: 80px 23px 35px 80px;
  background-color: #EEEEEE;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
}
.content-container{
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  }
#service-active-pannel .black-bold{
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Noto Sans KR', sans-serif;
}
#service-active-pannel .green-bold{
  text-align: left;
  color: #0CAE02;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Noto Sans KR', sans-serif;
}

</style>