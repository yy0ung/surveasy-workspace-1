<template>
<div id="modal-container">
  <div id="close-icon" @click="closeModal"><i class="fas fa-times"></i></div>
  <img class="checkimg" src="@/assets/check.png" width="100">
  <p class="green">서베이지 B2B 소개서를 받아보세요!</p>
  <p>입력해주시는 이메일 주소로 소개서를 발송하고 있습니다. 
    <br>정확한 정보 입력 후, 메일함을 확인해주세요</p>
  <form class="input-box">
    <input type="text" placeholder="성함" class="box" v-model="modalName">
    <input type="text" placeholder="이메일" class="box" v-model="modalMail">
    <input type="text" placeholder="회사" class="box" v-model="modalCompany">
 
    <label><input type="checkbox" value="agree"><span class="green">개인정보수집</span> 및 <span class="green">이용약관</span>에 동의합니다.</label>
    <div><button @click="goNext" class="ContactModal-btn">소개서 받기</button></div>
   </form>
</div>  


</template>

<script>
export default {
  data() {
    return {
      modalName:"",
      modalMail:"",
      modalCompany:""
    }
  },
  methods:{
    closeModal(){
      this.$store.state.showModal=false
      this.$store.state.showFinalModal=false
    },
    goNext(){
        this.$store.state.showModal=false
        this.$store.state.showFinalModal=true
      
      
      
     
    }
  }
}
</script>

<style>
#modal-container{
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  
  
 
}
#modal-container .checkimg{
  margin-left: 300px;
}
#modal-container #close-icon{
  display: flex;
  justify-content: right;
  margin-right: 30px;
  
}
#modal-container .ContactModal-btn{
  color:#0AAC00;
  border: 1px solid #0AAC00;
  background-color: #fff;
  padding: 7px 15px;
  border-radius: 24px;
  opacity: 1;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 25px;
  margin-top: 20px;
}
#modal-container .ContactModal-btn:hover{
  background-color: #0AAC00;
  color: #fff;
}
#modal-container .input-box{
  display: flex;
  width: 400px;
  
  flex-direction: column;
  margin-left: 150px;
  
  
}
#modal-container .input-box .box{
  margin-bottom: 30px;
  height: 30px;
  border: 1px solid #848484;
  padding-left: 7px;
}
#modal-container .green{
  color : #0AAC00;
}


</style>