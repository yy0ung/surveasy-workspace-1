<template>
  <div class="memo-container">
    <div class="memo-container-title">
      <h2>메모장</h2>
      <div>ID :  {{id}} </div>
      <div>Title : {{title}}</div>
    </div>
      
    <div class="memo-container-main">
      <div id="memo-container-sub">
        <h3>메모 목록</h3>

        <!-- 기존 메모 목록 있음 -->
        <div id="memo-notice" v-if="this.loading">로딩중</div>
        <div v-else>
          <div v-if="this.hasMemo" id="memo-container-sub-list">
            <div v-for="item in (this.memoList)" :key="item.id" id="memo-item">
              <p id="memo-item-contents">{{item.contents}}</p>
              <p id="memo-item-date">{{item.created_at}}</p>
            </div>
          </div>
          <div v-else id="memo-notice">현재까지 작성된 메모가 없습니다.</div>
        </div>    

        <!-- 기존 메모 목록 없음 -->
        
        
      </div>

      <div id="memo-container-sub">
        <h3>메모 작성</h3>
        <textarea id="memo-input" v-model="contents" placeholder="메모 내용 입력하기"></textarea>
        <div>
          <button id="memo-write-btn" @click="uploadMemo()">메모 업로드하기</button>
        </div>
      </div>
    </div>
  </div>
      
</template>

<script>
import { getFirestore,collection, getDocs, updateDoc, doc, deleteDoc, setDoc, getDoc, orderBy, query } from 'firebase/firestore'
export default {
  data() {
    return {
      id : this.$route.params.id,
      title : this.$route.params.title,
      hasMemo : false,
      loading : true,
      memoList: [],

      contents: ""
    }
  },

  mounted() {
    this.fetchHasMemo()
  },

  methods: {
    async fetchHasMemo() {
      const db = this.$store.state.db
      const docRef = doc(db, "surveyData", this.id.toString())
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()) {
        this.hasMemo = docSnap.data().hasMemo
        if(this.hasMemo) this.fetchMemoList()
        else this.loading = false
      }
    },

    async fetchMemoList() {
      this.loading = true
      this.memoList = []

      const db = this.$store.state.db
      const docRef = collection(db, "memoData", this.id.toString(), "memoList")
      const q = query(docRef, orderBy("created_at", "desc"))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        this.memoList.push(doc.data())
      })

      this.loading = false
    },

    async uploadMemo() {
      if(this.contents == '') {
        window.alert("메모 내용을 입력해주세요")
        return
      }

      const db = this.$store.state.db
      var now = this.timestamp()
      var docRef = doc(db, "memoData", this.id.toString(), "memoList", now)

      var surveyRef = doc(db, "surveyData", this.id.toString())

      if(!this.hasMemo) {
        console.log("!")
        await updateDoc(surveyRef, {
          hasMemo : true
        })
      }
      
      await setDoc(doc(db, "memoData", this.id.toString()), {
        id: this.id.toString()
      })

      await setDoc(docRef, {
        contents: this.contents,
        created_at: now
      }).then(
        alert('메모 업로드 완료'),
        this.$router.go()
      )      
      
    },
    
    timestamp() {
      var today = new Date();
      today.setHours(today.getHours() + 9);
      console.log(today.toISOString().replace('T', ' ').substring(0, 19))
      return today.toISOString().replace('T', ' ').substring(0, 19);
    }
  }
}
</script>

<style>
.memo-container {
  padding: 20px;
  text-align: center;
}
.memo-container-main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#memo-container-sub {
  width: 40%;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 20px;
  justify-content: center;
  border: 2px solid #e9e9e9;
  border-radius: 10px;
}
#memo-container-sub-list {
  margin-top: 30px;
}
#memo-notice {
  color: rgb(185, 185, 185);
  font-size: 18px;
  margin-top: 50px;
}
#memo-item {
  padding: 20px;
  background-color: rgb(236, 236, 236);
  border-radius: 10px;
  margin-top: 10px;
  color: rgb(86, 86, 86);
}
#memo-item-contents {
  width: 100%;
  text-align: left;
  font-size: 16px;
}
#memo-item-date {
  width: 100%;
  text-align: right;
  font-size: 13px;
  color: rgb(148, 148, 148);
}
#memo-input {
  width: 90%;
  height: 200px;
  margin-top: 20px;
  padding: 10px;
  color: rgb(0, 0, 0);
  font-size: 17px;
}

#memo-write-btn {
  width: 180px;
  height: 30px;
  margin-top: 20px;
  color:#0CAE02;
  background-color: #FFFFFF;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
#memo-write-btn:hover{
  color: white;
  background: #0AAB00;
}
</style>