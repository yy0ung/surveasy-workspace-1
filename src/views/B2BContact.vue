<template>
  <ContactFinalModal/>

	<div class="container">
		<div class="row justify-content-center align-items-center">
			<div class="col-lg-6">
				<div class="section-title text-center">
          <div style="padding:20px"></div>
          <img class="checkimg" src="@/assets/check.png" width="100">
          <div style="padding:20px"></div>
					<h2>서베이지 B2B 소개서를 받아보세요!</h2>
          <p>입력해주시는 이메일 주소로 소개서를 발송하고 있습니다.<br>정확한 정보 입력 후, 메일함을 확인해주세요</p>
				</div>
			</div>
			<div class="col-lg-8">
				<div class="shadow rounded p-5 bg-white">
					<div class="row">
            <div class="col-lg-3">
            </div>
						<div class="col-lg-6">
							<div class="contact-form">
								<form action="#!">
									<div class="form-group mb-4 pb-2">
										<label for="exampleFormControlInput1" class="form-label">성함</label>
										<input type="text" class="form-control shadow-none" id="contact_name" v-model="infoData.name">
									</div>
									<div class="form-group mb-4 pb-2">
										<label for="exampleFormControlInput1" class="form-label">이메일</label>
										<input type="email" class="form-control shadow-none" id="contact_email" v-model="infoData.email">
									</div>
                  	<div class="form-group mb-4 pb-2">
										<label for="exampleFormControlInput1" class="form-label">회사</label>
										<input type="company" class="form-control shadow-none" id="contact_company" v-model="infoData.company">
									</div>
                  <div class="mb-30">
                      <label><input type="checkbox" v-model="checked"><span class="brandgreen"> 개인정보수집 </span>및<span class="brandgreen"> 이용약관</span>에 동의합니다.</label>
                  </div>
									<button class="btn btn-primary w-100" type="submit" @click="validateB2B(this.infoData);">소개서 받기</button>
								</form>
              </div>
						</div>
            <div class="col-lg-3"></div>
					</div>
				</div>
			</div>
		</div>
    <div style="padding:20px"></div>
  </div>
</template>

<script>
import { setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import ContactFinalModal from '../components/Contact/ContactFinalModal.vue';

export default {
  data() {
    return {
      infoData:{
        name:null,
        email:null,
        company:null,
        
      },
      checked:false
      
    }
  },

  components: {
    ContactFinalModal,
  },

  methods:{
    async fetchB2BID(){
      const lastID = []
      const db = this.$store.state.db
      const docRef = doc(db,"lastID", "numberB2B")
      const querySnapshot = await getDoc(docRef)
        if (querySnapshot.exists()){
          lastID.push(querySnapshot.data())
          
        }
        // console.log('fetch LastID')
        // console.log(lastID[0].lastID)
        return lastID[0].B2BID
  },
    closeModal(){
      this.$store.state.showModal=false
      this.$store.state.showFinalModal=false
      router.push('/')
    },

    validateB2B(infoData){
      
      if(infoData.name==null || infoData.email==null || infoData.company==null || this.checked == false){
          alert('필수항목입니다')
      } else {
        this.addData(infoData)
      }
    },

    async addData(infoData){
      var db = this.$store.state.db
      var idDocref = doc(db, "lastID", "numberB2B")
      var lastID = await this.fetchB2BID() 
      console.log(lastID)
      

      await setDoc(doc(db, "B2BData", lastID.toString()),{
        name: infoData.name,
        email: infoData.email,
        company: infoData.company,
        isresponded: false,
        uploadTime: new Date(),
        B2BID : lastID
      }).then(

        this.$store.state.showModal=false,
        this.$store.state.showFinalModal=true,
      )

      await updateDoc(idDocref, {
        B2BID : lastID + 1
      })

      }
    
    
  }
}
</script>

<style>
</style>