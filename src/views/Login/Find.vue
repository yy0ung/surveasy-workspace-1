<template>
<div class="container">
		<div class="row justify-content-center align-items-center">
			<div class="col-lg-12 m-2"></div>
			<div class="col-lg-8">
				<div class="shadow rounded p-5 bg-white">
					<div class="row">
            <div class="col-lg-3"></div>
						<div class="col-lg-6">
              				<div class="section-title text-center p-1">
                      <img class="checkimg" src="@/assets/check.png" width="100">
                      <div style="padding:20px"></div>
                      <h2>비밀번호 찾기</h2>
                      <p>서베이지에 가입했던 이메일을 입력해주시면 비밀번호 재설정 메일을 보내드립니다.</p>
                      <p>{{resetEmail}}</p>
                      </div>
							<div class="contact-form">
									<div class="form-group mb-4 pb-2">
										<label for="exampleFormControlInput1" class="form-label">아이디</label>
										<input type="text" class="form-control shadow-none" id="id" v-model="resetEmail" placeholder="이메일">
									</div>
                  <div class="form-group mb-4 mt-2 pb-1">
                    <button class="btn btn-primary w-100 mb-2" @click="resetPassword(this.resetEmail)">비밀번호 재설정하기</button>              
                  </div>
              </div>
            </div>
						</div>
						</div>            
          <div class="col-lg-3"></div>
			</div>
		</div>
    <div class="p-1"></div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  data(){
    return{
      resetEmail : '',
    }
  },
  mounted() {
    window.scrollTo(0,0)
  },
  methods :{
    resetPassword(email){
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('비밀번호 재설정 메일을 보냈습니다!')
          if(confirm){
            this.$router.push('/login')
          }
          
          
         })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode)
          
        // ..
        });
      
        
      }
  }


}
</script>

<style>
</style>