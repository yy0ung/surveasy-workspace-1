<template>
<div id="admin-panelProof">
<h4>설문 인증 {{id}}</h4>

<div class="wrong-notification" v-for="token in wrongTokens" :key="token">
  <ol>
    <li>{{token}}</li>
  </ol>
</div>
<div>
  <button @click="doneCheck">완료하기</button>
</div>
  

<span v-for="item in urlList" :key="(item)">
  <img :src="item[0]" class="proof-image">
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

</div> 
</template>

<script>
import { getStorage, ref, getDownloadURL, listAll, list, deleteObject } from "firebase/storage"
import { getDocs, getDoc, setDoc, updateDoc, doc, collection, arrayUnion } from 'firebase/firestore';
import { getMessaging, onMessage } from "firebase/messaging";
export default {
  data() {
    return {
      urlList : [],
      id : this.$route.params.id,
      imgCheck : "",
      wrongProofInfo : "",
      userUid : "",
      userInfo : [],
      wrongTokens : [],
      wrongUrl : [],
      selected : false
      
      //imageInfo : []
    }
  },
  mounted() {
    this.downLoad()
  },
  methods: {
    async cancelProof(info,url){
      this.wrongProofInfo = info
      var start = this.wrongProofInfo.indexOf("/")
      var end = this.wrongProofInfo.indexOf("_")
      this.userUid = this.wrongProofInfo.substring(start+1,end)
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
      var wrong = []
      if(docSnap.exists()){
        wrong.push(docSnap.data())
        console.log(wrong)
      }
      
      const listRef = ref(storage, this.id+"/")
      await listAll(listRef)
      .then((res) => {
        window.alert("불러오는 중")
      res.prefixes.forEach((folderRef) => {
       //console.log(folderRef)
     });
      res.items.forEach((itemRef) => {
        //console.log(itemRef._location)
        const path = ref(storage, itemRef._location.path_)
        getDownloadURL(path).then((url) => {
        var list = [url,itemRef._location.path_]
        this.urlList.push(list)
  
        })
        
      })
      
    }).catch((error) => {
      
    });
      },
    
  async doneCheck(){
    const db = this.$store.state.db
    const docRef = doc(db, "WrongProof", this.id.toString())
    const docSnap = await getDoc(docRef)
    var i =0
    if(docSnap.exists()){
      console.log("yes")
      var i =0
      while(i<this.wrongUrl.length){
      await updateDoc(docRef,{
        url : arrayUnion(this.wrongUrl[i])
      })
      i++
    }
    }else{
      await setDoc(docRef,{
        url : this.wrongUrl
      })
    }

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
.proof-image.active{
  border: red solid 1px;
}


</style>