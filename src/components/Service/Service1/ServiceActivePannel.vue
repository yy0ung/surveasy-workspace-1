<template>
  <div id="service-active-pannel">
    <p class="p-black-bold">설문대상별 수집 가능한 <span class="p-green-bold">최대 응답 수</span></p>
    <div class="loading-contianer" v-if="!this.loading">
      <p class="spinner-loading">
        <i class="fas fa-spinner"></i>
          불러오는 중 
      </p>
    </div>
    <div class="active-pannel-box-continer" v-if="this.loading">
    <div class="table-container">
      <table class="active-table">
        <tr class="table-topline">
          <th class="table-topline" id="table-draw"></th>
          <th class="table-topline">성별무관</th>
          <th class="table-topline">남성</th>
          <th class="table-topline">여성</th>
        </tr>
        <tr>
          <td class="table-leftline">전연령</td>
          <td>{{ Math.floor(maleCount/10)*10 + Math.floor(femaleCount/10)*10 }}명</td>
          <td>{{ Math.floor(maleCount/10)*10 }}명</td>
          <td>{{ Math.floor(femaleCount/10)*10 }}명</td>
        </tr>
        <tr>
          <td class="table-leftline">20대</td>
          <td>{{ Math.floor((maleAges[0] + maleAges[1])/10)*10 + Math.floor((femaleAges[0] + femaleAges[1])/10)*10 }}명</td>
          <td>{{ Math.floor((maleAges[0] + maleAges[1])/10)*10 }}명</td>
          <td>{{ Math.floor((femaleAges[0] + femaleAges[1])/10)*10 }}명</td>
        </tr>
        <tr>
          <td class="table-leftline">20세 이상 24세 이하</td>
          <td>{{ Math.floor(maleAges[0]/10)*10 + Math.floor(femaleAges[0]/10)*10 }}명</td>
          <td>{{ Math.floor(maleAges[0]/10)*10 }}명</td>
          <td>{{ Math.floor(femaleAges[0]/10)*10 }}명</td>
        </tr>
        <tr>
          <td class="table-leftline">25세 이상 29세 이하</td>
          <td>{{ Math.floor((maleAges[1])/10)*10 + Math.floor((femaleAges[1])/10)*10 }}명</td>
          <td>{{ Math.floor((maleAges[1])/10)*10 }}명</td>
          <td>{{ Math.floor((femaleAges[1])/10)*10 }}명</td>
        </tr>
        <tr>
          <td class="table-leftline">20세 이상 39세 이하</td>
          <td>{{ Math.floor((maleAges[0] + maleAges[1] + maleAges[2])/10)*10 + Math.floor((femaleAges[0] + femaleAges[1] + femaleAges[2])/10)*10 }}명</td>
          <td>{{ Math.floor((maleAges[0] + maleAges[1] + maleAges[2])/10)*10 }}명</td>
          <td>{{ Math.floor((femaleAges[0] + femaleAges[1] + femaleAges[2])/10)*10 }}명</td>
        </tr>
        <tr>
          <td class="table-leftline">20세 이상 49세 이하</td>
          <td>{{ Math.floor((maleAges[0] + maleAges[1] + maleAges[2] + maleAges[3])/10)*10 + Math.floor((femaleAges[0] + femaleAges[1] + femaleAges[2] + femaleAges[3])/10)*10 }}명</td>
          <td>{{ Math.floor((maleAges[0] + maleAges[1] + maleAges[2] + maleAges[3])/10)*10 }}명</td>
          <td>{{ Math.floor((femaleAges[0] + femaleAges[1] + femaleAges[2] + femaleAges[3])/10)*10  }}명</td>
        </tr>
        
      </table>
      
    </div>  
    
      <div class="content-container">
      <p class="p-black-content">설문 대상의 연령과 성별에 따라<br>수집 가능한 최대 응답 수 입니다.
      <br>옵션 선택 시 참고해주세요.</p>
      <p class="p-black-content">예를 들어, 20대 성별 무관 선택 시,<br>
      최대 {{ Math.floor((maleAges[0] + maleAges[1] + femaleAges[0] + femaleAges[1])/10)*10 }}명의 응답을 받으실 수 있어요!</p>
    </div>
    
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
      femaleAges : [],
      loading : true
    }
  },
  mounted() {
    this.panelTest()
  },
  methods: {
    async panelTest() {
      let cnt = this.$store.state.activePannel
      if(cnt.totalCount==0){
        this.loading = false
        
        this.inner()
      }else{
        this.totalCount = cnt.totalCount
        this.maleCount = cnt.maleCount
        this.femaleCount = cnt.femaleCount
        this.maleAges = cnt.maleAges
        this.femaleAges = cnt.femaleAges
      }
    },

    async inner(){
      let db = this.$store.state.db
      let now = new Date().getTime()
      var weekago = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000);
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
      
      this.totalCount = totalCount
      this.maleAges = maleAges
      this.maleCount = maleCount
      this.femaleAges = femaleAges
      this.femaleCount = femaleCount
      this.loading = true
      
    }
}
}
</script>


<style>
#service-active-pannel{
  width: auto;
  
  margin: 80px 23px 35px 80px;
  padding: 35px 20px;
  padding-left : 50px;
  background-color: #EEEEEE;
  border-radius: 10px;
  
}
.loading-container{
  padding-top: 50px;
  text-align: center;
  margin-top: 100px;
}
.loading-container .spinner-loading{
  width: auto;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.3rem;
  margin-top: 100px;
  
}


.active-pannel-box-continer{
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  
}
.content-container{
  font-family: 'Noto Sans KR', sans-serif;
  text-align: left;
  
  margin-right: 50px;
  margin-top: 55px;
  }

.table-container{
  margin-right: 0;
  min-width: 580px;
  
}

.active-table{
  margin-right: 0;
}

#table-draw{
  background: transparent url('~@/assets/service/draw.png') no-repeat padding-box;
}

#service-active-pannel .p-black-bold{
  margin-bottom: 40px;
  margin-top: 0px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  font-family: 'Noto Sans KR', sans-serif;
}
.p-green-bold{
  margin-top: 0;
  text-align: left;
  color: #0CAE02;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 30px;
  font-family: 'Noto Sans KR', sans-serif;
}

.p-black-content{
  text-align: left;
  font-size: 0.95rem;
  font-weight: 400;
  font-family: 'Noto Sans KR', sans-serif;
}


.active-table{
  font-size: 0.95rem;
  font-weight: 400;
  font-family: 'Noto Sans KR', sans-serif;
  background: #FFFFFF;
  border : #0000009C 0.5px solid;
  border-collapse: collapse;
}

.table-container .active-table th, .table-container .active-table td{
  border: #0000009C 0.5px solid;
  font-weight: 400;
  padding: 7px 30px;
}

.table-leftline{
  background: #0AAB0040;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 7px 30px;
}

.table-topline{
  font-weight: 600;
  font-size: 1.1rem;

}

</style>