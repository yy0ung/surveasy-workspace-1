<template>
<div id="admin-panelProof">
<h4>설문 인증 {{id}}</h4>
<<<<<<< HEAD
<h4>{{nowHeadCount}} / {{headCount}}</h4>

<div class="wrong-notification" v-for="token in wrongTokens" :key="token">
  <ol>
    <li id="token"><input type="checkbox">{{token}}</li>
=======

<div class="wrong-notification" v-for="token in wrongTokens" :key="token">
  <ol>
    <li>{{token}}</li>
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
  </ol>
</div>
<div>
  <button @click="doneCheck">완료하기</button>
</div>
  

<span v-for="item in urlList" :key="(item)">
  <img :src="item[0]" class="proof-image">
<<<<<<< HEAD
  <input type="checkbox" @click="cancelProof(item[1])">
  <span class="fileName" :class="{active: changeColor.indexOf(item[1].substring(38))!=-1}">{{item[1].substring(38)}}</span>
  
  
</span>
=======
  <!-- 버튼 눌렀을 때 기능 구현 -->
  <input type="checkbox" @click="cancelProof(item[1],item[0])">{{item[1].substring(38)}}
  
</span>
<!-- <div class="proof-dialog" v-if="showDialog">
    <h4>인증 사진 지우기</h4>
    <div class="wrong-img">
      <img :src="imgCheck">
      <p>이용자 uid__업로드 날짜시간 : {{wrongProofInfo}}</p>
    </div>
    <button @click="showDialog=false">창 닫기</button>
    <button @click="cancelProof(wrongProofInfo)">취소하기</button>
</div> -->
<!-- <span v-for="item in imageInfo" :key="item">
  <span id="info-text">{{item}}</span>
</span> -->

>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
</div> 
</template>

<script>
import { getStorage, ref, getDownloadURL, listAll, list, deleteObject } from "firebase/storage"
<<<<<<< HEAD
import { getDocs, getDoc, setDoc, updateDoc, doc, collection, arrayUnion, deleteDoc, arrayRemove } from 'firebase/firestore';
=======
import { getDocs, getDoc, setDoc, updateDoc, doc, collection, arrayUnion } from 'firebase/firestore';
import { getMessaging, onMessage } from "firebase/messaging";
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
export default {
  data() {
    return {
      urlList : [],
      id : this.$route.params.id,
      imgCheck : "",
      wrongProofInfo : "",
      userUid : "",
<<<<<<< HEAD
      wrongProofUserUid : [],
      userInfo : [],
      wrongTokens : [],
      fbSaveWrongInfo : [],
      changeColor : [],
      headCount : 0,
      nowHeadCount : 0
=======
      userInfo : [],
      wrongTokens : [],
      wrongUrl : [],
      selected : false
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
      
      //imageInfo : []
    }
  },
  mounted() {
    this.downLoad()
  },
  methods: {
<<<<<<< HEAD
    async cancelProof(info){
=======
    async cancelProof(info,url){
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
      this.wrongProofInfo = info
      var start = this.wrongProofInfo.indexOf("/")
      var end = this.wrongProofInfo.indexOf("_")
      this.userUid = this.wrongProofInfo.substring(start+1,end)
<<<<<<< HEAD
      this.wrongProofUserUid.push(this.userUid)
      const db = this.$store.state.db
      this.fbSaveWrongInfo.push(info.substring(38))

=======
      const db = this.$store.state.db
      this.wrongUrl.push(url)
      
      // const imgRef = ref(storage,path)
      // deleteObject(imgRef).then(() => {
      //   if(confirm("삭제 성공")){
      //     this.showDialog=false
      //     this.$router.go()
      //   }

      // }).catch((error) => {
      //   window.alert("삭제 실패")
      // })

      
    
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
      const docSnap = await getDocs(collection(db,"AndroidUser"))
      docSnap.forEach((doc) => {
        if(doc.id == this.userUid){
          this.userInfo.length = 0
          this.userInfo.push(doc.data())
          console.log(this.userInfo[0].fcmToken)
          this.wrongTokens.push(this.userInfo[0].fcmToken)
          
        }
        
      })
   
    },
    async downLoad(){
      const storage = getStorage()
      const db = this.$store.state.db
      const docRef = doc(db, "WrongProof", this.id.toString())
      const docSnap = await getDoc(docRef)
<<<<<<< HEAD
      const docRef2 = doc(db, "AndroidSurvey", this.id.toString())
      const docSnap2 = await getDoc(docRef2)
      this.headCount = docSnap2.data().requiredHeadCount
      this.nowHeadCount = docSnap2.data().respondedPanel.length-1
      var wrongFileName = []
      if(docSnap.exists()){
        wrongFileName.push(docSnap.data().fileName)
        console.log("doc",wrongFileName[0])
=======
      var wrong = []
      if(docSnap.exists()){
        wrong.push(docSnap.data())
        console.log(wrong)
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
      }
      
      const listRef = ref(storage, this.id+"/")
      await listAll(listRef)
      .then((res) => {
<<<<<<< HEAD
        //window.alert("불러오는 중")
=======
        window.alert("불러오는 중")
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
      res.prefixes.forEach((folderRef) => {
       //console.log(folderRef)
     });
      res.items.forEach((itemRef) => {
        //console.log(itemRef._location)
        const path = ref(storage, itemRef._location.path_)
        getDownloadURL(path).then((url) => {
        var list = [url,itemRef._location.path_]
        this.urlList.push(list)
<<<<<<< HEAD
        //console.log(list)
        var i =0
        //왜 안되는지 모르겠는데 숫자가 크면 됨.
        while(i<=wrongFileName.length+1000){
          if(wrongFileName[0][i] == list[1].substring(38)){
            //console.log(wrongFileName[0][i], list[1].substring(38))
            //console.log("done")
            this.changeColor.push(wrongFileName[0][i])
            i++
          }else{
            //console.log(wrongFileName[0][i], list[1].substring(38))
            //console.log("not done")
            i++
          }
        } 
        })
      })
    }).catch((error) => {
=======
  
        })
        
      })
      
    }).catch((error) => {
      
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
    });
      },
    
  async doneCheck(){
    const db = this.$store.state.db
    const docRef = doc(db, "WrongProof", this.id.toString())
<<<<<<< HEAD
    const docRef2 = doc(db, "AndroidSurvey", this.id.toString())
    const docSnap2 = await getDoc(docRef2)
    
    console.log(docSnap2.data().respondedPanel)
  
=======
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
    const docSnap = await getDoc(docRef)
    var i =0
    if(docSnap.exists()){
      console.log("yes")
      var i =0
<<<<<<< HEAD
      while(i<this.fbSaveWrongInfo.length){
      await updateDoc(docRef,{
        fileName : arrayUnion(this.fbSaveWrongInfo[i])
=======
      while(i<this.wrongUrl.length){
      await updateDoc(docRef,{
        url : arrayUnion(this.wrongUrl[i])
>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
      })
      i++
    }
    }else{
      await setDoc(docRef,{
<<<<<<< HEAD
        fileName : this.fbSaveWrongInfo
      })
    }

    
    var i =0
    while(i<this.wrongProofUserUid.length){
      await deleteDoc(doc(db, "AndroidUser", this.wrongProofUserUid[i].toString(),"UserSurveyList",this.id.toString()))
      const dRef = await getDoc(doc(db,"AndroidUser", this.wrongProofUserUid[i].toString()))
      var nowCurrentReward = dRef.data().reward_current
      var nowTotalReward = dRef.data().reward_total
      await updateDoc(doc(db,"AndroidUser", this.wrongProofUserUid[i].toString()),{
          reward_current : nowCurrentReward - docSnap2.data().reward,
          reward_total : nowTotalReward - docSnap2.data().reward
      })

      await updateDoc(doc(db,"AndroidSurvey", this.id.toString()),{
          respondedPanel : arrayRemove(this.wrongProofUserUid[i].toString())
      })
      i++
    
    }
    window.alert("처리 완료")
=======
        url : this.wrongUrl
      })
    }

>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
    this.$router.go()
    
      
  }
    
    
    }

}
</script>

<style>
#admin-panelProof{
  height: 1000px;
}
.proof-image{
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
#info-text{
  font-size: 10px;
  margin-right: 10px;
}
.proof-dialog{
  position: absolute;
  left: 50px;
  top: 50px;
  background: #c5c4c4;
}
<<<<<<< HEAD
.fileName.active{
  color: red;
}
#token{
  font-size: 13px;
}

=======
.proof-image.active{
  border: red solid 1px;
}


>>>>>>> 8ec3aa93fe6ffbc5778297b2f339519b303051d1
</style>