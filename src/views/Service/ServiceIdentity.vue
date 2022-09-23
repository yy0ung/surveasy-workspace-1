<template>
   <div class="container">
		<div class="row justify-content-center align-items-center">
			<div class="col-lg-8">
				<div class="shadow rounded p-5 bg-white">
					<div class="row">
            <div class="col-lg-2"></div>
						<div class="col-lg-8">
              <div class="section-title text-center p-1">
                <img class="checkimg" src="@/assets/check.png" width="100">
                <div style="padding:20px"></div>
                    <h5 class="identity-title">대학생 및 대학원생 인증을 진행하시겠습니까?</h5>
                    <h5>대학(원)생 인증을 완료하셔야 대학(원)생 할인이 적용됩니다. </h5>
                    <div style="padding:10px"></div>
                      <select name="" class="form-select" v-model="identityRequest">
                          <option value='' selected disabled >인증하려는 할인 대상을 선택하세요</option>
                          <option value='대학생'>대학생 (학부생)</option>
                          <option value='대학원생'>대학원생</option>
                      </select>
                      <div style="padding:20px"></div>
                      <p>하단의 <span id="info-green">'인증하러 가기'</span>를 통해 카카오톡으로 대학(원)생임을 확인할 수 있는 자료를 보내주세요.</p>
                      <a class="btn btn-primary" href="http://pf.kakao.com/_xfialK/chat" target="_blank" @click="sendRequestVerifyIdentity(this.identityRequest)">인증하러 가기</a>
                      <div style="padding:20px"></div>
                      <p class="identity-done" @click="noFunc()">이미 인증 요청을 완료했습니다.</p>
                    </div>
                </div>
						  </div>
						</div>            
        <div class="col-lg-2"></div>
			</div>
		</div>
    <div class="p-1"></div>
  </div>

</template>

<script>
import {doc, collection, getDocs, updateDoc, setDoc} from 'firebase/firestore'
export default {
  data() {
    return{
      identityRequest: '',
    }
  },
  
  mounted() {
    window.scrollTo(0,0)
  },
  methods: {
    async fetchUserData(){
      const db = this.$store.state.db
      const userData = this.$store.state.userData
      const querySnapshot = await getDocs(collection(db,"userData"))
      querySnapshot.forEach((doc) => {
        userData.push(doc.data())
      })
      
    },
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
      console.log(this.$store.state.PointUserData[0].identity_request)
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
    yesFunc() {
      this.$router.push('/servicepaydone')
    },
    noFunc() {
      this.$router.push('/servicepaydone')
    },
    async sendRequestVerifyIdentity(requestInfo) {
      const db = this.$store.state.db
      const currentUser = this.$store.state.loginState.currentUser
      if(this.$store.state.PointUserData[0].identity_request == true) {
        alert('이미 인증 요청을 보내셨습니다.')
        this.yesFunc()
      }
      else {
        await setDoc(doc(db, "identityVerifyRequired", currentUser.email.toString()), {
          requestIdentity: requestInfo,
          requestApproved: false,
          requestName: currentUser.name,
          requestEmail : currentUser.email
        })
        await updateDoc(doc(db, "userData", currentUser.email.toString()), {
          identity_request: true,
          identity: '인증 요청을 확인중입니다.'
        })
        .then( 
          alert("요청이 전송되었습니다 !"),
          this.$store.state.userData = [],
          this.$store.state.PointUserData = [],
          this.fetchUserData_point(),
          this.yesFunc()
        )
      }
      
        
    },
  }
}
</script>

<style>
</style>