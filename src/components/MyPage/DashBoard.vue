<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 pt-4 mx-2">
        <h5>나의 설문</h5>
      </div>
  <div class="col-lg-6">
      <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
      <p class="black-title">진행 중인 설문</p>
      <div>
        <p class="spinner-" v-if="show==0">
        <i class="fas fa-spinner"></i>
          불러오는 중
      </p>
        <p class="green-bold" v-if="show==1">{{myCount1.length}}개</p>
        </div>
    </div>
    </div>
    <div class="col-lg-6">
    <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
      <p class="black-title">완료된 설문</p>
      <p class="spinner-" v-if="show==0">
        <i class="fas fa-spinner"></i>
          불러오는 중 
      </p>
      <p class="green-bold" v-if="show==1">{{myCount2.length}}개</p>
    </div>
  </div>
  </div>
  <div class="col-lg-12 pt-4 mx-2">
        <h5>쿠폰 / 적립금</h5>
      </div>
      <div class="row">
    <div class="col-sm-6">
      <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
        <p>쿠폰</p>
          <h5>
          <i class="bi bi-c-circle-fill mx-2 text-primary"></i>
          <span class="coupon-title">쿠폰 {{ couponNum }}개</span>
          </h5>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
        <p>적립금</p>
        <h5>
        <i class="bi bi-p-circle-fill mx-2 text-primary"></i>
        <span class="coupon-title">{{ priceToString(this.$store.state.PointUserData[0].point_current) }}원</span>
        </h5>
    </div>
  </div>
</div>
    
  </div>
 <div class="container">
  <div class="row">
    <div class="col-lg-12 pt-4 mx-2">
        <h5>나의 설문 목록</h5>
    </div>
    <div class="dash-spinner" v-if="show==0">
        <i class="fas fa-spinner"></i>
          불러오는 중
      </div>
    <div class="empty-ment">
      {{ment}}
      </div>
      <div class="container">
    <div class="rounded shadow border-green col-12 py-4 px-4 my-4" v-for="item in (currentUserUploadInfo4)" :key="item.title">
      <p class="list-detail" v-if="show==1">
        <div class="row">
        <div class="col-12">
          <span class="label endlabel m-1">{{item.uploadDate}}</span>
          <h5 class="my-4 mx-1">{{item.title}}</h5>
          <hr>
        </div>
      </div>
      <p>
        <div class="row">
          <div class="col-auto">
            <router-link to="/surveylist" class="list-de label duelabel m-1" v-if="item.progress==2">설문 보러가기</router-link>
            <span class="list-de label duelabel m-1" v-if="item.progress==0 || item.progress==1 ">설문 검수 중</span>
            <span class="list-de label duelabel m-1" v-if="item.progress==5 || dueFin(item.uploadDate)>=10">설문 완료</span>
            <router-link :to="`/review/${item.id}/${item.title}`" class="list-de label duelabel m-1" v-if="item.progress==3">후기 작성하기</router-link>
            <router-link :to="`/reviewdetail/${item.id}/${item.title}`" v-if="item.progress==4 && dueFin(item.uploadDate)<10" class="list-de label duelabel m-1">후기 작성하기</router-link>
          </div>
          <div class="col">
      </div>
          <div class="col-auto">
        <span class="list-de label contentslabel m-1">결제금액</span>
        <span class="label">{{priceToString(item.price)}}원</span>
      </div>
    </div>
      </p>
      </p>
    </div>
  </div>
  </div>
</div>

</template>

<script>
import { collection, getDocs, getDoc, doc } from '@firebase/firestore'
export default {
  data(){
    return {
      currentUserUploadInfo3:[],
      currentUserUploadInfo4:[],
      couponNum : 0,
      show:0,
      ment:'',
      myCount1: [],
      myCount2: [],
      
     
      
      
      
    }
  },
  
  mounted(){
    this.$store.state.adminCoupon = []
    this.$store.state.myCoupon = []
    this.fetchAdminData_coupon()
    this.fetchUserData_point()

    this.fetchCount()
   

  },
  computed: {
    style(text){
      return text
    }
  },

  methods:{
    async fetchUserData_point(){
      const db = this.$store.state.db
      this.$store.state.userData = []
      this.$store.state.PointUserData = []
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      const PointUserData = userData.filter(item => item.email===this.$store.state.loginState.currentUser.email)
      this.$store.state.PointUserData = PointUserData
      // console.log('***pointUser: ')
      // console.log(PointUserData[0])
      this.getPointInfo()
    },

    getPointInfo() {
      var c = this.$store.state.PointUserData[0].point_current
      var t = this.$store.state.PointUserData[0].point_total
      this.$store.state.localPointState.point_current = c
      this.$store.state.localPointState.point_total = t

      // console.log('current point: ' + this.$store.state.localPointState.point_current)
    },

    
    async fetchAdminData_coupon() { 
      const db = this.$store.state.db

      this.$store.state.adminCoupon = []
      this.$store.state.myCoupon = []
     
     const adminCoupon = this.$store.state.adminCoupon
     
     const querySnapshot = await getDocs(collection(db, "couponData"))
     querySnapshot.forEach((doc) => {
       adminCoupon.push(doc.data())
     })

     const myCoupon_group_X = await adminCoupon.filter(item => item.forGroup===false &&(item.user===this.$store.state.loginState.currentUser.email) && item.isUsed===false && item.outOfDate===false)
     const myCoupon_group_O = []

     const Coupon_group_O_yet = await adminCoupon.filter(item => item.forGroup===true && item.isUsed===false && item.outOfDate===false)
     
     for(var i=0 ; i<Coupon_group_O_yet.length ; i++) {
        for(var j=0 ; j<Coupon_group_O_yet[i].user.length ; j++) {

          if(Coupon_group_O_yet[i].user[j].user == this.$store.state.loginState.currentUser.email && Coupon_group_O_yet[i].user[j].used == false) {
            //console.log(Coupon_group_O_yet[i])
            myCoupon_group_O.push(Coupon_group_O_yet[i])
          }

        }
       
      }

      const myCoupon = await myCoupon_group_X.concat(myCoupon_group_O)
      this.$store.state.myCoupon = await myCoupon
      this.couponNum = await this.$store.state.myCoupon.length
      // console.log(this.$store.state.myCoupon)
      
   },

   async fetchUserData(){
      const db = this.$store.state.db
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      
    },

    async getPointInfo() {
      this.$store.state.userData = []
      await this.fetchUserData()

      var c = this.$store.state.loginState.currentUser.point_current
      var t = this.$store.state.loginState.currentUser.point_total
      this.$store.state.localPointState.point_current = c
      this.$store.state.localPointState.point_total = t

      this.$store.state.loginState.currentUser.point_current = c
      this.$store.state.loginState.currentUser.point_total = t

      // console.log('current point: ' + this.$store.state.localPointState.point_current)
   },
    
    async fetchCount(){
      const db = this.$store.state.db
      const cIndex = this.$store.state.loginState.currentUser['uploadIndex']
      
      for (var index in cIndex){
        
        var docRef = doc(db, "surveyData", cIndex[index].toString())
        
        var docSnap = await getDoc(docRef)
        

        if (docSnap.exists()) {
          
          this.currentUserUploadInfo3.unshift(docSnap.data())
          
        }
      }
      this.currentUserUploadInfo4 = this.currentUserUploadInfo3;
      if (this.currentUserUploadInfo4.length==0){
        this.ment = '아직 업로드한 설문이 없습니다.'
      }
      this.show=1
      for(var i=0; i<this.currentUserUploadInfo3.length; i++){
        if(this.currentUserUploadInfo3[i].progress<=2){
          this.myCount1.push(this.currentUserUploadInfo3[i].progress)
          
        }else if(this.currentUserUploadInfo3[i].progress>=3){
          this.myCount2.push(this.currentUserUploadInfo3[i].progress)
        }
        // console.log(this.currentUserUploadInfo3[i].progress)
      }
      
      
      
    },
    // async fetchMyPayment2(){
    //   const db = this.$store.state.db
    //   const cIndex = this.$store.state.loginState.currentUser['uploadIndex']
      
    //   for (var index in cIndex){
        
    //     var docRef = doc(db, "surveyData", cIndex[index].toString())
        
    //     var docSnap = await getDoc(docRef)
        

    //     if (docSnap.exists()) {
          
    //       this.currentUserUploadInfo3.unshift(docSnap.data())
          
    //     }
    //   }

    //   this.currentUserUploadInfo4 = this.currentUserUploadInfo3;
      
     
    // },
    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    over(text){
      this.hoverStyle.color = black
    },
    dueFin(date){
      var due = new Date().getDate()
      var start = date.substring(8)
      return due-start
    }
    
    
  }
}
</script>

<style>

.green-bold{
  font-size: 2.5rem;
  color: #0AAC00;
  font-weight: 400;
  text-align: right;
}

.coupon-title{
  color: #0AAC00;
  font-weight: 400;
  text-align: right;
}


</style>