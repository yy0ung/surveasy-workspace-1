<template>

 <!-- 설문 수정 모달창 -->
  <div v-if="editModal==true" class="edit-modal">
    <div class="edit-contentsbox">
      <div id="edit-top">
        <a class="edit-close" @click="close_modal()"><i class="fas fa-times"></i></a>
        <p class="edit-title">설문 수정하기</p>

      </div>
      
      <div id="edit-container">
        <div id="detail-title">설문 제목</div>
          <input class="form-control shadow-none" type="text" v-model="title" required>
        </div>

        <div id="edit-container">
          <div id="detail-title">설문 링크</div>
          <input class="form-control shadow-none" type="text" v-model="link" required>
          <div id="container-link-btn"><button id="link-btn"><a :href="link" target="_blank">링크 확인</a></button></div>
        </div>
    
        <div id="edit-container">
          <div id="detail-title">요구 응답수</div>
            <select class="form-select m-0" id="edit-select" v-model="requiredHeadCount_idx" aria-label="Default select example">
              <option v-for="item in requiredHeadCount_list" :key="item.key" :value=item[1]>{{item[0]}}</option>
            </select>
        </div>

        <div id="edit-container">
          <div id="edit-container-price"> 
            <span>{{this.priceToString(this.price_before)}} (기존 금액) + </span>
            <span id="edit-container-price-diff">{{ this.priceToString(this.calculate_diff)}} (추가 금액)</span>
            <span> = </span>
            <span id="edit-container-price-after">{{ this.priceToString(this.calculate)}}원</span>
          </div>
          
        </div>
        <button id="edit-fin-btn" @click="editSurveyInfo()">수정 완료</button>
    </div>    
  </div>


  <div class="row">
    <div class="col-lg-12">
    <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
      <p>{{this.$store.state.currentUserUploadInfo2}}</p>
      <div class="spinner" v-if="show==0">
        <i class="fas fa-spinner"></i>
          불러오는 중
      </div>
      <h5>
      <span class="my-accountNum text-primary" >{{accountNum}}</span>
      <div class="empty-ment2 text-primary">{{ment}} 
       <p> <router-link to="/service" class="btn-empty text-primary">{{go}}</router-link></p>
      </div>
    </h5>
  </div>
      <!-- <div>
        <table>
          <tr v-if="show==1">
            <th>ID</th>
            <th>주문번호</th>
            <th>제목</th>
            <th>확인여부</th>
          </tr>

          <tr v-for="item in (currentUserUploadIndexInfo2)" :key="item.title">
            <td>{{item.id}}</td>
            <td>{{item.orderNum}}</td>
            <td>{{item.title}}</td>
            <td>{{item.adminApproved}}</td>
          </tr>
        </table>
      </div> -->

      <div class="rounded shadow border-green col-12 py-4 px-4 my-4" v-for="item in (currentUserUploadIndexInfo2)" :key="item">
      <div class="sur-box"  :class="{active:item.progress==3||item.progress==4||item.progress==5}">
        <h5 class="my-4 mx-1">{{item.title}}</h5>
        <div class="row">
          <span class="col"></span>
          <h5 class="col-auto label duelabel mx-3 px-4 text-right">{{priceToString(item.price)}}원</h5>
        </div>
        <hr>
          <div class="row">
            <div class="col-sm-6 mb-2">
              <span class="col-auto label contentslabel">진행단계</span>
              <span class="col-auto label m-1" v-if="item.progress==3 || item.progress==4">패널 응답 완료</span>
              <span class="col-auto label m-1" v-if="item.progress==2">결제 완료</span>
              <span class="col-auto label m-1" v-if="item.progress==0 || item.progress==1">검수 중</span>
            </div>
            <div class="col-sm-6 mb-2">
              <span class="col-auto label contentslabel">주문 날짜</span>
              <span class="col-auto label">{{item.uploadDate}}</span>
            </div>
            <div class="col-sm-6 mb-2">
              <span class="col-auto label contentslabel">답변 수</span>
              <span class="col-auto label m-1">{{item.requiredHeadCount}}</span>
            </div>
            <div class="col-sm-6">
            <span class="col-auto label contentslabel">설문 기한</span>
            <span class="col-auto label">{{item.dueDate}}</span>
            </div>
          </div>

      <div class="row">
        <div class="text-right">
        <router-link :to="`/review/${item.id}/${item.title}`" v-if="item.progress==3"><a class="btn btn-outline-primary">후기 작성하기 ></a></router-link>
        <router-link :to="`/reviewdetail/${item.id}/${item.title}`" v-if="item.progress==4"><a class="btn btn-outline-primary">후기 작성하기 ></a></router-link>
        <router-link to="/surveylist" v-if="item.progress==2"><a class="btn btn-outline-primary">설문 보러가기 ></a></router-link>
        <div class="btn btn-outline-primary" id="mypage-btn-edit" v-if="item.progress <= 1" @click="showModal(item.id, item.title, item.requiredHeadCount, item.spendTime, item.link, item.price)">
          <!-- <PaymentEdit :editModal="editModal" :id="id" :requiredHeadCount_list="requiredHeadCount_list" @closeE="closeModal()"/> -->
          <img id="mypage-img-edit" width=22 src="@/assets/myPage/edit_icon.png">
        </div>
        <a class="btn btn-outline-primary" v-if="item.progress <= 1" @click="deleteSurvey(item.id)"><img width=25 src="@/assets/myPage/delete_icon.png"></a>        
        </div>
      </div>    
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from '@firebase/firestore'

export default {
  data(){
    return {
      currentUserUploadIndexInfo:[],
      currentUserUploadIndexInfo2:[],
      show:0,
      ment:'',
      go:'',
      accountNum:'',
      
      editModal: false,
      requiredHeadCount_list: [],
      id: 0,
      title: '',
      link: '',
      requiredHeadCount: '',
      requiredHeadCount_idx_before: 0,
      requiredHeadCount_idx: 0,
      requiredHeadCount_list: [],
      spendTime_idx: 0,
      price_before: 0,
      price: 0
    }
  },

  mounted(){
    this.fetchMyPayment()
  },

  computed: {
    calculate() {
      var p = Math.ceil(parseFloat(this.price_before
      * ((this.$store.state.priceTable[this.spendTime_idx][this.requiredHeadCount_idx]) / this.$store.state.priceTable[this.spendTime_idx][this.requiredHeadCount_idx_before])).toFixed(0) / 10) * 10

      this.price = p
      return p
    },

    calculate_diff() {
      return this.price - this.price_before
    }
  },

  methods:{
    showModal(id, title, requiredHeadCount, spendTime, link, price) {
      this.id = id
      this.title = title
      this.requiredHeadCount_idx_before = this.$store.state.requiredHeadCountIdxMap.get(requiredHeadCount)
      this.requiredHeadCount_idx = this.$store.state.requiredHeadCountIdxMap.get(requiredHeadCount)
      this.requiredHeadCount_list = this.$store.state.requiredHeadCountIdxArray.slice(this.requiredHeadCount_idx)
      this.spendTime_idx = this.$store.state.spendTimeIdxMap.get(spendTime)
      this.link = link
      this.price_before = price
      this.price = price

      this.editModal = true
    },

    close_modal() {
      this.editModal = false
    },

    async editSurveyInfo() {
      if(this.title.length==0) {
        alert("제목을 입력해주세요")
        return
      } else if(this.link.length==0) {
        alert("링크를 입력해주세요")
        return
      } 

      const db = this.$store.state.db
      const surveyRef = doc(db,"surveyData", this.id.toString())

      console.log(this.id + " " + this.title + " " + String(this.$store.state.priceTextTable[0][this.requiredHeadCount_idx]) + " " + this.link + " " + this.price)

      await updateDoc(surveyRef, {
        title: this.title,
        requiredHeadCount : String(this.$store.state.priceTextTable[0][this.requiredHeadCount_idx]),
        link: this.link,
        price: this.price
      })

      window.alert('수정이 완료되었습니다.')
      this.close_modal()
      this.$router.go('/mypage/payment')      
    },

    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    async deleteSurvey(id_delete) {
      const db = this.$store.state.db
      const doc1 = doc(db, "userData", this.$store.state.loginState.currentUser['email'].toString())
      const doc2 = doc(db, "surveyData", id_delete.toString())
      var ds1 = await getDoc(doc1)
      var ds2 = await getDoc(doc2)
      if(confirm("설문을 삭제하시겠습니까?")){
        if (ds1.exists() && ds2.exists()) {
          var current = ds1.data().point_current
          var total = ds1.data().point_total
          var add = ds2.data().point_add

          await updateDoc(doc1, {
            point_current: current - add,
            point_total: total - add
          })

          await deleteDoc(doc(db, "surveyData", id_delete.toString()))
        }
        window.alert("삭제 완료")
        this.$router.go('/mypage/dashboard')
      }
      
    },
    
    async fetchMyPayment(){
      const db = this.$store.state.db
      const currentUserUploadIndex = this.$store.state.loginState.currentUser['uploadIndex']
      
      
      for (var index in currentUserUploadIndex){
        
        var docRef = doc(db, "surveyData", currentUserUploadIndex[index].toString())
        
        var docSnap = await getDoc(docRef)
        

        if (docSnap.exists()) {
          
          this.currentUserUploadIndexInfo.unshift(docSnap.data())
          
        }
      }

      this.currentUserUploadIndexInfo2 = this.currentUserUploadIndexInfo;
      if (this.currentUserUploadIndexInfo2.length==0){
        this.ment = '아직 업로드한 설문이 없습니다.'
        this.go = '설문 업로드하러 가기 >'
        this.accountNum = ''
      }
      else {
        this.accountNum = '입금 계좌: 카카오뱅크 3333-11-5235460 (송다예)'
      }
      this.show=1
    },


    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    }
  }
  

}
</script>

<style>
#mypage-btn-edit {
  margin-right: 8px;
}
#mypage-img-edit {
  padding-top: 2.5px;
  padding-bottom: 2.5px;
}
.edit-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.202);
  display: table;
  transition: opacity .3s ease;
}
.edit-contentsbox {
  display: flex;
  flex-direction: column;
  padding: 10px 40px 10px 40px;
  font-family: 'Noto Sans KR', sans-serif;
  width: 700px;
  height: 560px;
  margin: 120px auto;
  padding-top: 15px;
  padding-bottom: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(56, 56, 56, 0.042);
  transition: all .3s ease;
  z-index: 2;
}
#edit-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 17px;
}
#edit-container-price {
  text-align: right;
}
#edit-container-price-diff {
  text-align: center;
  color: #0AAB00;
}
#edit-container-price-after {
  padding: 3px;
  font-size: 20px;
  text-align: center;
  background: #0AAB00;
  color: #FFFFFF;
}
.edit-title {
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 9px;
  color: #0CAE02;
}
.edit-close {
  display: flex;
  flex-direction: row;
  justify-content: right;
  cursor: pointer;
  color:#494949;
}
#detail-title {
  font-size: 16px;
  color: #000000;
  text-align: left;
  margin: 5px;
}
#container-link-btn {
  display: flex;
  justify-content: right;
}
#link-btn {
  border: 0;
  font-size: 15px;
  color: #0CAE02;
}
#edit-select {
  padding-top: 15px;
  padding-bottom: 15px;
}
#edit-fin-btn {
  padding: 7px;
  margin: 15px 0px 0px 0px;
  color:#0CAE02;
  background-color: #FFFFFF;
  border: 1.5px solid #0CAE02;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
}
#edit-fin-btn:hover{
  color: white;
  background: #0AAB00;
}
</style>