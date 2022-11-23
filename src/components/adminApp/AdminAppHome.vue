<template>
<!-- <h1 class="admin-title">홈 컨텐츠</h1> -->
<div id="AppHome-title-container">
  <div class="AppHome-title" @click="setListType(0)" :class="{black:this.listType==0, grey:this.listType==1}">당신의 의견은 ?</div>
  <div class="AppHome-title">|</div>
  <div class="AppHome-title" @click="this.setListType(1)" :class="{black:this.listType==1, grey:this.listType==0}">우리가 함께 기여한 연구</div>
</div>

<div class="home_contents">
  <div v-if="this.listType==0">
    <h3>당신의 의견은?</h3>
    <div class="opinion-container">
      <input type="text" v-model="opinionQuestion" placeholder="새내기때 꼭 해봐야 하는 것은?" class="opinion-question"><br>
      <textarea v-model="opinionContent1" placeholder="도무지 뭘하면 좋을지 모르겠는 새내기들을 위해 1학년때 해보면 좋을 것들을 추천해주세요!" class="opinion-content"></textarea><br>
      <textarea v-model="opinionContent2" placeholder="작성해주신 답변은 새내기를 위한 컨텐츠로 제작되어 발행됩니다." class="opinion-content"></textarea>
    </div>
    <button @click="uploadOpinion">업로드 하기</button>
  </div>

  <div v-if="this.listType==0">
    <h3>Answer ( id : {{lastOpinionAnswerID}} )</h3>
    
    <div class="opinion-container">
      <input type="text" v-model="answerQuestion" placeholder="홈화면 Question |   당신의 인생 여행지를 알려주세요!" class="answer-question"><br>
      <input type="text" v-model="answerContent1" placeholder="상세 페이지 Contents |   당신의 인생 여행지는 어디인가요?" class="answer-question"><br>

      <div class="answer-img-container">
        <input id="answer-input" type="file" accept="image/*" @change="uploadImg" multiple>
        <div class="answer-img">
          <div v-for="i in imgList" :key="i.name">
            <img :src="i.url" alt="" id="answer-img-item">
            <div>{{i.name}}</div>  
          </div>
        </div>
      </div>
    </div>

    <button @click="uploadOpinionAnswer">업로드 하기</button>
  </div>

  <div v-if="this.listType==1">
    <h3>우리가 함께 기여한 연구</h3>
    <div class="contribution-container">
      <input type="text" v-model="contributionTitle" placeholder="연구 제목" class="contribution-title"><br>
      <input type="text" v-model="contributionJournal" placeholder="연구 등재 학술지" class="contribution-title"><br>
      <input type="text" v-model="contributionInstitute" placeholder="연구 기관" class="contribution-title"><br>
      <input type="text" v-model="contributionSource" placeholder="출처 링크" class="contribution-title"><br>
      <input type="text" v-model="contributionImg" placeholder="이미지 Storage 링크" class="contribution-title"><br>
      <input type="text" v-model="contributionDate" placeholder="설문 진행 날짜 (2022.01)" class="contribution-title"><br>
      <textarea v-model="contributionContent" placeholder="내용" class="contribution-content"></textarea>
    </div>
    <button @click="uploadContribution">업로드 하기</button>
    <!-- <button @click="fetchLastContributionID">last id</button> -->
  </div>

</div>






</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, } from '@firebase/storage'
export default {
  data() {
    return {
      listType: 0,

      lastID : [],
      lastOpinionID: 0,
      previousID: 0,
      opinionQuestion: '',
      opinionContent1: '',
      opinionContent2: '',

      lastOpinionAnswerID: 0,
      answerQuestion: '',
      answerContent1: '',
      answerContent2: '',
      answerContent3: '',
      imgList : [],


      lastContributionID: 0,
      contributionTitle: '',
      contributionJournal: '',
      contributionInstitute: '',
      contributionSource: '',
      contributionImg: '',
      contributionDate: '',
      contributionContent: '',
    }
  },

  mounted() {
    this.fetchLastOpinionAnswerID()
  },

  methods: {
    setListType(type) {
      this.listType = type;
    },

    
    // 당신의 의견은? lastID 불러오기
    async fetchLastOpinionID() {
      const db = this.$store.state.db
      const lastID = []
      const docRef = doc(db, "lastID", "lastOpinionID")
      const docSnap = await getDoc(docRef) 

      if(docSnap.exists()) {
        lastID.push(docSnap.data())
        this.lastOpinionID = lastID[0].lastOpinionID
        this.previousID = this.lastOpinionID - 1
      }
      
    },

    // 당신의 의견은 1개 업로드
    async uploadOpinion(){
      await this.fetchLastOpinionID()
      const db = this.$store.state.db

      var docRef = doc(db, "AppOpinion", this.lastOpinionID.toString())
      var previousRef = doc(db, "AppOpinion", this.previousID.toString())
      var lastDocRef = doc(db, "lastID", "lastOpinionID")

      await updateDoc(previousRef, {
        isValid: false
      })

      await setDoc(docRef, {
        id: this.lastOpinionID,
        question: this.opinionQuestion,
        content1: this.opinionContent1,
        content2: this.opinionContent2,
        isValid: true,
        opinions: []
      })

      await updateDoc(lastDocRef, {
        lastOpinionID : this.lastOpinionID + 1
      })

      window.alert("업로드 완료")
    },
    
    
    // 선택한 AppAnswer 이미지 목록 화면에 띄우기
    uploadImg(e) {
      this.imgList = []
      let file = e.target.files
      
      for(var i=0 ; i<file.length ; i++) {
        var url = URL.createObjectURL(file[i])
        var name = file[i].name
        this.imgList.push({img: file[i], url: url, name: name})
      }
    },


    // 당신의 의견은? Answer의 lastID 불러오기
    async fetchLastOpinionAnswerID() {
      const db = this.$store.state.db
      const lastID = []
      const docRef = doc(db, "lastID", "numberOpinionAnswer")
      const docSnap = await getDoc(docRef) 

      if(docSnap.exists()) {
        lastID.push(docSnap.data())
        this.lastOpinionAnswerID = lastID[0].lastOpinionAnswerID 
      }
      
    },

    // 당신의 의견은? Answer 1개 업로드
    async uploadOpinionAnswer(){
      await this.fetchLastOpinionAnswerID()
      const db = this.$store.state.db

      var docRef = doc(db, "AppAnswer", this.lastOpinionAnswerID.toString())
      var lastDocRef = doc(db, "lastID", "numberOpinionAnswer")

      console.log(this.answerQuestion)
      console.log(this.answerContent1)

      await setDoc(docRef, {
        id: this.lastOpinionAnswerID,
        question: this.answerQuestion,
        content1: this.answerContent1,
        content2: this.answerContent2,
        content3: this.answerContent3,
      })

      await updateDoc(lastDocRef, {
        lastOpinionAnswerID : this.lastOpinionAnswerID + 1
      })

      await this.uploadToStorage()

      window.alert("AppAnswer 업로드 완료")
    },


    // 당신의 의견은? Answer 이미지들 Storage 업로드
    async uploadToStorage() {
      const storage = getStorage()

      for(var i=0 ; i<this.imgList.length; i++) {
        const storageRef = ref(storage, "AppOpinionAnswerImage/" + String(this.lastOpinionAnswerID) + "/" + String(this.imgList[i].name)) 
        await uploadBytes(storageRef, this.imgList[i].img).then((snapShot) => {
          console.log("upload 성공 : " + this.imgList[i].name)
        })
      }
    },


    // 우리가 기여한 연구 lastID 불러오기
    async fetchLastContributionID() {
      const db = this.$store.state.db
      const lastID = []
      const docRef = doc(db, "lastID", "lastContributionID")
      const docSnap = await getDoc(docRef) 

      if(docSnap.exists()) {
        lastID.push(docSnap.data())
        this.lastContributionID = lastID[0].lastContributionID

        console.log("contribution id: " + this.lastContributionID)
      }
      
    },


    // 우리가 기여한 연구 1개 업로드
    async uploadContribution(){
      await this.fetchLastContributionID()

      const db = this.$store.state.db

      var docRef = doc(db, "AppContribution", this.lastContributionID + ") " + this.contributionTitle)
      var lastDocRef = doc(db, "lastID", "lastContributionID")

      await setDoc(docRef, {
        id: this.lastContributionID,
        title: this.contributionTitle,
        institute: this.contributionInstitute,
        journal: this.contributionJournal,
        img: this.contributionImg,
        source: this.contributionSource,
        date: this.contributionDate,
        content: this.contributionContent
      })

      await updateDoc(lastDocRef, {
        lastContributionID : this.lastContributionID + 1
      })

      window.alert("업로드 완료")
    }
    
  },

}
</script>

<style>
#AppHome-title-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
}
.AppHome-title {
  font-size: 30px;
  color: #9b9b9b;
  margin-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
}
.AppHome-title.black {
  font-size: 30px;
  color: #000000;
  font-weight: bold;
}
.AppHome-title.grey {
  font-size: 30px;
  color: #9b9b9b;
  font-weight: lighter;
}
.home_contents {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px;
  padding-top: 15px;
}
.opinion-container, .contribution-container {
  margin: 20px;
}
.answer-img-container{
  margin: 20px;
  padding: 20px;
  background-color: #cacaca4f;
  border-radius: 15px;
}
#answer-input {
  display: block;
  margin-bottom: 20px;
}
.answer-img {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 520px;
}
#answer-img-item {
  width: 160px;
  margin: 5px;
}
.opinion-question {
  width: 500px;
  height: 30px;
  margin-bottom: 5px;
}
.answer-question {
  width: 550px;
  height: 50px;
  margin-bottom: 10px;
}
.contribution-title {
  width: 600px;
  height: 30px;
}
.opinion-content{
  width: 500px;
  height: 100px;
}
.contribution-content {
  width: 600px;
  height: 280px;
}


</style>