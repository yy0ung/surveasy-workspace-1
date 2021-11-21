<template>
<div id="Register">
  <h3 class="register-title">회원가입</h3>
  <form class="form-center">

          <li>
              <ul class="cols">
                  <li class="col1">이메일 주소</li>
                  <li class="col2"><input type="email" id="email" v-model="dataSet.email" required></li>

              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">비밀번호</li>
                  <li class="col2"><input type="password" id="password" v-model="dataSet.password" required></li>
                  <div class="password-notice">* 8자리 이상의 비밀번호를 설정해주세요.</div>
                  
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">비밀번호 확인</li>
                  <li class="col2"><input type="password" id="passwordcheck" v-model="dataSet.passCheck" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">이름</li>
                  <li class="col2"><input type="text" id="name" v-model="dataSet.name" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">휴대폰 번호</li>
                  <li class="col2"><input type="tel" id="tel" v-model="dataSet.phoneNumber" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">유입경로</li>
                  <li class="col2">
                      <div class="radio-container">
                        <div class="radio-item">
                            <span class="radio-text"><input type="radio" class="radio" name="from" id="everytime" v-model="dataSet.funnel" value="everytime" >에브리타임</span> 
                            <span><input type="radio" class="radio" name="from" id="kakaotalk" v-model="dataSet.funnel" value="kakaotalk">학과 카카오톡 단톡방</span>
                            <span><input type="radio" class="radio" name="from" id="search" v-model="dataSet.funnel" value="search">인터넷 검색(구글 / 네이버 / 기타)</span>
                        </div>
                        <div class="radio-item">
                            <span><input type="radio" class="radio" name="from" id="blog" v-model="dataSet.funnel" value="blog">서베이지 네이버 블로그</span>                         
                            <span><input type="radio" class="radio" name="from" id="instagram" v-model="dataSet.funnel" value="instagram">서베이지 인스타그램</span>
                        </div>                      
                      </div>
                  </li>
              </ul>
          </li>
          

     </form>
     <!-- <button @click="addUserData(this.dataSet); create();"> 가입하기 </button> -->
     <button class="register-btn" @click="validateRegister(this.dataSet);"> 회원가입하기 </button>
     
</div>
</template>

<script>
import { getAuth,  createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore';
export default {
    data(){
        
        return{
            dataSet:{
              email:null,
              password:null,
              passCheck:null,
              phoneNumber:null,
              name:null,
              funnel:null,
                 
            },

            validReg : false,
            
        }
    }
    ,
    methods:{
        
        
        validateRegister(dataSet){
            var errCode = [];
            
            // 입력하지 않은 항목이 있는지 체크
            for (var key in dataSet) {
                if (key == null) {
                    errCode.push(1)
                }
            }
            if (dataSet.password !== dataSet.passCheck){
                errCode.push(2)
            }
            if ((dataSet.password).length < 8) {
                errCode.push(3)
            }
            //휴대폰번호 숫자만있는지 확인 (#Todo)
            if((dataSet.phoneNumber).length!=11 || isNaN(dataSet.phoneNumber)==true || (dataSet.phoneNumber).includes('.')==true){
                errCode.push(4)
               
            }
            
            
            if (errCode.length == 0 ){
                this.validReg = true
                this.create()
                this.addUserData(dataSet)
                
                
            } else {
                console.log(errCode)
                console.log(dataSet)
                var registerErrorMessage =[
                "",
                "입력하지 않은 항목이 있습니다.",
                "비밀번호 확인란을 올바르게 입력하세요.",
                "비밀번호는 8자 이상이여야 합니다.",
                "휴대폰 번호를 올바르게 입력하세요.",
                

                ]
                
                
                var errArr =[]
               
                for(var i=0; i<errCode.length; i++){
                    errArr.push(registerErrorMessage[errCode[i]])
                    
                }
                console.log(errArr)
                var msg = ''
                for(var err in errArr){
                    msg+=errArr[err]+"\n"
                }
                alert(msg) //에러코드에 해당하는 내용 띄우기
            }

            
        }
        ,
        create(){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.dataSet.email, this.dataSet.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                })
            
            
        },

        async addUserData(dataSet){
            
            var db = this.$store.state.db
            await setDoc(doc(db, "userData", dataSet.email),{
                name: dataSet.name,
                email: dataSet.email,
                phoneNumber: dataSet.phoneNumber,
                isPanel: false,
                uploadIndex: [],
                identity: 'default',
                funnel : dataSet.funnel,
                respondArray: [],
                
                
            })
            this.$router.push('/')
        },

        
    },
    

}
</script>

<style>
#Register {
    height: 600px;
}
.register-title {
    margin-top: 70px;
    margin-bottom: 50px;
    font-size: 25px;
}
li {
    list-style-type: none;
}
.form-center {
    position: center;
}
.cols li {
    display: inline-block;
}
.cols li.col1 {
    width: 85px;
    text-align: left;
    padding: 12px;
    font-size: 13px;
}

.cols li.col2 {
    width: 450px;
    font-size: 8px;
}
.cols li.col2 input {
    width: 300px;
    height: 23px;
    border: none;
    background-color: rgb(228, 228, 228);
}
.password-notice {
    font-size: 2px;
    color: grey;
    margin-left: 5px;
}
.cols li.col2 input.radio {
    width: 14px;
}
.radio-container {
    display: flex;
    margin-left: 67px;
    
}
.radio-item {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-right: 10px;
    font-size: 11px;
}
.register-btn {
  width: 120px;
  height: 30px;
  margin: 20px;
  color:#0CAE02;
  background-color: #fff;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 13px;
  cursor: pointer;
}
</style>